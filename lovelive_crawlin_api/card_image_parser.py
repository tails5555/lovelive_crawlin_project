import requests
import urllib.request
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os
from os.path import basename

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
from django.core.files import File
from django.conf import settings

django.setup()

from lovelive_api.models import CardInfo, CardImage
from common_functions import parse_card_id_list

def parse_each_image_files(card_no) :
    card_info = CardInfo.objects.filter(no=card_no).first()
    if card_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            card_image_div = soup.find('div', {'class': 'image1'})
            card_detail_div = soup.find('div', {'class': 'rightPart'})
            
            if card_image_div != None :
                card_imgs = card_image_div.find_all('img')
                
                for img in card_imgs : 
                    link = img['src']
                    img_req = requests.get(link)
                    file_name = os.path.basename(link)
                    
                    if img_req.status_code == 200 :
                        with open(file_name, "wb") as f:
                            f.write(img_req.content)

                        with open(file_name, "rb") as f:
                            CardImage(
                                info = card_info,
                                img_url = link,
                                img_file = File(f)
                            ).save()
                        
                        os.remove(file_name)
        
if __name__ == '__main__' :
    pool = Pool(processes=6)
    if CardImage.objects.count() > 0 :
        CardImage.objects.all().delete()
    pool.map(parse_each_image_files, parse_card_id_list())   