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
    'skill', 'function', 'random', 'touch', 'time', 'period'
]

class CardMessageModel :
    def __init__(self, info=None, type='ETC', context='') :
        self.info = info
        self.type = type
        self.context = context

    def set_info(self, info) :
        self.info = info

    def set_type(self, type) :
        if type == 'skill' :
            self.type = 'SKILL'
        elif type == 'function' :
            self.type = 'MENU'
        elif type == 'random' :
            self.type = 'RANDOM'
        elif type == 'touch' :
            self.type = 'TOUCH'
        elif type == 'time' :
            self.type = 'SPECTIME'
        elif type == 'period' :
            self.type = 'SPECDATE'
        else :
            self.type = 'ETC'
    
    def set_context(self, context) :
        self.context = context

    def __str__(self) :
        return '{}\n{}\n'.format(self.type, self.context)

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

            for message_id in message_id_list :
                message_jp = '{}_jp'.format(message_id)
                message_kr = '{}_kr'.format(message_id)
                message_jp_datas = message_data[message_jp]
                message_kr_datas = message_data[message_kr]
                message_jp_type = type(message_data[message_jp])
                message_kr_type = type(message_data[message_kr])
                
                time_list = None
                period_list = None

                if message_id == 'time' :
                    time_list = message_data['time_time']
                elif message_id == 'period' :
                    period_list = message_data['period_date']

                if message_jp_type is dict :
                    
                    for message_key in message_jp_datas.keys() :
                        tmp_context = ''
                        card_message_model = CardMessageModel()
                        card_message_model.set_info(card_info)
                        card_message_model.set_type(message_id)

                        if type(time_list) is dict :
                            start_time = time_list[message_key]['start']
                            end_time = time_list[message_key]['end']
                            tmp_context = '{}시 ~ {}시\n'.format(start_time, end_time)

                        elif type(period_list) is dict :
                            start_date = period_list[message_key]['start']
                            end_date = period_list[message_key]['end']
                            tmp_context = '{} ~ {}\n'.format(start_date, end_date)

                        tmp_context += message_jp_datas[message_key]

                        if message_key in message_kr_datas :
                            tmp_context += '\n' + message_kr_datas[message_key]

                        card_message_model.set_context(tmp_context)
                        CardMessage(
                            info = card_message_model.info,
                            type = card_message_model.type,
                            context = card_message_model.context
                        ).save()

                elif message_jp_type is str :
                    card_message_model = CardMessageModel()
                    card_message_model.set_info(card_info)
                    card_message_model.set_type(message_id)

                    tmp_context = ''
                    tmp_context += message_jp_datas
                    
                    if message_kr_type is str :
                        tmp_context += '\n' + message_kr_datas

                    card_message_model.set_context(tmp_context)
                    CardMessage(
                        info = card_message_model.info,
                        type = card_message_model.type,
                        context = card_message_model.context
                    ).save()

if __name__ == '__main__' :
    if CardMessage.objects.count() > 0 :
        CardMessage.objects.all().delete()

    pool = Pool(processes=4)
    pool.map(parse_each_message_details, parse_card_id_list())   