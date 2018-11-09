import requests
from bs4 import BeautifulSoup
from urllib import parse
from datetime import datetime

import os, re

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

import django
django.setup()

from lovelive_api.models import EventInfo, SongInfo, CardInfo

class EventInfoModel :
    def __init__(self, region='KOR', card_info=None, song_info=None, event_title='', event_context='', start_date=None, end_date=None, album_cut_score=0, skill_cut_score=0, skill_pivot_rank=0, wake_up_cut_score=0, wake_up_pivot_rank=0, first_cut_score=0) :
        self.region = region
        self.card_info = card_info
        self.song_info = song_info
        self.event_title = event_title
        self.event_context = event_context
        self.start_date = start_date
        self.end_date = end_date
        self.album_cut_score = album_cut_score
        self.skill_cut_score = skill_cut_score
        self.skill_pivot_rank = skill_pivot_rank
        self.wake_up_cut_score = wake_up_cut_score
        self.wake_up_pivot_rank = wake_up_pivot_rank
        self.first_cut_score = first_cut_score
    
    def set_region(self, region) :
        self.region = region

    def set_card_info(self, card_info) :
        self.card_info = card_info
    
    def set_song_info(self, song_info) :
        self.song_info = song_info

    def set_event_title(self, event_title) :
        self.event_title = event_title

    def set_event_context(self, event_context) :
        self.event_context = event_context

    def set_start_date(self, start_date) :
        self.start_date = start_date

    def set_end_date(self, end_date) :
        self.end_date = end_date

    def set_album_cut_score(self, album_cut_score) :
        self.album_cut_score = album_cut_score

    def set_skill_cut_score(self, skill_cut_score) :
        self.skill_cut_score = skill_cut_score

    def set_skill_pivot_rank(self, skill_pivot_rank) :
        self.skill_pivot_rank = skill_pivot_rank

    def set_wake_up_cut_score(self, wake_up_cut_score) :
        self.wake_up_cut_score = wake_up_cut_score

    def set_wake_up_pivot_rank(self, wake_up_pivot_rank) :
        self.wake_up_pivot_rank = wake_up_pivot_rank

    def set_first_cut_score(self, first_cut_score) :
        self.first_cut_score = first_cut_score

    def __str__(self) :
        return 'region/{} event_title/{} event_context/{}\nstart_date/{} end_date/{}\nalbum_cut_score/{} skill_cut_score/{} skill_pivot_rank/{}\nwake_up_cut_score/{} wake_up_pivot_rank/{} first_cut_score/{}'.format(self.region, self.event_title, self.event_context, self.start_date, self.end_date, self.album_cut_score, self.skill_cut_score, self.skill_pivot_rank, self.wake_up_cut_score, self.wake_up_pivot_rank, self.first_cut_score)

CARD_INFO_IDX = 0
SONG_AND_EVENT_CONTEXT_IDX = 1
DATE_IDX = 2
ALBUM_CUT_IDX = 4
SKILL_CUT_IDX = 5
WAKE_UP_CUT_IDX = 6
FIRST_CUT_IDX = 7

def parse_event_info() :
    req = requests.get('http://lovelive.inven.co.kr/dataninfo/event/list.php')
    html = req.text
    if req.status_code == 200 : 
        soup = BeautifulSoup(html, 'html.parser')
        event_list_divs = soup.find_all('div', { 'class' : 'listTable' })

        for idx, event_div in enumerate(event_list_divs) :
            event_table = event_div.find('table')
            event_tbody = event_table.find('tbody')

            for event_tr in event_tbody.find_all('tr') :
                event_info_model = EventInfoModel()

                for idx_td, event_td in enumerate(event_tr.find_all('td')) :
                    if idx_td == CARD_INFO_IDX :
                        img_tag = event_td.find('img')
                        file_name = os.path.basename(img_tag['src'])
                        info_id = re.findall('\d+', file_name)[0]
                        card_info = CardInfo.objects.filter(no=int(info_id)).first()
                        if card_info != None :
                            event_info_model.set_card_info(card_info)

                    if idx_td == SONG_AND_EVENT_CONTEXT_IDX :
                        event_title = event_td.find(text=True) if idx == 0 else event_td.find(text=True, recursive=False)
                        special_tag = event_td.find('span', { 'class' : 'special' })
                        song_link_tag = event_td.find('a')    
                        event_info_model.set_event_title(event_title)
                        
                        if song_link_tag != None :
                            song_title = song_link_tag.getText().replace('♪ ', '')
                            song_info = SongInfo.objects.filter(kor_title=song_title).first()
                            
                            if song_info != None :
                                event_info_model.set_song_info(song_info)    

                        if special_tag != None :
                            event_info_model.set_event_context(special_tag.getText())

                    if idx_td == DATE_IDX :
                        date_limit_text = event_td.getText()
                        date_list = date_limit_text.split('~')
                        start_date = datetime.strptime(date_list[0],'%Y-%m-%d %H:%M:%S')
                        end_date = datetime.strptime(date_list[1],'%Y-%m-%d %H:%M:%S')
                        event_info_model.set_start_date(start_date)
                        event_info_model.set_end_date(end_date)

                    if idx_td == ALBUM_CUT_IDX :
                        album_cut_score = event_td.getText()
                        event_info_model.set_album_cut_score(int(album_cut_score))

                    special_char = '\(.*?\)'

                    if idx_td == SKILL_CUT_IDX or idx_td == WAKE_UP_CUT_IDX :
                        tmp_score = event_td.find(text=True)
                        cut_score = 0 if tmp_score == '-' else int(tmp_score.replace(',', '').replace('pt', ''))
                        tmp_pivot_rank = re.findall(special_char, event_td.getText())
                        
                        if idx_td == SKILL_CUT_IDX :
                            event_info_model.set_skill_cut_score(cut_score)
                        elif idx_td == WAKE_UP_CUT_IDX :
                            event_info_model.set_wake_up_cut_score(cut_score)

                        if len(tmp_pivot_rank) > 0 :
                            pivot_rank = re.findall('\d+', tmp_pivot_rank[0])[0]
                            
                            if idx_td == SKILL_CUT_IDX :
                                event_info_model.set_skill_pivot_rank(int(pivot_rank))
                            elif idx_td == WAKE_UP_CUT_IDX :
                                event_info_model.set_wake_up_pivot_rank(int(pivot_rank))

                    if idx_td == FIRST_CUT_IDX :
                        cut_score = 0 if tmp_score == '불명' else int(tmp_score.replace(',', '').replace('pt', ''))
                        event_info_model.set_first_cut_score(cut_score)

                EventInfo(
                    region = 'KOR' if idx == 0 else 'JAP',
                    card_info = event_info_model.card_info,
                    song_info = event_info_model.song_info,
                    event_title = event_info_model.event_title,
                    event_context = event_info_model.event_context,
                    start_date = event_info_model.start_date,
                    end_date = event_info_model.end_date,
                    album_cut_score = event_info_model.album_cut_score,
                    skill_cut_score = event_info_model.skill_cut_score,
                    skill_pivot_rank = event_info_model.skill_pivot_rank,
                    wake_up_cut_score = event_info_model.wake_up_cut_score,
                    wake_up_pivot_rank = event_info_model.wake_up_pivot_rank,
                    first_cut_score = event_info_model.first_cut_score
                ).save()

if __name__ == '__main__' :
    parse_event_info()
        