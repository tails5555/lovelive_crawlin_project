from rest_framework import serializers
from .models import CardInfo, CardDetail, CardLevelEffect, CardMessage, CardPair, CardIcon, CardImage, CharacterMainInfo, SongInfo, SongDetail, SongCoverImage, EventInfo

class CardInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardInfo
        fields = ('no', 'rank', 'icon_url_1', 'icon_url_2', 'card_title', 'character_name', 'japanese_name', 'property', 'center_effect', 'smile', 'pure', 'cool', 'active_condition', 'active_skill')

class CardDetailSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardDetail
        fields = ('id', 'info', 'basic_smile', 'basic_pure', 'basic_cool', 'basic_hp', 'full_smile', 'full_pure', 'full_cool', 'full_hp', 'wake_up_smile', 'wake_up_pure', 'wake_up_cool', 'wake_up_hp', 'img_url_1', 'img_url_2', 'property_shape', 'main_effect', 'plus_effect')

class CardLevelEffectSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardLevelEffect
        fields = ('id', 'info', 'active_level', 'active_context')

class CardMessageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardMessage
        fields = ('id', 'info', 'context')

class CardPairSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardPair
        fields = ('id', 'info', 'primary_file', 'secondary_file')

class CardIconSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardIcon
        fields = ('id', 'info', 'img_url', 'img_file')

class CardImageSerializer(serializers.ModelSerializer) :
    img_file = serializers.ImageField(use_url=True)
    class Meta :
        model = CardImage
        fields = ('id', 'info', 'img_url', 'img_file')
        
class CharacterMainInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CharacterMainInfo
        fields = ('id', 'kor_name', 'jap_name', 'voice_actor', 'grade', 'birthday', 'height', 'three_size', 'blood_type', 'hobbies')

class SongInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = SongInfo
        fields = ('id', 'kor_title', 'jap_title', 'type', 'property', 'unlock_level', 'unlock_condition')

class SongDetailSerializer(serializers.ModelSerializer) :
    class Meta :
        model = SongDetail
        fields = ('id', 'info', 'difficulty', 'star_count', 'level_value', 'exp_value', 'note_count', 'destiny_count', 'c_rank_score', 'b_rank_score', 'a_rank_score', 's_rank_score')

class SongCoverImageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = SongCoverImage
        fields = ('id', 'info', 'img_url', 'img_file')

class EventInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = EventInfo
        fields = ('id', 'region', 'card_info', 'song_info', 'event_title', 'event_context', 'start_date', 'end_date', 'album_cut_score', 'skill_cut_score', 'skill_pivot_rank', 'wake_up_cut_score', 'wake_up_pivot_rank', 'first_cut_score')