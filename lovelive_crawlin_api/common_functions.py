import requests
from bs4 import BeautifulSoup
from urllib import parse

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

def parse_song_id_list() :
    req = requests.get('http://lovelive.inven.co.kr/dataninfo/music/')
    html = req.text
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        song_list_div = soup.find(id='listTable')
        song_table = song_list_div.find_all('table')

        if len(song_table) == 1 : 
            tmp_table = song_table[0]
            table_body = tmp_table.find('tbody')
            tr_list = table_body.find_all('tr', {'class' : None})
            tr_list.reverse()
            search_song_ids = []

            for song_tr in tr_list : 
                img_td = song_tr.find('td', {'class': 'image1'})
                link = img_td.find('a') if img_td != None else None
                if link != None :
                    c_values = parse.parse_qs(link['href'])['c']
                    for c in c_values :
                        search_song_ids.append(c)

            return search_song_ids

        else :
            return []

    else : 
        return []