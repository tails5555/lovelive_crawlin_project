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

message_id_list = [
    'skill_voice', 'function_voice', 'random_voice', 'touch_voice', 'time_voice', 'period_voice'
]

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
            message_data = json.loads(second_json_parse)
            print(message_data)
                
if __name__ == '__main__' :
    parse_each_message_details(1709)