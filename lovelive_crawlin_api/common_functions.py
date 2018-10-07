import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

def parse_card_id_list() :
    req = requests.get('http://lovelive.inven.co.kr/dataninfo/card/')
    html = req.text
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        card_list_div = soup.find(id='listTable')
        card_table = card_list_div.find_all('table')

        if len(card_table) == 1 : 
            tmp_table = card_table[0]
            id_tr_list = tmp_table.find_all('tr')
            id_tr_list.reverse()
            search_card_nos = []

            for card_tr in id_tr_list : 
                idx_td = card_tr.find('td', {'class': 'ucode'})
                idx = idx_td.find(text=True) if idx_td != None else ''
                if idx.strip() != '' :
                    search_card_nos.append(int(idx))

            return search_card_nos

        else :
            return []

    else : 
        return []