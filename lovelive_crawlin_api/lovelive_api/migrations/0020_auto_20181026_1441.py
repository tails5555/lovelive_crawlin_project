# Generated by Django 2.1.2 on 2018-10-26 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0019_cardicon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cardmessage',
            name='type',
        ),
        migrations.AlterField(
            model_name='cardmessage',
            name='context',
            field=models.TextField(null=True),
        ),
    ]
