from django.contrib import admin
from .models import Installment, Transaction

admin.site.register(Installment)
admin.site.register(Transaction)
