import {
    FETCH_CARD_IMAGES_BY_INFO_NO, FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS, FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE, RESET_FETCH_CARD_IMAGES_BY_INFO_NO,
    FETCH_CARD_IMAGES_BY_CHARACTER, FETCH_CARD_IMAGES_BY_CHARACTER_SUCCESS, FETCH_CARD_IMAGES_BY_CHARACTER_FAILURE, RESET_FETCH_CARD_IMAGES_BY_CHARACTER,
    FETCH_SONG_IMAGE_BY_ID, FETCH_SONG_IMAGE_BY_ID_SUCCESS, FETCH_SONG_IMAGE_BY_ID_FAILURE, RESET_FETCH_SONG_IMAGE_BY_ID
} from '../action/action_image';

const INITIAL_STATE = {
    cardImages : {
        results : [], error : []
    },
    songImages : {
        results : [], error : []
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CARD_IMAGES_BY_INFO_NO :
        case FETCH_CARD_IMAGES_BY_CHARACTER : 
            return { ...state, cardImages : { results : [], error : [] }};
        case FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS :
        case FETCH_CARD_IMAGES_BY_CHARACTER_SUCCESS :
            return { ...state, cardImages : { results : action.payload, error : [] }};
        case FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE :
        case FETCH_CARD_IMAGES_BY_CHARACTER_FAILURE :
            return { ...state, cardImages : { results : [], error : action.payload && action.payload.info  }};
        case RESET_FETCH_CARD_IMAGES_BY_INFO_NO :
        case RESET_FETCH_CARD_IMAGES_BY_CHARACTER :
            return { ...state, cardImages : { results : [], error : [] }};

        case FETCH_SONG_IMAGE_BY_ID :
            return { ...state, songImages : { results : [], error : [] }};
        case FETCH_SONG_IMAGE_BY_ID_SUCCESS :
            return { ...state, songImages : { results : action.payload, error : [] }};
        case FETCH_SONG_IMAGE_BY_ID_FAILURE :
            return { ...state, songImages : { results : [], error : action.payload && action.payload.info }};
        case RESET_FETCH_SONG_IMAGE_BY_ID :
            return { ...state, songImages : { results : [], error : [] }};
        
        default :
            return state;
    }
}