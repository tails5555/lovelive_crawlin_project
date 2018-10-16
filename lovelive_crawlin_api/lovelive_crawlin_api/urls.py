"""lovelive_crawlin_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from lovelive_api.views import CardInfoViewSet, CardDetailViewSet, CardLevelEffectViewSet, CardMessageViewSet, CardPairViewSet, CardIconViewSet, CardImageViewSet, CharacterMainInfoViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('card_infos', CardInfoViewSet)
router.register('card_details', CardDetailViewSet)
router.register('card_level_effects', CardLevelEffectViewSet)
router.register('card_messages', CardMessageViewSet)
router.register('card_pairs', CardPairViewSet)
router.register('card_icons', CardIconViewSet)
router.register('card_images', CardImageViewSet)
router.register('character_main_infos', CharacterMainInfoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
