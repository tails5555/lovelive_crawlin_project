import {
    FETCH_CARD_IMAGES_BY_INFO_NO, FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS, FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE, RESET_FETCH_CARD_IMAGES_BY_INFO_NO
} from '../action/action_image';

const INITIAL_STATE = {
    cardImages : {
        results : [], error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CARD_IMAGES_BY_INFO_NO :
            return { ...state, cardImages : { results : [], error : null }};
        case FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS :
            return { ...state, cardImages : { results : action.payload, error : null }};
        case FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE :
            const { info } = action.payload;
            return { ...state, cardImages : { results : [], error : info }};
        case RESET_FETCH_CARD_IMAGES_BY_INFO_NO :
            return { ...state, cardImages : { results : [], error : null }};

        default :
            return state;
    }
}