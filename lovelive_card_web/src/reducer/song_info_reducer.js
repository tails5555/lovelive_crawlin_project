import {
    FETCH_SONG_INFOS_BY_QUERY, FETCH_SONG_INFOS_BY_QUERY_SUCCESS, FETCH_SONG_INFOS_BY_QUERY_FAILURE, RESET_FETCH_SONG_INFOS_BY_QUERY,
    FETCH_SONG_INFO_BY_ID, FETCH_SONG_INFO_BY_ID_SUCCESS, FETCH_SONG_INFO_BY_ID_FAILURE, RESET_FETCH_SONG_INFO_BY_ID
} from '../action/action_song_info';

const INITIAL_STATE = {
    songList : {
        count : 0, next : null, previous : null, results : [], error : null
    },
    songInfo : {
        result : null, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_SONG_INFOS_BY_QUERY :
            return { ...state, songList : { count : 0, next : null, previous : null, results : [], error : null }};
        case FETCH_SONG_INFOS_BY_QUERY_SUCCESS :
            const { count, next, previous, results } = action.payload;
            return { ...state, songList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_SONG_INFOS_BY_QUERY_FAILURE :
            return { ...state, songList : { count : 0, next : null, previous : null, results : [], error : action.payload && action.payload.detail }};
        case RESET_FETCH_SONG_INFOS_BY_QUERY :
            return { ...state, songList : { count : 0, next : null, previous : null, results : [], error : null }};

        case FETCH_SONG_INFO_BY_ID : 
            return { ...state, songInfo : { result : null, error : null }};
        case FETCH_SONG_INFO_BY_ID_SUCCESS : 
            return { ...state, songInfo : { result : action.payload, error : null }};
        case FETCH_SONG_INFO_BY_ID_FAILURE :
            return { ...state, songInfo : { result : null, error : action.payload && action.payload.detail }};
        case RESET_FETCH_SONG_INFO_BY_ID : 
            return { ...state, songInfo : { result : null, error : null }};
        
        default :
            return state;
    }
}