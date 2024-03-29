import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo, CardMessage
from common_functions import parse_card_id_list

import re
import json

class CardMessageModel :
    def __init__(self, info=None, context='') :
        self.info = info
        self.context = context

    def set_info(self, info) :
        self.info = info
    
    def set_context(self, context) :
        self.context = context

def parse_each_message_details(card_no) :
    card_info = CardInfo.objects.filter(no=card_no).first()

    if card_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            message_json_script = soup.find('script', text=re.compile('voicedata'))
            json_text = message_json_script.getText()
            first_json_parse = json_text.replace('\nvoicedata = ', '')
            second_json_parse = first_json_parse.replace(';\n', '')

            card_message_model = CardMessageModel(info=card_info, context=second_json_parse);
            CardMessage(
                info = card_message_model.info,
                context = card_message_model.context
            ).save();

if __name__ == '__main__' :
    if CardMessage.objects.count() > 0 :
        CardMessage.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_each_message_details, parse_card_id_list())   