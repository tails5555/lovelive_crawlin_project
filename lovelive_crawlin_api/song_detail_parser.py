import requests
import re
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lovelive_crawlin_api.settings")

from bs4 import BeautifulSoup
from multiprocessing import Pool

import django
django.setup()

from lovelive_api.models import SongInfo, SongDetail
from common_functions import parse_song_id_list

DIFFICULTY_IDX = 0
STAR_COUNT_IDX = 1
LEVEL_VALUE_IDX = 2
EXP_VALUE_IDX = 3
NOTE_COUNT_IDX = 4
DESTINY_COUNT_IDX = 5
C_RANK_SCORE_IDX = 6
B_RANK_SCORE_IDX = 7
A_RANK_SCORE_IDX = 8
S_RANK_SCORE_IDX = 9

class SongDetailModel :
    def __init__(self, info=None, difficulty='', star_count=0, level_value=0, exp_value=0, note_count=0, destiny_count=0, c_rank_score=0, b_rank_score=0, a_rank_score=0, s_rank_score=0) :
        self.info = info
        self.difficulty = difficulty
        self.star_count = star_count
        self.level_value = level_value
        self.exp_value = exp_value
        self.note_count = note_count
        self.destiny_count = destiny_count
        self.c_rank_score = c_rank_score
        self.b_rank_score = b_rank_score
        self.a_rank_score = a_rank_score
        self.s_rank_score = s_rank_score

    def set_info(self, info) :
        self.info = info

    def set_difficulty(self, difficulty) :
        self.difficulty = difficulty

    def set_star_count(self, star_count) :
        self.star_count = star_count

    def set_level_value(self, level_value) :
        self.level_value = level_value
    
    def set_exp_value(self, exp_value) :
        self.exp_value = exp_value

    def set_note_count(self, note_count) :
        self.note_count = note_count

    def set_destiny_count(self, destiny_count) :
        self.destiny_count = destiny_count

    def set_c_rank_score(self, c_rank_score) :
        self.c_rank_score = c_rank_score

    def set_b_rank_score(self, b_rank_score) :
        self.b_rank_score = b_rank_score

    def set_a_rank_score(self, a_rank_score) :
        self.a_rank_score = a_rank_score

    def set_s_rank_score(self, s_rank_score) :
        self.s_rank_score = s_rank_score

    def __str__(self) :
        return 'difficulty/{} starCount/{} levelVal/{} expVal/{}\nnoteCount/{} destinyCount/{}\nC/{} B/{} A/{} S/{}'.format(self.difficulty, self.star_count, self.level_value, self.exp_value, self.note_count, self.destiny_count, self.c_rank_score, self.b_rank_score, self.a_rank_score, self.s_rank_score)

def parse_song_detail(song_id) :
    song_info = SongInfo.objects.filter(id=song_id).first()
    if song_info != None :
        url = 'http://lovelive.inven.co.kr/dataninfo/music/detail.php?d=3&c={0}'.format(song_id)
        req = requests.get(url)
        html = req.text

        if req.status_code == 200 : 
            soup = BeautifulSoup(html, 'html.parser')
            song_detail = soup.find_all('div', { 'class' : 'details' })

            if len(song_detail) > 1:
                detail_table = song_detail[1].find('table')
                value_trs = detail_table.find_all('tr')
                
                for idx_tr, tr in enumerate(value_trs) :
                    if idx_tr != 0 :
                        save_model = SongDetailModel()

                        for idx_td, td in enumerate(tr.find_all('td')) :
                            value = td.getText()
                            if idx_td == DIFFICULTY_IDX :
                                save_model.set_difficulty(value)
                            elif idx_td == STAR_COUNT_IDX :
                                save_model.set_star_count(int(value) if value.strip() != '' else 0)
                            elif idx_td == LEVEL_VALUE_IDX :
                                save_model.set_level_value(int(value) if value.strip() != '' else 0)
                            elif idx_td == EXP_VALUE_IDX :
                                save_model.set_exp_value(int(value) if value.strip() != '' else 0)
                            elif idx_td == NOTE_COUNT_IDX :
                                save_model.set_note_count(int(value) if value.strip() != '' else 0)
                            elif idx_td == DESTINY_COUNT_IDX :
                                save_model.set_destiny_count(int(value) if value.strip() != '' else 0)
                            elif idx_td == C_RANK_SCORE_IDX :
                                save_model.set_c_rank_score(int(value) if value.strip() != '' else 0)
                            elif idx_td == B_RANK_SCORE_IDX :
                                save_model.set_b_rank_score(int(value) if value.strip() != '' else 0)
                            elif idx_td == A_RANK_SCORE_IDX :
                                save_model.set_a_rank_score(int(value) if value.strip() != '' else 0)
                            elif idx_td == S_RANK_SCORE_IDX :
                                save_model.set_s_rank_score(int(value) if value.strip() != '' else 0)

                        SongDetail(
                            info = song_info,
                            difficulty = save_model.difficulty,
                            star_count = save_model.star_count,
                            level_value = save_model.level_value,
                            exp_value = save_model.exp_value,
                            note_count = save_model.note_count,
                            destiny_count = save_model.destiny_count,
                            c_rank_score = save_model.c_rank_score,
                            b_rank_score = save_model.b_rank_score,
                            a_rank_score = save_model.a_rank_score,
                            s_rank_score = save_model.s_rank_score
                        ).save()

if __name__ == '__main__' :
    if SongDetail.objects.count() > 0 :
       SongDetail.objects.all().delete()

    pool = Pool(processes=6)
    pool.map(parse_song_detail, parse_song_id_list())   
