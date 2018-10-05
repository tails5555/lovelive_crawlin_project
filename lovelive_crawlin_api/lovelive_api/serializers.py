from rest_framework import serializers
from .models import CardInfo

class CardInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = CardInfo
        fields = ('no', 'rank', 'icon_url_1', 'icon_url_2', 'card_title', 'character_name', 'japanese_name', 'property', 'center_effect', 'smile', 'pure', 'cool', 'active_condition', 'active_skill')