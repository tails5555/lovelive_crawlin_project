from django.db import models

# Create your models here.

class CardInfo(models.Model) :
    no = models.IntegerField(unique=True, primary_key=True)
    rank = models.CharField(max_length=5)
    icon_url_1 = models.URLField()
    icon_url_2 = models.URLField(null=True)
    card_title = models.CharField(max_length=30, null=True)
    character_name = models.CharField(max_length=15)
    japanese_name = models.CharField(max_length=15)
    property = models.CharField(max_length=5)
    center_effect = models.CharField(max_length=15)
    smile = models.PositiveIntegerField()
    pure = models.PositiveIntegerField()
    cool = models.PositiveIntegerField()
    active_condition = models.CharField(max_length=10)
    active_skill = models.CharField(max_length=15, null=True)

class CharacterMainInfo(models.Model) :
    kor_name = models.CharField(max_length=20, unique=True, db_index=True)
    jap_name = models.CharField(max_length=20)
    voice_actor = models.CharField(max_length=30, null=True)
    grade = models.IntegerField()
    birthday = models.CharField(max_length=10)
    height = models.IntegerField()
    three_size = models.CharField(max_length=15)
    blood_type = models.CharField(max_length=10)
    hobbies = models.CharField(max_length=30, null=True)