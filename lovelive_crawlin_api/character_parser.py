import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

NAME_IDX = 0
VOICE_ACTOR_IDX = 1
GRADE_IDX = 2
BIRTHDAY_IDX = 3
HEIGHT_IDX = 4
THREE_SIZE_IDX = 5
BLOOD_TYPE_IDX = 6
HOBBIES_IDX = 7

class CharacterMainInfoModel :
    def __init__(self, kor_name='', jap_name='', voice_actor='', grade='', birthday='', height='', three_size='', blood_type='', hobbies='') :
        self.kor_name = kor_name
        self.jap_name = jap_name
        self.voice_actor = voice_actor
        self.grade = grade
        self.birthday = birthday
        self.height = height
        self.three_size = three_size
        self.blood_type = blood_type
        self.hobbies = hobbies
    
    def set_kor_name(self, kor_name) :
        self.kor_name = kor_name
    
    def set_jap_name(self, jap_name) :
        self.jap_name = jap_name

    def set_voice_actor(self, voice_actor) :
        self.voice_actor = voice_actor
    
    def set_grade(self, grade) :
        self.grade = grade

    def set_birthday(self, birthday) :
        self.birthday = birthday

    def set_height(self, height) :
        self.height = height

    def set_three_size(self, three_size) :
        self.three_size = three_size

    def set_blood_type(self, blood_type) :
        self.blood_type = blood_type

    def set_hobbies(self, hobbies) :
        self.hobbies = hobbies

    def __str__(self) :
        return 'korName/{} japName/{} voiceActor/{}\ngrade/{} birthday/{} height/{}\nthreeSize/{} bloodType/{} hobbies/{}\n'.format(self.kor_name, self.jap_name, self.voice_actor, self.grade, self.birthday, self.height, self.three_size, self.blood_type, self.hobbies)

def parse_card_id_list() :
    req = requests.get('http://lovelive.inven.co.kr/dataninfo/card/')
    html = req.text
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        card_list_div = soup.find(id='listTable')
        card_table = card_list_div.find_all('table')

        if len(card_table) == 1 : 
            tmp_table = card_table[0]
            search_card_nos = []

            for card_tr in tmp_table.find_all('tr') : 
                idx_td = card_tr.find('td', {'class': 'ucode'})
                idx = idx_td.find(text=True) if idx_td != None else ''
                if idx.strip() != '' :
                    search_card_nos.append(int(idx))

            return search_card_nos

        else :
            return []

    else : 
        return []

def parse_character_info(card_no) :
    url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
    req = requests.get(url)
    html = req.text
    if req.status_code == 200 : 
        
        soup = BeautifulSoup(html, 'html.parser')
        character_intro_div = soup.find('div', {'class': 'characterData'})
        character_table = character_intro_div.find('table')
        characterInfo = CharacterMainInfoModel()

        for idx, card_td in enumerate(character_table.find_all('td')) :
            if idx == NAME_IDX :
                print(card_td.find(text=True))
            elif idx == VOICE_ACTOR_IDX :
                print(card_td.find(text=True))
            elif idx == GRADE_IDX :
                print(card_td.find(text=True))
            elif idx == BIRTHDAY_IDX :
                print(card_td.find(text=True))
            elif idx == HEIGHT_IDX :
                print(card_td.find(text=True))
            elif idx == THREE_SIZE_IDX :
                print(card_td.find(text=True))
            elif idx == BLOOD_TYPE_IDX :
                print(card_td.find(text=True))
            elif idx == HOBBIES_IDX :
                print(card_td.find(text=True))

if __name__ == '__main__' :
    
    ## pool = Pool(processes=4)
    ## print(pool.map(parse_character_info, parse_card_id_list()))

    parse_character_info(1535)