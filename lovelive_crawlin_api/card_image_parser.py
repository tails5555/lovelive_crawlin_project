import requests
from os.path  import basename
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

def parse_each_image_files(card_no) :
    url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
    req = requests.get(url)
    html = req.text

    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        card_image_div = soup.find('div', {'class': 'image1'})
        card_detail_div = soup.find('div', {'class': 'rightPart'})
        
        if card_image_div != None :
            card_imgs = card_image_div.find_all('img')
            
            if len(card_imgs) == 2 :
                first_image_link = card_imgs[0]['src']
                with open(basename(first_image_link), "wb") as f:
                    f.write(requests.get(first_image_link).content)

                second_image_link = card_imgs[1]['src']
                with open(basename(second_image_link), "wb") as f:
                    f.write(requests.get(second_image_link).content)
            
            else :
                first_image_link = card_imgs[0]['src']
                with open(basename(first_image_link), "wb") as f:
                    f.write(requests.get(first_image_link).content)
        
if __name__ == '__main__' :
    pool = Pool(processes=6)
    parse_each_image_files(1) 