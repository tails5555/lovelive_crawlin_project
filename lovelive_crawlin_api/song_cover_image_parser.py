import requests
import re
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

from bs4 import BeautifulSoup
from multiprocessing import Pool

import django
from django.core.files import File

django.setup()

from lovelive_api.models import SongInfo, SongCoverImage
from common_functions import parse_song_id_list

def parse_song_cover_image(song_id) :
    song_info = SongInfo.objects.filter(id=song_id).first()
    if song_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/music/detail.php?d=3&c={0}'.format(song_id)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            song_image = soup.find('div', { 'class' : 'leftPart' })

            if song_image != None :
                img = song_image.find('img')
                img_req = requests.get(img['src'])
                file_name = os.path.basename(img['src'])
                
                if img_req.status_code == 200 :
                    with open(file_name, "wb") as f:
                        f.write(img_req.content)

                    with open(file_name, "rb") as f:
                        SongCoverImage(
                            info = song_info,
                            img_url = img['src'],
                            img_file = File(f)
                        ).save()
                    
                    os.remove(file_name)

if __name__ == '__main__' :
    if SongCoverImage.objects.count() > 0 :
        SongCoverImage.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_song_cover_image, parse_song_id_list())   
