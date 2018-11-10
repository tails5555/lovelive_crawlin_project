import {
    FETCH_EVENT_INFOS_BY_QUERY, FETCH_EVENT_INFOS_BY_QUERY_SUCCESS, FETCH_EVENT_INFOS_BY_QUERY_FAILURE, RESET_FETCH_EVENT_INFOS_BY_QUERY,
    FETCH_EVENT_INFO_BY_ID, FETCH_EVENT_INFO_BY_ID_SUCCESS, FETCH_EVENT_INFO_BY_ID_FAILURE, RESET_FETCH_EVENT_INFO_BY_ID
} from '../action/action_event_info';

const INITIAL_STATE = {
    eventList : {
        count : 0, next : null, previous : null, results : [], error : null
    },
    eventInfo : {
        result : null, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_EVENT_INFOS_BY_QUERY :
            return { ...state, eventList : { count : 0, next : null, previous : null, results : [], error : null }};
        case FETCH_EVENT_INFOS_BY_QUERY_SUCCESS : 
            const { count, next, previous, results } = action.payload;
            return { ...state, eventList : { count : count, next : next, previous : previous, results : results, error : null }};
        case FETCH_EVENT_INFOS_BY_QUERY_FAILURE : 
            const { detail } = action.payload;
            return { ...state, eventList : { count : 0, next : null, previous : null, results : [], error : detail }};
        case RESET_FETCH_EVENT_INFOS_BY_QUERY : 
            return { ...state, eventList : { count : 0, next : null, previous : null, results : [], error : null }};
        
        case FETCH_EVENT_INFO_BY_ID :
            return { ...state, eventInfo : { result : null, error : null }};
        case FETCH_EVENT_INFO_BY_ID_SUCCESS :
            return { ...state, eventInfo : { result : action.payload, error : null }};
        case FETCH_EVENT_INFO_BY_ID_FAILURE :
            return { ...state, eventInfo : { result : null, error : action.payload && action.payload.detail }};
        case RESET_FETCH_EVENT_INFO_BY_ID :
            return { ...state, eventInfo : { result : null, error : null }};

        default : 
            return state;
    }
}