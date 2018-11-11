import {
    FETCH_CARD_EFFECTS_BY_INFO_NO, FETCH_CARD_EFFECTS_BY_INFO_NO_SUCCESS, FETCH_CARD_EFFECTS_BY_INFO_NO_FAILURE, RESET_FETCH_CARD_EFFECTS_BY_INFO_NO
} from '../action/action_card_effect';

const INITIAL_STATE = {
    effectList : {
        results : [], error : []
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_CARD_EFFECTS_BY_INFO_NO :
            return { ...state, effectList : { results : [], error : [] }};
        case FETCH_CARD_EFFECTS_BY_INFO_NO_SUCCESS :
            return { ...state, effectList : { results : action.payload, error : [] }};
        case FETCH_CARD_EFFECTS_BY_INFO_NO_FAILURE :
            const { detail } = action.payload;
            return { ...state, effectList : { results : [], error : detail }};
        case RESET_FETCH_CARD_EFFECTS_BY_INFO_NO :
            return { ...state, effectList : { results : [], error : [] }};

        default :
            return state;
    }
}