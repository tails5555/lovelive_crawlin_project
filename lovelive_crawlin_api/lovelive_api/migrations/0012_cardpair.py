# Generated by Django 2.1.2 on 2018-10-09 13:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0011_auto_20181009_0103'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardPair',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('img_url_1', models.URLField()),
                ('img_url_2', models.URLField()),
                ('info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lovelive_api.CardInfo')),
            ],
        ),
    ]
