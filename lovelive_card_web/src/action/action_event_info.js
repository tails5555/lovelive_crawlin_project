import axios from 'axios';
import queryString from 'query-string';

const EVENT_INFO_URL = 'http://127.0.0.1:8000/event_infos/';

export const FETCH_EVENT_INFOS_BY_QUERY = 'FETCH_EVENT_INFOS_BY_QUERY';
export const FETCH_EVENT_INFOS_BY_QUERY_SUCCESS = 'FETCH_EVENT_INFOS_BY_QUERY_SUCCESS';
export const FETCH_EVENT_INFOS_BY_QUERY_FAILURE = 'FETCH_EVENT_INFOS_BY_QUERY_FAILURE';
export const RESET_FETCH_EVENT_INFOS_BY_QUERY = 'RESET_FETCH_EVENT_INFOS_BY_QUERY';

export const FETCH_EVENT_INFO_BY_ID = 'FETCH_EVENT_INFO_BY_ID';
export const FETCH_EVENT_INFO_BY_ID_SUCCESS = 'FETCH_EVENT_INFO_BY_ID_SUCCESS';
export const FETCH_EVENT_INFO_BY_ID_FAILURE = 'FETCH_EVENT_INFO_BY_ID_FAILURE';
export const RESET_FETCH_EVENT_INFO_BY_ID = 'RESET_FETCH_EVENT_INFO_BY_ID';

export function fetchEventInfosByQuery(qs){
    const queryModel = queryString.parse(qs);
    const serverQuery = {
        page : queryModel && queryModel.pg,
        search : queryModel && queryModel.st
    };

    const serverQS = queryString.stringify(serverQuery);
    const request = axios({
        url : `${EVENT_INFO_URL}?${serverQS}`,
        method : 'get'
    });

    return {
        type : FETCH_EVENT_INFOS_BY_QUERY,
        payload : request
    }
}

export function fetchEventInfosByQuerySuccess(request){
    return {
        type : FETCH_EVENT_INFOS_BY_QUERY_SUCCESS,
        payload : request.data
    }
}

export function fetchEventInfosByQueryFailure(error){
    return {
        type : FETCH_EVENT_INFOS_BY_QUERY_FAILURE,
        payload : error
    }
}

export function resetFetchEventInfosByQuery(){
    return {
        type : RESET_FETCH_EVENT_INFOS_BY_QUERY
    }
}

export function fetchEventInfoById(id){
    const request = axios({
        url : `${EVENT_INFO_URL}${id}`,
        method : 'get'
    });
    return {
        type : FETCH_EVENT_INFO_BY_ID,
        payload : request
    }
}

export function fetchEventInfoByIdSuccess(request){
    return {
        type : FETCH_EVENT_INFO_BY_ID_SUCCESS,
        payload : request.data
    }
}

export function fetchEventInfoByIdFailure(error){
    return {
        type : FETCH_EVENT_INFO_BY_ID_FAILURE,
        payload : error
    }
}

export function resetFetchEventInfoById(){
    return {
        type : RESET_FETCH_EVENT_INFO_BY_ID
    }
}
