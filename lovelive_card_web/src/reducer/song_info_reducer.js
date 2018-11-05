import {
    FETCH_SONG_INFOS_BY_QUERY, FETCH_SONG_INFOS_BY_QUERY_SUCCESS, FETCH_SONG_INFOS_BY_QUERY_FAILURE, RESET_FETCH_SONG_INFOS_BY_QUERY
} from '../action/action_song_info';

const INITIAL_STATE = {
    songList : {
        count : 0, next : null, previous : null, results : [], error : null
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
        default :
            return state;
    }
}