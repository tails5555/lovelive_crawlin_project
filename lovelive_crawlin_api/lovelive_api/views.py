from .serializers import CardInfoSerializer, CardDetailSerializer, CardLevelEffectSerializer, CardMessageSerializer, CardPairSerializer, CardIconSerializer, CardImageSerializer, CharacterMainInfoSerializer
from .models import CardInfo, CardDetail, CardLevelEffect, CardMessage, CardPair, CardIcon, CardImage, CharacterMainInfo
from .utils import ListPagination, CardPagination

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import list_route

import json
from django.core import serializers
from django.http import HttpResponse

class CardInfoViewSet(viewsets.ModelViewSet) :
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('rank', 'character_name')
    search_fields = ('rank', 'character_name')
    ordering_fields = ('no', 'rank', 'character_name')
    pagination_class = ListPagination

class CardDetailViewSet(viewsets.ModelViewSet) :
    queryset = CardDetail.objects.all()
    serializer_class = CardDetailSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info', 'property_shape')
    search_fields = ('info', 'property_shape')
    ordering_fields = ('info', 'property_shape')
    ordering=('info')

class CardLevelEffectViewSet(viewsets.ModelViewSet) :
    queryset = CardLevelEffect.objects.all()
    serializer_class = CardLevelEffectSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info', 'active_level')
    search_fields = ('info', 'active_level')
    ordering_fields = ('info', 'active_level')
    ordering = ('info')

class CardMessageViewSet(viewsets.ModelViewSet) :
    queryset = CardMessage.objects.all()
    serializer_class = CardMessageSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info',)
    search_fields = ('info',)
    ordering_fields = ('info',)
    ordering = ('info',)

class CardPairViewSet(viewsets.ModelViewSet) :
    queryset = CardPair.objects.all()
    serializer_class = CardPairSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info',)
    search_fields = ('info',)
    ordering_fields = ('info',)
    ordering = ('info',)

class CardIconViewSet(viewsets.ModelViewSet) :
    queryset = CardIcon.objects.all()
    serializer_class = CardIconSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info',)
    search_fields = ('info',)
    ordering_fields = ('info',)
    ordering = ('info',)

class CardImageViewSet(viewsets.ModelViewSet) :
    queryset = CardImage.objects.all()
    serializer_class = CardImageSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info',)
    search_fields = ('img_file',)
    ordering_fields = ('info',)
    ordering = ('info',)

    @list_route(methods = ['get'])
    def character_name(self, request, pk=None) :
        character_name = request.GET.get('character')
        card_infos = CardInfo.objects.filter(character_name=character_name).values_list('no', flat=True)
        
        if len(card_infos) > 0 :
            image_list = CardImage.objects.filter(info__in=card_infos)
            list_json = serializers.serialize('json', image_list)
            return HttpResponse(list_json, content_type='application/json')
        else :
            return HttpResponse(status=204)

class CharacterMainInfoViewSet(viewsets.ModelViewSet) :
    queryset = CharacterMainInfo.objects.all()
    serializer_class = CharacterMainInfoSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('kor_name', 'grade')
    search_fields = ('kor_name', )
    pagination_class = CardPagination