import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo, CardPair
from common_functions import parse_card_id_list


class CardPairModel :
    def __init___(self, info=None, img_url_1='', img_url_2='') :
        self.info = info
        self.img_url_1 = img_url_1
        self.img_url_2 = img_url_2

    def set_info(self, info) :
        self.info = info

    def set_img_url_1(self, img_url_1) :
        self.img_url_1 = img_url_1

    def set_img_url_2(self, img_url_2) :
        self.img_url_2 = img_url_2

def parse_each_pairs(card_no) :
    card_info = CardInfo.objects.filter(no=card_no).first()

    if card_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            pair_cards = soup.find('div', { 'class' : 'pairs' })
            
            if pair_cards != None :
                pairs_div = pair_cards.find_all('div', { 'class' : 'cards' })

                for pair in pairs_div :
                    image_tags = pair.find_all('img')
                    card_pair_model = CardPairModel()
                    card_pair_model.set_info(card_info)
                    card_pair_model.set_img_url_1(image_tags[0]['src'])
                    card_pair_model.set_img_url_2(image_tags[1]['src'])
                    
                    CardPair(
                        info = card_pair_model.info,
                        img_url_1 = card_pair_model.img_url_1,
                        img_url_2 = card_pair_model.img_url_2
                    ).save()

if __name__ == '__main__' :
    if CardPair.objects.count() > 0 :
        CardPair.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_each_pairs, parse_card_id_list())   