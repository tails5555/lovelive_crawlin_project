# Generated by Django 2.1.2 on 2018-10-08 08:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lovelive_api', '0007_carddetail'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardLevelEffect',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('active_level', models.PositiveIntegerField()),
                ('active_context', models.CharField(max_length=50)),
                ('info', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lovelive_api.CardInfo')),
            ],
        ),
    ]
