# Generated by Django 3.1.2 on 2020-11-03 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment_app', '0006_auto_20201103_0838'),
    ]

    operations = [
        migrations.RenameField(
            model_name='installment',
            old_name='installmentId',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='installment',
            old_name='parentnodes',
            new_name='parentId',
        ),
        migrations.RenameField(
            model_name='transaction',
            old_name='transactionId',
            new_name='id',
        ),
    ]
