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
    
class CardDetail(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.OneToOneField(CardInfo, on_delete=models.CASCADE)
    basic_smile = models.PositiveIntegerField()
    basic_pure = models.PositiveIntegerField()
    basic_cool = models.PositiveIntegerField()
    basic_hp = models.PositiveIntegerField()
    full_smile = models.PositiveIntegerField()
    full_pure = models.PositiveIntegerField()
    full_cool = models.PositiveIntegerField()
    full_hp = models.PositiveIntegerField()
    wake_up_smile = models.PositiveIntegerField()
    wake_up_pure = models.PositiveIntegerField()
    wake_up_cool = models.PositiveIntegerField()
    wake_up_hp = models.PositiveIntegerField()
    img_url_1 = models.URLField()
    img_url_2 = models.URLField()
    property_shape = models.CharField(max_length=15, null=True)
    main_effect = models.CharField(max_length=40, null=True)
    plus_effect = models.CharField(max_length=40, null=True)

class CardLevelEffect(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    active_level = models.PositiveIntegerField()
    active_context = models.CharField(max_length=50)

class CharacterMainInfo(models.Model) :
    id = models.AutoField(primary_key=True)
    kor_name = models.CharField(max_length=20, unique=True)
    jap_name = models.CharField(max_length=20)
    voice_actor = models.CharField(max_length=30, null=True)
    grade = models.IntegerField()
    birthday = models.CharField(max_length=10)
    height = models.IntegerField()
    three_size = models.CharField(max_length=15)
    blood_type = models.CharField(max_length=10)
    hobbies = models.CharField(max_length=30, null=True)