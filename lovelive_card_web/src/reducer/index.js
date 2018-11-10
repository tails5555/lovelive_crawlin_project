import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cardInfoReducer from './card_info_reducer';
import cardDetailReducer from './card_detail_reducer';
import cardEffectReducer from './card_effect_reducer';
import cardMessageReducer from './card_message_reducer';
import cardPairReducer from './card_pair_reducer';

import characterReducer from './character_reducer';

import songInfoReducer from './song_info_reducer';
import songDetailReducer from './song_detail_reducer';

import eventInfoReducer from './event_info_reducer';

import mediaReducer from './media_reducer';

export const rootReducer = combineReducers({
    form : formReducer,
    card_info : cardInfoReducer,
    card_detail : cardDetailReducer,
    card_effect : cardEffectReducer,
    card_message : cardMessageReducer,
    card_pair : cardPairReducer,
    character : characterReducer,
    song_info : songInfoReducer,
    song_detail : songDetailReducer,
    event_info : eventInfoReducer,
    media : mediaReducer,
});