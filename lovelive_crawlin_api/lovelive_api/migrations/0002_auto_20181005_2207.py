# Generated by Django 2.1.2 on 2018-10-05 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cardinfo',
            name='id',
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='active_skill',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='card_title',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='icon_url_2',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='no',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
