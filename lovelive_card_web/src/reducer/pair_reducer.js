import {
    FETCH_PAIRS_BY_CARD_NO, FETCH_PAIRS_BY_CARD_NO_SUCCESS, FETCH_PAIRS_BY_CARD_NO_FAILURE, RESET_FETCH_PAIRS_BY_CARD_NO
} from '../action/action_pair';

const INITIAL_STATE = {
    pairList : {
        results : null, error : []
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_PAIRS_BY_CARD_NO :
            return { ...state, pairList : { results : [], error : [] }};
        case FETCH_PAIRS_BY_CARD_NO_SUCCESS :
            return { ...state, pairList : { results : action.payload, error : [] }};
        case FETCH_PAIRS_BY_CARD_NO_FAILURE :
            const { info } = action.payload;
            return { ...state, pairList : { results : [], error : info }};
        case RESET_FETCH_PAIRS_BY_CARD_NO :
            return { ...state, pairList : { results : [], error : [] }};

        default :
            return state;
    }
}