import axios from 'axios';
import queryString from 'query-string';

const CHARACTER_INFO_URL = 'http://127.0.0.1:8000/character_main_infos/';

export const FETCH_CHARACTER_LIST_BY_QUERY = 'FETCH_CHARACTER_LIST_BY_QUERY';
export const FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS = 'FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS';
export const FETCH_CHARACTER_LIST_BY_QUERY_FAILURE = 'FETCH_CHARACTER_LIST_BY_QUERY_FAILURE';
export const RESET_FETCH_CHARACTER_LIST_BY_QUERY = 'RESET_FETCH_CHARACTER_LIST_BY_QUERY';

export function fetchCharacterListByQuery(qs){
    const queryModel = queryString.parse(qs);
    const serverQuery = {
        page : queryModel && queryModel.pg,
        search : queryModel && queryModel.st,
        grade : queryModel && queryModel.gr
    };

    const serverQS = queryString.stringify(serverQuery);

    const request = axios({
        url : `${CHARACTER_INFO_URL}?${serverQS}`,
        method : 'get'
    });
    return {
        type : FETCH_CHARACTER_LIST_BY_QUERY,
        payload : request
    }
}

export function fetchCharacterListByQuerySuccess(request){
    return {
        type : FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS,
        payload : request.data
    }
}

export function fetchCharacterListByQueryFailure(error){
    return {
        type : FETCH_CHARACTER_LIST_BY_QUERY_FAILURE,
        payload : error
    }
}

export function resetFetchCharacterListByQuery(){
    return {
        type : RESET_FETCH_CHARACTER_LIST_BY_QUERY
    }
}