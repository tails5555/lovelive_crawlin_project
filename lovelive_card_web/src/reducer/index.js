import { combineReducers } from 'redux';
import cardReducer from './card_reducer';
import detailReducer from './detail_reducer';
export const rootReducer = combineReducers({
    card : cardReducer,
    detail : detailReducer
});