from rest_framework import viewsets
from .serializers import CardInfoSerializer, CharacterMainInfoSerializer
from .models import CardInfo, CharacterMainInfo

class CardInfoViewSet(viewsets.ModelViewSet) :
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer

class CharacterMainInfoViewSet(viewsets.ModelViewSet) :
    queryset = CharacterMainInfo.objects.all()
    serializer_class = CharacterMainInfoSerializer