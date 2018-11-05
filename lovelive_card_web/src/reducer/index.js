import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cardReducer from './card_info_reducer';
import detailReducer from './card_detail_reducer';
import effectReducer from './card_effect_reducer';
import messageReducer from './card_message_reducer';
import pairReducer from './card_pair_reducer';

import characterReducer from './character_reducer';

import songReducer from './song_info_reducer';

import mediaReducer from './media_reducer';

export const rootReducer = combineReducers({
    form : formReducer,
    card : cardReducer,
    detail : detailReducer,
    effect : effectReducer,
    message : messageReducer,
    pair : pairReducer,
    character : characterReducer,
    song : songReducer,
    media : mediaReducer,
});