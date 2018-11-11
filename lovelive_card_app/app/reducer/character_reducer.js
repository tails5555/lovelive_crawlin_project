import {
    FETCH_CHARACTER_LIST_BY_QUERY, FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS, FETCH_CHARACTER_LIST_BY_QUERY_FAILURE, RESET_FETCH_CHARACTER_LIST_BY_QUERY,
    FETCH_CHARACTER_INFO_BY_ID, FETCH_CHARACTER_INFO_BY_ID_SUCCESS, FETCH_CHARACTER_INFO_BY_ID_FAILURE, RESET_FETCH_CHARACTER_INFO_BY_ID,
    FETCH_CHARACTER_INFO_BY_KOR_NAME, FETCH_CHARACTER_INFO_BY_KOR_NAME_SUCCESS, FETCH_CHARACTER_INFO_BY_KOR_NAME_FAILURE, RESET_FETCH_CHARACTER_INFO_BY_KOR_NAME
} from '../action/action_character';

const INITIAL_STATE = {
    characterList : {
        count : 0, next : null, previous : null, results : [], error : null
    },
    characterInfo : {
        result : null, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CHARACTER_LIST_BY_QUERY :
        case FETCH_CHARACTER_INFO_BY_KOR_NAME :
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : null }};
        case FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS :
        case FETCH_CHARACTER_INFO_BY_KOR_NAME_SUCCESS : 
            const { count, next, previous, results } = action.payload;
            return { ...state, characterList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_CHARACTER_LIST_BY_QUERY_FAILURE : 
        case FETCH_CHARACTER_INFO_BY_KOR_NAME_FAILURE :
            const { detail } = action.payload;
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : detail }};
        case RESET_FETCH_CHARACTER_LIST_BY_QUERY : 
        case RESET_FETCH_CHARACTER_INFO_BY_KOR_NAME :
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : null }};
        
        case FETCH_CHARACTER_INFO_BY_ID :
            return { ...state, characterInfo : { result : null, error : null }};
        case FETCH_CHARACTER_INFO_BY_ID_SUCCESS :
            return { ...state, characterInfo : { result : action.payload, error : null }};
        case FETCH_CHARACTER_INFO_BY_ID_FAILURE :
            return { ...state, characterInfo : { result : null, error : action.payload && action.payload.detail }};
        case RESET_FETCH_CHARACTER_INFO_BY_ID :
            return { ...state, characterInfo : { result : null, error : null }};

        default : 
            return state;
    }
}