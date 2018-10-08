import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo, CardLevelEffect
from common_functions import parse_card_id_list

class CardLevelEffectModel :
    def __init__(self, info=None, active_level=0, active_context='') :
        self.info = info
        self.active_level = active_level
        self.active_context = active_context

    def set_info(self, info) :
        self.info = info

    def set_active_level(self, active_level) :
        self.active_level = active_level

    def set_active_context(self, active_context) :
        self.active_context = active_context


def parse_each_level_effect_details(card_no) :
    card_info = CardInfo.objects.filter(no=card_no).first()

    if card_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            detail_div = soup.find_all('div', { 'class' : 'details' })
            
            if len(detail_div) > 1 :
                level_table = detail_div[1].find('table')
                level_effect_tds = level_table.find_all('td')

                for idx, level_effect in enumerate(level_effect_tds) :
                    card_level_effect = CardLevelEffectModel()
                    card_level_effect.set_info(card_info)
                    card_level_effect.set_active_level(idx+1)
                    card_level_effect.set_active_context(level_effect.getText())
                    CardLevelEffect(
                        info = card_level_effect.info,
                        active_level = card_level_effect.active_level,
                        active_context = card_level_effect.active_context
                    ).save()
                    

if __name__ == '__main__' :
    if CardLevelEffect.objects.count() > 0 :
        CardLevelEffect.objects.all().delete()
    
    pool = Pool(processes=6)
    pool.map(parse_each_level_effect_details, parse_card_id_list())   