import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool 

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo, CardDetail
from common_functions import parse_card_id_list

class CardDetailModel :
    def __init__(self, info=None, basic_smile=0, basic_pure=0, basic_cool=0, basic_hp=0, full_smile=0, full_pure=0, full_cool=0, full_hp=0, wake_up_smile=0, wake_up_pure=0, wake_up_cool=0, wake_up_hp=0, img_url_1='', img_url_2='', property_shape='', main_effect='', plus_effect='') :
        self.info = info
        self.basic_smile = basic_smile
        self.basic_pure = basic_pure
        self.basic_cool = basic_cool
        self.basic_hp = basic_hp
        self.full_smile = full_smile
        self.full_pure = full_pure
        self.full_cool = full_cool
        self.full_hp = full_hp
        self.wake_up_smile = wake_up_smile
        self.wake_up_pure = wake_up_pure
        self.wake_up_cool = wake_up_cool
        self.wake_up_hp = wake_up_hp
        self.img_url_1 = img_url_1
        self.img_url_2 = img_url_2
        self.property_shape = property_shape
        self.main_effect = main_effect
        self.plus_effect = plus_effect

    def set_info(self, info) :
        self.info = info

    def set_basic_smile(self, basic_smile) :
        self.basic_smile = basic_smile

    def set_basic_pure(self, basic_pure) :
        self.basic_pure = basic_pure

    def set_basic_cool(self, basic_cool) :
        self.basic_cool = basic_cool
    
    def set_basic_hp(self, basic_hp) :
        self.basic_hp = basic_hp

    def set_full_smile(self, full_smile) :
        self.full_smile = full_smile

    def set_full_pure(self, full_pure) :
        self.full_pure = full_pure

    def set_full_cool(self, full_cool) :
        self.full_cool = full_cool
    
    def set_full_hp(self, full_hp) :
        self.full_hp = full_hp

    def set_wake_up_smile(self, wake_up_smile) :
        self.wake_up_smile = wake_up_smile

    def set_wake_up_pure(self, wake_up_pure) :
        self.wake_up_pure = wake_up_pure

    def set_wake_up_cool(self, wake_up_cool) :
        self.wake_up_cool = wake_up_cool
    
    def set_wake_up_hp(self, wake_up_hp) :
        self.wake_up_hp = wake_up_hp

    def set_img_url_1(self, img_url_1) :
        self.img_url_1 = img_url_1

    def set_img_url_2(self, img_url_2) :
        self.img_url_2 = img_url_2

    def set_property_shape(self, property_shape) :
        self.property_shape = property_shape

    def set_main_effect(self, main_effect) :
        self.main_effect = main_effect

    def set_plus_effect(self, plus_effect) :
        self.plus_effect = plus_effect

    def __str__(self) :
        return 'img1> {}\nimg2> {}\n기본 Smile/{} Pure/{} Cool/{} HP/{}\n만렙 Smile/{} Pure/{} Cool/{} HP/{}\n각성 Smile/{} Pure/{} Cool/{} HP/{}\n특수효과 종류/{} 기본효과/{} 추가효과/{}\n'.format(self.img_url_1, self.img_url_2, self.basic_smile, self.basic_pure, self.basic_cool, self.basic_hp, self.full_smile, self.full_pure, self.full_cool, self.full_hp, self.wake_up_smile, self.wake_up_pure, self.wake_up_cool, self.wake_up_hp, self.property_shape, self.main_effect, self.plus_effect)

BASIC_SMILE_IDX = 0
BASIC_PURE_IDX = 1
BASIC_COOL_IDX = 2
BASIC_HP_IDX = 3
FULL_SMILE_IDX = 4
FULL_PURE_IDX = 5
FULL_COOL_IDX = 6
FULL_HP_IDX = 7
WAKE_UP_SMILE_IDX = 8
WAKE_UP_PURE_IDX = 9
WAKE_UP_COOL_IDX = 10
WAKE_UP_HP_IDX = 11
CENTER_EFFECT_IDX = 12

PROPERTY_SHAPE_IDX = 0
MAIN_EFFECT_IDX = 1
PLUS_EFFECT_IDX = 2

def parse_each_card_detail_info(card_no) :
    card_detail_model = CardDetailModel()
    card_info = CardInfo.objects.filter(no=card_no).first()

    if card_info != None :
        card_detail_model.set_info(card_info)
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
                    card_detail_model.set_img_url_1(card_imgs[0]['src'])
                    card_detail_model.set_img_url_2(card_imgs[1]['src'])
                
                else :
                    card_detail_model.set_img_url_1(card_imgs[0]['src'])
                    card_detail_model.set_img_url_2(card_imgs[0]['src'])

            if card_detail_div != None : 
                table_tds = card_detail_div.find_all('td')
                
                for idx, cur_td in enumerate(table_tds) :
                    value = ''
                    
                    if idx != CENTER_EFFECT_IDX :
                        value = cur_td.find(text=True) 

                        if idx == BASIC_SMILE_IDX :
                            card_detail_model.set_basic_smile(value)
                        elif idx == BASIC_PURE_IDX :
                            card_detail_model.set_basic_pure(value)
                        elif idx == BASIC_COOL_IDX :
                            card_detail_model.set_basic_cool(value)
                        elif idx == BASIC_HP_IDX :
                            card_detail_model.set_basic_hp(value)
                        elif idx == FULL_SMILE_IDX :
                            card_detail_model.set_full_smile(value)
                        elif idx == FULL_PURE_IDX :
                            card_detail_model.set_full_pure(value)
                        elif idx == FULL_COOL_IDX :
                            card_detail_model.set_full_cool(value)
                        elif idx == FULL_HP_IDX :
                            card_detail_model.set_full_hp(value)
                        elif idx == WAKE_UP_SMILE_IDX :
                            card_detail_model.set_wake_up_smile(value)
                        elif idx == WAKE_UP_PURE_IDX :
                            card_detail_model.set_wake_up_pure(value)
                        elif idx == WAKE_UP_COOL_IDX :
                            card_detail_model.set_wake_up_cool(value)
                        elif idx == WAKE_UP_HP_IDX :
                            card_detail_model.set_wake_up_hp(value)

                    else :
                        table_texts = cur_td.find_all(text=True)

                        for idx, cur_text in enumerate(table_texts) :
                            
                            if idx == BASIC_SMILE_IDX :
                                card_detail_model.set_property_shape(cur_text)
                            elif idx == BASIC_PURE_IDX :
                                card_detail_model.set_main_effect(cur_text)
                            elif idx == BASIC_COOL_IDX :
                                card_detail_model.set_plus_effect(cur_text)

    print(card_detail_model)

if __name__ == '__main__' :
    pool = Pool(processes=6)
    site_character_list = pool.map(parse_each_card_detail_info, parse_card_id_list())   