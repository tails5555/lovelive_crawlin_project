import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cardReducer from './card_reducer';
import detailReducer from './detail_reducer';
import mediaReducer from './media_reducer';
import characterReducer from './character_reducer';
import effectReducer from './effect_reducer';
import messageReducer from './message_reducer';

export const rootReducer = combineReducers({
    form : formReducer,
    card : cardReducer,
    detail : detailReducer,
    media : mediaReducer,
    character : characterReducer,
    effect : effectReducer,
    message : messageReducer
});