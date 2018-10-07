from rest_framework import serializers
from .models import CardInfo, CardDetail, CharacterMainInfo

class CardInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardInfo
        fields = ('no', 'rank', 'icon_url_1', 'icon_url_2', 'card_title', 'character_name', 'japanese_name', 'property', 'center_effect', 'smile', 'pure', 'cool', 'active_condition', 'active_skill')

class CardDetailSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardDetail
        fields = ('id', 'info', 'basic_smile', 'basic_pure', 'basic_cool', 'basic_hp', 'full_smile', 'full_pure', 'full_cool', 'full_hp', 'wake_up_smile', 'wake_up_pure', 'wake_up_cool', 'wake_up_hp', 'img_url_1', 'img_url_2', 'property_shape', 'main_effect', 'plus_effect')
        
class CharacterMainInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CharacterMainInfo
        fields = ('id', 'kor_name', 'jap_name', 'voice_actor', 'grade', 'birthday', 'height', 'three_size', 'blood_type', 'hobbies')

