import { combineReducers } from 'redux';
import cardReducer from './card_reducer';

export const rootReducer = combineReducers({
    card : cardReducer
});