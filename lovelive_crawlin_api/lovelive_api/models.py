from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.core.files import File
from django.utils import timezone

import urllib.request
import os.path

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

class CardMessage(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    context = models.TextField(null=True)

class CardIcon(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    img_url = models.URLField(null=True)
    img_file = models.ImageField(upload_to='card/icon', blank=True, default='card/icon/default_image.jpg')

class CardImage(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    img_url = models.URLField(null=True)
    img_file = models.ImageField(upload_to='card/main', blank=True, default='card/main/default_image.jpg')

class CardPair(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    primary_file = models.TextField(null=False, default='default_file1.jpg')
    secondary_file = models.TextField(null=False, default='default_file2.jpg')

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

class SongInfo(models.Model) :
    id = models.IntegerField(unique=True, primary_key=True)
    kor_title = models.CharField(max_length=60)
    jap_title = models.CharField(max_length=60)
    type = models.CharField(max_length=10)
    property = models.CharField(max_length=5)
    unlock_level = models.IntegerField()
    unlock_condition = models.CharField(max_length=100)
    
class SongDetail(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.ForeignKey(SongInfo, on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=10)
    star_count = models.IntegerField()
    level_value = models.IntegerField()
    exp_value = models.IntegerField()
    note_count = models.IntegerField()
    destiny_count = models.IntegerField()
    c_rank_score = models.IntegerField()
    b_rank_score = models.IntegerField()
    a_rank_score = models.IntegerField()
    s_rank_score = models.IntegerField()
    
class SongCoverImage(models.Model) :
    id = models.AutoField(primary_key=True)
    info = models.OneToOneField(SongInfo, on_delete=models.CASCADE)
    img_url = models.URLField(null=True)
    img_file = models.ImageField(upload_to='song/main', blank=True, default='song/main/default_image.jpg')

class EventInfo(models.Model) :
    KOREA = 'KOR'
    JAPAN = 'JAP'
    SERVER_REGIONS = (
        (KOREA, '한국 서버'),
        (JAPAN, '일본 서버')
    )
    id = models.AutoField(primary_key=True)
    region = models.CharField(
        max_length=3,
        choices=SERVER_REGIONS,
        default=JAPAN,
    )
    card_info = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    song_info = models.ForeignKey(SongInfo, on_delete=models.CASCADE, null=True)
    event_title = models.CharField(max_length=100, default='')
    event_context = models.CharField(max_length=100, null=True)
    start_date = models.DateTimeField(default=timezone.now())
    end_date = models.DateTimeField(default=timezone.now())
    album_cut_score = models.PositiveIntegerField()
    skill_cut_score = models.PositiveIntegerField()
    skill_pivot_rank = models.PositiveIntegerField()
    wake_up_cut_score = models.PositiveIntegerField()
    wake_up_pivot_rank = models.PositiveIntegerField()
    first_cut_score = models.PositiveIntegerField()