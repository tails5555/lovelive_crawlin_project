from rest_framework import serializers
from .models import CardInfo, CharacterMainInfo

class CardInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardInfo
        fields = ('no', 'rank', 'icon_url_1', 'icon_url_2', 'card_title', 'character_name', 'japanese_name', 'property', 'center_effect', 'smile', 'pure', 'cool', 'active_condition', 'active_skill')

class CharacterMainInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CharacterMainInfo
        fields = ('id', 'kor_name', 'jap_name', 'voice_actor', 'grade', 'birthday', 'height', 'three_size', 'blood_type', 'hobbies')