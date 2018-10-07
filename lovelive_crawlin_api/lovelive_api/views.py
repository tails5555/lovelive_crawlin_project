from .serializers import CardInfoSerializer, CardDetailSerializer, CharacterMainInfoSerializer
from .models import CardInfo, CardDetail, CharacterMainInfo
from .utils import ScrollPagination

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class CardInfoViewSet(viewsets.ModelViewSet) :
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('rank', 'character_name')
    search_fields = ('rank', 'character_name')
    ordering_fields = ('rank', 'character_name')
    pagination_class = ScrollPagination

class CardDetailViewSet(viewsets.ModelViewSet) :
    queryset = CardDetail.objects.all()
    serializer_class = CardDetailSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('info', 'property_shape')
    search_fields = ('info', 'property_shape')
    ordering_fields = ('info', 'property_shape')
    ordering=('info')

class CharacterMainInfoViewSet(viewsets.ModelViewSet) :
    queryset = CharacterMainInfo.objects.all()
    serializer_class = CharacterMainInfoSerializer
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter)
    filter_fields = ('kor_name',)
    search_fields = ('kor_name',)