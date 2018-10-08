import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo, CardLevelEffect
from common_functions import parse_card_id_list

def parse_each_level_effect_details(card_no) :
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
                print(idx+1, level_effect.getText())

if __name__ == '__main__' :
    parse_each_level_effect_details(1701)