# Generated by Django 2.1.2 on 2018-11-09 11:47

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0027_auto_20181109_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventinfo',
            name='end_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 11, 9, 11, 47, 25, 994427, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='eventinfo',
            name='start_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 11, 9, 11, 47, 25, 994427, tzinfo=utc)),
        ),
    ]
