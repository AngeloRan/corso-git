# Generated by Django 5.1 on 2024-10-23 07:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiCRUD', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='autore',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiCRUD.autore'),
        ),
    ]
