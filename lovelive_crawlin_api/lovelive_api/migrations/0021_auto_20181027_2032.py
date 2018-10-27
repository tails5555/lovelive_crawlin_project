# Generated by Django 2.1.2 on 2018-10-27 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0020_auto_20181026_1441'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cardpair',
            name='img_url_1',
        ),
        migrations.RemoveField(
            model_name='cardpair',
            name='img_url_2',
        ),
        migrations.AddField(
            model_name='cardpair',
            name='primary_file',
            field=models.TextField(default='default_file1.jpg'),
        ),
        migrations.AddField(
            model_name='cardpair',
            name='secondary_file',
            field=models.TextField(default='default_file2.jpg'),
        ),
    ]
