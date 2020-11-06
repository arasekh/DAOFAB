from django.shortcuts import render
from payment_app.models import Transaction, Installment
import json
from django.http import HttpResponse
from django.db.models import Sum
import json
from django.http import JsonResponse
from django.core.paginator import Paginator
from itertools import chain
from django.forms.models import model_to_dict


def import_all(input):
    '''
        Import all the entities(Transaction & Installment) to the DB
    '''
    with open('./Parent.json') as f:
        transactions_json = json.load(f)
        rows = transactions_json['data']

        for row in rows:
            transaction = Transaction()
            for k, v in row.items():
                setattr(transaction, k, v)
            transaction.save()

    with open('./Child.json') as f:
        installments_json = json.load(f)
        rows = installments_json['data']

        for row in rows:
            installment = Installment()
            for k, v in row.items():
                if k == 'parentId':
                    parent_transaction = Transaction.objects.get(pk=v)
                    setattr(installment, k, parent_transaction)
                else:
                    setattr(installment, k, v)
            installment.save()

    return HttpResponse("imported")


def transactions_table(requestm, page_num):
    '''
        Read all the transactions from DB
        Calculate paid amount of each transaction
        Return all the results in pages of size 2
    '''
    # Used for pagination
    page_size = 2

    # Read transactions and installments from DB
    transactions = Transaction.objects.all().values()
    transactions_total_paid = Installment.objects.values(
        'parentId__id').annotate(Sum('paidAmount')).order_by('parentId_id')

    total_paid_dict = {x['parentId__id']: x for x in transactions_total_paid}

    # Calculate totalPaidAmount for the transaction, using installments model
    for transaction in transactions:
        transactionId = transaction['id']
        if transactionId in total_paid_dict.keys():
            total_paid_amount = total_paid_dict[transaction['id']
                                                ]['paidAmount__sum']
        else:
            total_paid_amount = 0.0
        transaction['totalPaidAmount'] = total_paid_amount

    # Pagination with page_size
    paginator = Paginator(transactions, page_size)
    paged_listings = paginator.get_page(page_num)
    queryset = list(paged_listings)

    content = {'count': len(queryset),
               'totalHits': len(transactions.values()),
               'total_page_count': paginator.num_pages,
               'hits': queryset}

    return JsonResponse(content)


def transaction_table(request, transaction_id):
    '''
        Read all the installments from DB
        Get more detials of each installment from Transaction table
        Return all the results
    '''

    transaction = Transaction.objects.get(id=transaction_id)
    installments = Installment.objects.filter(
        parentId__id=transaction_id).values().order_by('id')

    # For each installment, add more details about it, to the final returning object
    for installment in installments:
        installment['sender'] = transaction.sender
        installment['receiver'] = transaction.receiver
        installment['totalAmount'] = transaction.totalAmount

    content = {'totalHits': len(installments.values()),
               'hits': list(installments)}

    return JsonResponse(content)
