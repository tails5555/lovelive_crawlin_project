import {
    FETCH_CARD_INFOS_BY_QUERY, FETCH_CARD_INFOS_BY_QUERY_SUCCESS, FETCH_CARD_INFOS_BY_QUERY_FAILURE, RESET_FETCH_CARD_INFOS_BY_QUERY,
    FETCH_CARD_INFOS_RECENTLY, FETCH_CARD_INFOS_RECENTLY_SUCCESS, FETCH_CARD_INFOS_RECENTLY_FAILURE, RESET_FETCH_CARD_INFOS_RECENTLY,
    FETCH_CARD_INFO_BY_NO, FETCH_CARD_INFO_BY_NO_SUCCESS, FETCH_CARD_INFO_BY_NO_FAILURE, RESET_FETCH_CARD_INFO_BY_NO
} from '../action/action_card';

const INITIAL_STATE = {
    cardList : {
        count : 0, next : null, previous : null, results : [], error : null
    },
    cardInfo : {
        result : null, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CARD_INFOS_BY_QUERY :
        case FETCH_CARD_INFOS_RECENTLY :
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [], error : null }};
        case FETCH_CARD_INFOS_BY_QUERY_SUCCESS :
        case FETCH_CARD_INFOS_RECENTLY_SUCCESS : 
            const { count, next, previous, results } = action.payload;
            return { ...state, cardList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_CARD_INFOS_BY_QUERY_FAILURE :
        case FETCH_CARD_INFOS_RECENTLY_FAILURE :
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [], error : action.payload && action.payload.detail }};
        case RESET_FETCH_CARD_INFOS_BY_QUERY :
        case RESET_FETCH_CARD_INFOS_RECENTLY :
            return { ...state, cardList : { count : 0, next : null, previous : null, results : [], error : null }};

        case FETCH_CARD_INFO_BY_NO : 
            return { ...state, cardInfo : { result : null, error : null }};
        case FETCH_CARD_INFO_BY_NO_SUCCESS : 
            return { ...state, cardInfo : { result : action.payload, error : null }};
        case FETCH_CARD_INFO_BY_NO_FAILURE :
            return { ...state, cardInfo : { result : null, error : action.payload && action.payload.detail }};
        case RESET_FETCH_CARD_INFO_BY_NO : 
            return { ...state, cardInfo : { result : null, error : null }};
        
        default :
            return state;
    }
}