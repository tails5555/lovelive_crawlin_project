import {
    FETCH_CARD_INFOS_BY_PAGE, FETCH_CARD_INFOS_BY_PAGE_SUCCESS, FETCH_CARD_INFOS_BY_PAGE_FAILURE, RESET_FETCH_CARD_INFOS_BY_PAGE
} from '../action/action_card';

const INITIAL_STATE = {
    cardList : {
        count : 0, next : null, previous : null, results : [], error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CARD_INFOS_BY_PAGE :
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [] }};
        case FETCH_CARD_INFOS_BY_PAGE_SUCCESS :
            const { count, next, previous, results } = action.payload;
            return { ...state, cardList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_CARD_INFOS_BY_PAGE_FAILURE :
            const { detail } = action.payload;
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [], error : detail }};
        case RESET_FETCH_CARD_INFOS_BY_PAGE :
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [], error : null }};

        default :
            return state;
    }
}