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
    def __init___(self, info=None, primary_file='', secondary_file='') :
        self.info = info
        self.primary_file = primary_file
        self.secondary_file = secondary_file

    def set_info(self, info) :
        self.info = info

    def set_primary_file(self, primary_file) :
        self.primary_file = primary_file

    def set_secondary_file(self, secondary_file) :
        self.secondary_file = secondary_file

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
                    first_file_token = image_tags[0]['src'].split('/')
                    second_file_token = image_tags[1]['src'].split('/')

                    card_pair_model.set_primary_file(first_file_token[len(first_file_token) - 1])
                    card_pair_model.set_secondary_file(second_file_token[len(second_file_token) - 1])

                    CardPair(
                        info = card_pair_model.info,
                        primary_file = card_pair_model.primary_file,
                        secondary_file = card_pair_model.secondary_file
                    ).save()

if __name__ == '__main__' :
    if CardPair.objects.count() > 0 :
        CardPair.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_each_pairs, parse_card_id_list())   