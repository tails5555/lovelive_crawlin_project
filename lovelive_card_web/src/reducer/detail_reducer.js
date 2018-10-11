import {
    FETCH_CARD_DETAIL_BY_INFO_NO, FETCH_CARD_DETAIL_BY_INFO_NO_SUCCESS, FETCH_CARD_DETAIL_BY_INFO_NO_FAILURE, RESET_FETCH_CARD_DETAIL_BY_INFO_NO
} from '../action/action_detail';

const INITIAL_STATE = {
    detailElement : {
        result : [], error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CARD_DETAIL_BY_INFO_NO :
            return { ...state, detailElement : { result : [], error : null }};
        case FETCH_CARD_DETAIL_BY_INFO_NO_SUCCESS :
            return { ...state, detailElement : { result : action.payload, error : null }};
        case FETCH_CARD_DETAIL_BY_INFO_NO_FAILURE :
            const { info } = action.payload;
            return { ...state, detailElement : { result : [], error : info }};
        case RESET_FETCH_CARD_DETAIL_BY_INFO_NO :
            return { ...state, detailElement : { result : [], error : null }};

        default :
            return state;
    }
}