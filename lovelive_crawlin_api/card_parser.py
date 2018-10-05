import requests
from bs4 import BeautifulSoup

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import CardInfo

NO_IDX = 0
RANK_IDX = 1
ICON_IDX = 2
CARD_MAIN_IDX = 3
PROPERTY_IDX = 4
CENTER_EFFECT_IDX = 5
SMILE_IDX = 6
PURE_IDX = 7
COOL_IDX = 8
ACTIVE_SKILL_IDX = 9

class CardInfoModel :
    def __init__(self, no=0, rank='', icon_url_1='', icon_url_2='', card_title='', character_name='', japanese_name='', property='', center_effect='', smile=0, pure=0, cool=0, active_condition='', active_skill='') :
        self.no = no
        self.rank = rank
        self.icon_url_1 = icon_url_1
        self.icon_url_2 = icon_url_2
        self.card_title = card_title
        self.character_name = character_name
        self.japanese_name = japanese_name
        self.property = property
        self.center_effect = center_effect
        self.smile = smile
        self.pure = pure
        self.cool = cool
        self.active_condition = active_condition
        self.active_skill = active_skill

    def set_no(self, no) :
        self.no = no
    
    def set_rank(self, rank) : 
        self.rank = rank
    
    def set_icon_url1(self, icon_url_1) :
        self.icon_url_1 = icon_url_1

    def set_icon_url2(self, icon_url_2) :
        self.icon_url_2 = icon_url_2

    def set_card_title(self, card_title) :
        self.card_title = card_title

    def set_character_name(self, character_name) : 
        self.character_name = character_name.strip()

    def set_japanese_name(self, japanese_name) :
        self.japanese_name = japanese_name

    def set_property(self, property) :
        self.property = property

    def set_center_effect(self, center_effect) :
        self.center_effect = center_effect

    def set_smile(self, smile) :
        self.smile = smile

    def set_pure(self, pure) :
        self.pure = pure

    def set_cool(self, cool) :
        self.cool = cool

    def set_active_condition(self, active_condition) :
        self.active_condition = active_condition

    def set_active_skill(self, active_skill) :
        self.active_skill = active_skill

    def __str__(self) : 
        return 'No/{} Rank/{} Title/{} Name/{} Japanese/{}\nicon1/{}\nicon2/{}\nproperty/{} centerEffect/{} smileVal/{} pureVal/{} coolVal/{} activeCondition/{} activeSkill/{}\n'.format(self.no, self.rank, self.card_title, self.character_name, self.japanese_name, self.icon_url_1, self.icon_url_2, self.property, self.center_effect, self.smile, self.pure, self.cool, self.active_condition, self.active_skill)

def parse_card_info():
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
                card_info = CardInfoModel()
                
                for idx, card_td in enumerate(card_tr.find_all('td')) :
                    if idx == NO_IDX :
                        card_info.set_no(card_td.getText())

                    elif idx == RANK_IDX :
                        rank_value = card_td.find(text=True, recursive=False)
                        card_info.set_rank(rank_value)

                    elif idx == ICON_IDX :
                        icons = card_td.find_all('img')

                        if len(icons) == 2 :
                            card_info.set_icon_url1(icons[0]['src'])
                            card_info.set_icon_url2(icons[1]['src'])

                        elif len(icons) == 1 :
                            card_info.set_icon_url1(icons[0]['src'])
                            card_info.set_icon_url2('')

                        else :
                            card_info.set_icon_url1('')
                            card_info.set_icon_url2('')
                        
                    elif idx == CARD_MAIN_IDX :
                        card_title = card_td.find('span', {'class': 'cardtitle'})
                        character_info = card_td.find('a')
                        japanese_name_info = character_info.find('span', attrs={'class': None})
                        
                        card_info.set_card_title(card_title.find(text=True) if card_title != None else '')
                        card_info.set_character_name(character_info.find(text=True))
                        card_info.set_japanese_name(japanese_name_info.find(text=True))
                    
                    elif idx == PROPERTY_IDX :
                        property_value = card_td.find('span')
                        card_info.set_property(property_value.find(text=True))
                    
                    elif idx == CENTER_EFFECT_IDX :
                        center_effect_value = card_td.find(text=True, recursive=False)
                        card_info.set_center_effect(center_effect_value)
                    
                    elif idx == SMILE_IDX :
                        smile_value = card_td.find(text=True)
                        card_info.set_smile(smile_value)

                    elif idx == PURE_IDX :
                        pure_value = card_td.find(text=True)
                        card_info.set_pure(pure_value)
                    
                    elif idx == COOL_IDX :
                        cool_value = card_td.find(text=True)
                        card_info.set_cool(cool_value)

                    elif idx == ACTIVE_SKILL_IDX :
                        active_skill_arr = card_td.find_all(text=True, recursive=False)

                        if(len(active_skill_arr) == 2) :
                            condition_value = active_skill_arr[0]
                            skill_value = active_skill_arr[1]
                            card_info.set_active_condition(condition_value)
                            card_info.set_active_skill(skill_value)

                        elif(len(active_skill_arr) == 1) :
                            condition_value = active_skill_arr[0]
                            card_info.set_active_condition(condition_value)
                    
                card_infos.append(card_info)
            return card_infos

        else :
            return []

    else : 
        return []

if __name__ == '__main__' :
    if CardInfo.objects.count() > 0 :
        CardInfo.objects.all().delete()
    
    card_info_models = parse_card_info()
    
    for card_info in card_info_models :
        CardInfo(
            no = card_info.no,
            rank = card_info.rank,
            icon_url_1 = card_info.icon_url_1,
            icon_url_2 = card_info.icon_url_2,
            card_title = card_info.card_title,
            character_name = card_info.character_name,
            japanese_name = card_info.japanese_name,
            property = card_info.property,
            center_effect = card_info.center_effect,
            smile = card_info.smile,
            pure = card_info.pure,
            cool = card_info.cool,
            active_condition = card_info.active_condition,
            active_skill = card_info.active_skill
        ).save()