from django.db import models


class Transaction(models.Model):
    '''
        Model for Transactions from one person to another
    '''

    id = models.IntegerField(primary_key=True)
    sender = models.TextField()
    receiver = models.TextField()
    totalAmount = models.FloatField()


class Installment(models.Model):
    '''
        Model for installments of a specific transaction
        Containing details of installments
    '''

    id = models.IntegerField(primary_key=True)
    parentId = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    paidAmount = models.FloatField()
