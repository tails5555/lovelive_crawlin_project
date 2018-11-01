import requests
import urllib.request
from bs4 import BeautifulSoup

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
from django.core.files import File

django.setup()

from lovelive_api.models import CardInfo, CardIcon
from common_functions import parse_card_id_list

INFO_NO_IDX = 0
ICON_IDX = 2

def parse_card_icons():
    req = requests.get('http://lovelive.inven.co.kr/dataninfo/card/')
    html = req.text
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        card_list_div = soup.find(id='listTable')
        card_table = card_list_div.find_all('table')

        if len(card_table) == 1 : 
            tmp_table = card_table[0]
            card_infos = []

            for card_tr in tmp_table.find_all('tr') : 
                card_tds = card_tr.find_all('td')
                info_no_td = None
                icon_td = None
                icon_no = 0
                card_info = None

                if len(card_tds) > 3 :
                    info_no_td = card_tds[INFO_NO_IDX]
                    icon_td = card_tds[ICON_IDX]
                    icon_no = info_no_td.getText()
                
                if int(icon_no) != 0 :
                    card_info = CardInfo.objects.filter(no=int(icon_no)).first()

                if icon_td != None and card_info != None :
                    icons = icon_td.find_all('img')

                    for img in icons : 
                        link = img['src']
                        img_req = requests.get(link)
                        file_name = os.path.basename(link)

                        if img_req.status_code == 200 :
                            with open(file_name, "wb") as f:
                                f.write(img_req.content)

                            with open(file_name, "rb") as f:
                                CardIcon(
                                    info = card_info,
                                    img_url = link,
                                    img_file = File(f)
                                ).save()
                            
                            os.remove(file_name)

if __name__ == '__main__' :
    if CardIcon.objects.count() > 0 :
        CardIcon.objects.all().delete()
    
    parse_card_icons()