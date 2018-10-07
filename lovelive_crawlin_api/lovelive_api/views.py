from rest_framework import viewsets
from .serializers import CardInfoSerializer, CardDetailSerializer, CharacterMainInfoSerializer
from .models import CardInfo, CardDetail, CharacterMainInfo

class CardInfoViewSet(viewsets.ModelViewSet) :
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer

class CardDetailViewSet(viewsets.ModelViewSet) :
    queryset = CardDetail.objects.all()
    serializer_class = CardDetailSerializer

class CharacterMainInfoViewSet(viewsets.ModelViewSet) :
    queryset = CharacterMainInfo.objects.all()
    serializer_class = CharacterMainInfoSerializer