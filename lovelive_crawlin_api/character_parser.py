import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

import re

from lovelive_api.models import CharacterMainInfo
from common_functions import parse_card_id_list

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

def parse_character_info(card_no) :
    url = 'http://lovelive.inven.co.kr/dataninfo/card/detail.php?d=2&c={0}'.format(card_no)
    req = requests.get(url)
    html = req.text
    
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        character_intro_div = soup.find('div', {'class': 'characterData'})
        character_table = character_intro_div.find('table')
        character_info = CharacterMainInfoModel()

        for idx, card_td in enumerate(character_table.find_all('td')) :
            if idx == NAME_IDX :
                hangul_reg = re.compile('[ ㄱ-ㅣ가-힣]+')
                hanja_reg = re.compile('[^ ㄱ-ㅣ가-힣()]+')

                name_value = card_td.find(text=True)
                kor_name = hangul_reg.findall(name_value)
                jap_name = hanja_reg.findall(name_value)
                
                if len(kor_name) == 1 :
                    character_info.set_kor_name(kor_name[0].strip())
                
                if len(jap_name) == 1 :
                    character_info.set_jap_name(jap_name[0].strip())

            elif idx == VOICE_ACTOR_IDX :
                voice_actor_value = card_td.find(text=True)
                character_info.set_voice_actor(voice_actor_value)

            elif idx == GRADE_IDX :
                num_reg = re.compile('[0-9]+')
                grade_value = num_reg.findall(card_td.find(text=True))

                if len(grade_value) == 1 :
                    character_info.set_grade(grade_value[0])
                else :
                    character_info.set_grade(0)

            elif idx == BIRTHDAY_IDX :
                birthday_value = card_td.find(text=True)
                character_info.set_birthday(birthday_value)

            elif idx == HEIGHT_IDX :
                num_reg = re.compile('[0-9]+')
                height_value = num_reg.findall(card_td.find(text=True))

                if len(height_value) == 1 :
                    character_info.set_height(height_value[0])
                else :
                    character_info.set_height(0)

            elif idx == THREE_SIZE_IDX :
                three_size_value = card_td.find(text=True)
                character_info.set_three_size(three_size_value)

            elif idx == BLOOD_TYPE_IDX :
                alphabet_reg = re.compile('[^ ㄱ-ㅣ가-힣]+')
                blood_type_value = alphabet_reg.findall(card_td.find(text=True))
                
                if len(blood_type_value) == 1 :
                    character_info.set_blood_type(blood_type_value[0])

            elif idx == HOBBIES_IDX :
                hobbies_value = card_td.find(text=True)
                character_info.set_hobbies(hobbies_value)

        if character_info.kor_name.strip() != '' :
            character_query_result = CharacterMainInfo.objects.filter(kor_name=character_info.kor_name).first()
            if character_query_result == None :
                CharacterMainInfo(
                    kor_name = character_info.kor_name,
                    jap_name = character_info.jap_name,
                    voice_actor = character_info.voice_actor,
                    grade = character_info.grade,
                    birthday = character_info.birthday,
                    height = character_info.height,
                    three_size = character_info.three_size,
                    blood_type = character_info.blood_type,
                    hobbies = character_info.hobbies
                ).save()
                
            else :
                character_query_result.hobbies = character_info.hobbies
                character_query_result.save()

if __name__ == '__main__' :
    if CharacterMainInfo.objects.count() > 0 :
        CharacterMainInfo.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_character_info, parse_card_id_list())   