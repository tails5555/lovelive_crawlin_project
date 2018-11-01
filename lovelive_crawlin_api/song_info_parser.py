import requests
import re
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

from bs4 import BeautifulSoup
from multiprocessing import Pool

import django
django.setup()

from lovelive_api.models import SongInfo
from common_functions import parse_song_id_list

KOR_TITLE_IDX = 0
JAP_TITLE_IDX = 1
PROPERTY_IDX = 2
TYPE_IDX = 3
UNLOCK_LEVEL_IDX = 4
UNLOCK_CONDITION_IDX = 5

class SongInfoModel :
    def __init__(self, id=0, kor_title='', jap_title='', type='', property='', unlock_level=0, unlock_condition='') :
        self.id = id
        self.kor_title = kor_title
        self.jap_title = jap_title
        self.type = type
        self.property = property
        self.unlock_level = unlock_level
        self.unlock_condition = unlock_condition

    def set_id(self, id) :
        self.id = id

    def set_kor_title(self, kor_title) :
        self.kor_title = kor_title

    def set_jap_title(self, jap_title) :
        self.jap_title = jap_title

    def set_type(self, type) :
        self.type = type
    
    def set_property(self, property) :
        self.property = property

    def set_unlock_level(self, unlock_level) :
        self.unlock_level = unlock_level

    def set_unlock_condition(self, unlock_condition) :
        self.unlock_condition = unlock_condition

    def __str__(self) :
        return 'id/{} korTitle/{} japTitle/{}\ntype/{} property/{}\nunlockLevel/{} unlockCondition/{}'.format(self.id, self.kor_title, self.jap_title, self.type, self.property, self.unlock_level, self.unlock_condition)

def parse_song_info(song_id) :
    url = 'http://lovelive.inven.co.kr/dataninfo/music/detail.php?d=3&c={0}'.format(song_id)
    req = requests.get(url)
    html = req.text

    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        song_info = soup.find('div', { 'class' : 'rightPart' })

        if song_info != None :
            info_table = song_info.find('table')
            value_tds = info_table.find_all('td')
            save_model = SongInfoModel()
            
            for idx, td_val in enumerate(value_tds) :
                value = td_val.getText()

                if idx == KOR_TITLE_IDX :
                    save_model.set_kor_title(value)
                elif idx == JAP_TITLE_IDX :
                    save_model.set_jap_title(value)
                elif idx == TYPE_IDX :
                    save_model.set_type(value)
                elif idx == PROPERTY_IDX :
                    save_model.set_property(value)
                elif idx == UNLOCK_LEVEL_IDX :
                    save_model.set_unlock_level(int(re.findall('\d+', value)[0]))
                elif idx == UNLOCK_CONDITION_IDX :
                    save_model.set_unlock_condition(value)
            
            SongInfo(
                id = int(song_id),
                kor_title = save_model.kor_title,
                jap_title = save_model.jap_title,
                type = save_model.type,
                property = save_model.property,
                unlock_level = save_model.unlock_level,
                unlock_condition = save_model.unlock_condition
            ).save()

if __name__ == '__main__' :
    if SongInfo.objects.count() > 0 :
        SongInfo.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_song_info, parse_song_id_list())   