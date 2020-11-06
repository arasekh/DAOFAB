from django.urls import path, include
from . import views


urlpatterns = [
    path("import/", views.import_all, name="payments_import_all"),
    path("transactions/<int:page_num>",
         views.transactions_table, name="transactions_table"),
    path("transaction/<int:transaction_id>",
         views.transaction_table, name="transaction_table")
]
