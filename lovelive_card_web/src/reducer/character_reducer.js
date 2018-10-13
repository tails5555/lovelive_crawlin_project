import {
    FETCH_CHARACTER_LIST_BY_QUERY, FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS, FETCH_CHARACTER_LIST_BY_QUERY_FAILURE, RESET_FETCH_CHARACTER_LIST_BY_QUERY
} from '../action/action_character';

const INITIAL_STATE = {
    characterList : {
        count : 0, next : null, previous : null, results : [], error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_CHARACTER_LIST_BY_QUERY :
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : null }};
        case FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS : 
            const { count, next, previous, results } = action.payload;
            return { ...state, characterList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_CHARACTER_LIST_BY_QUERY_FAILURE : 
            const { detail } = action.payload;
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : detail }};
        case RESET_FETCH_CHARACTER_LIST_BY_QUERY : 
            return { ...state, characterList : { count : 0, next : null, previous : null, results : [], error : null }};

        default : 
            return state;
    }
}