# Generated by Django 2.1.2 on 2018-10-07 07:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0006_auto_20181007_0008'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('basic_smile', models.PositiveIntegerField()),
                ('basic_pure', models.PositiveIntegerField()),
                ('basic_cool', models.PositiveIntegerField()),
                ('basic_hp', models.PositiveIntegerField()),
                ('full_smile', models.PositiveIntegerField()),
                ('full_pure', models.PositiveIntegerField()),
                ('full_cool', models.PositiveIntegerField()),
                ('full_hp', models.PositiveIntegerField()),
                ('wake_up_smile', models.PositiveIntegerField()),
                ('wake_up_pure', models.PositiveIntegerField()),
                ('wake_up_cool', models.PositiveIntegerField()),
                ('wake_up_hp', models.PositiveIntegerField()),
                ('img_url_1', models.URLField()),
                ('img_url_2', models.URLField()),
                ('property_shape', models.CharField(max_length=15, null=True)),
                ('main_effect', models.CharField(max_length=40, null=True)),
                ('plus_effect', models.CharField(max_length=40, null=True)),
                ('info', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lovelive_api.CardInfo')),
            ],
        ),
    ]