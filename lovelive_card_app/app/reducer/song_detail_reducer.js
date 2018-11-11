import {
    FETCH_SONG_DETAIL_BY_INFO_ID, FETCH_SONG_DETAIL_BY_INFO_ID_SUCCESS, FETCH_SONG_DETAIL_BY_INFO_ID_FAILURE, RESET_FETCH_SONG_DETAIL_BY_INFO_ID
} from '../action/action_song_detail';

const INITIAL_STATE = {
    detailElement : {
        result : [], error : []
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_SONG_DETAIL_BY_INFO_ID :
            return { ...state, detailElement : { result : [], error : [] }};
        case FETCH_SONG_DETAIL_BY_INFO_ID_SUCCESS :
            return { ...state, detailElement : { result : action.payload, error : [] }};
        case FETCH_SONG_DETAIL_BY_INFO_ID_FAILURE :
            const { info } = action.payload;
            return { ...state, detailElement : { result : [], error : info }};
        case RESET_FETCH_SONG_DETAIL_BY_INFO_ID :
            return { ...state, detailElement : { result : [], error : [] }};

        default :
            return state;
    }
}