from rest_framework import viewsets
from .serializers import CardInfoSerializer
from .models import CardInfo

class CardInfoViewSet(viewsets.ModelViewSet) :
    queryset = CardInfo.objects.all()
    serializer_class = CardInfoSerializer