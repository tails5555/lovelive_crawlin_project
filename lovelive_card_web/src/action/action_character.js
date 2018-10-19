import axios from 'axios';
import queryString from 'query-string';

const CHARACTER_INFO_URL = 'http://127.0.0.1:8000/character_main_infos';

export const FETCH_CHARACTER_LIST_BY_QUERY = 'FETCH_CHARACTER_LIST_BY_QUERY';
export const FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS = 'FETCH_CHARACTER_LIST_BY_QUERY_SUCCESS';
export const FETCH_CHARACTER_LIST_BY_QUERY_FAILURE = 'FETCH_CHARACTER_LIST_BY_QUERY_FAILURE';
export const RESET_FETCH_CHARACTER_LIST_BY_QUERY = 'RESET_FETCH_CHARACTER_LIST_BY_QUERY';

export const FETCH_CHARACTER_INFO_BY_ID = 'FETCH_CHARACTER_INFO_BY_ID';
export const FETCH_CHARACTER_INFO_BY_ID_SUCCESS = 'FETCH_CHARACTER_INFO_BY_ID_SUCCESS';
export const FETCH_CHARACTER_INFO_BY_ID_FAILURE = 'FETCH_CHARACTER_INFO_BY_ID_FAILURE';
export const RESET_FETCH_CHARACTER_INFO_BY_ID = 'RESET_FETCH_CHARACTER_INFO_BY_ID';

export const FETCH_CHARACTER_INFO_BY_KOR_NAME = 'FETCH_CHARACTER_INFO_BY_KOR_NAME';
export const FETCH_CHARACTER_INFO_BY_KOR_NAME_SUCCESS = 'FETCH_CHARACTER_INFO_BY_KOR_NAME_SUCCESS';
export const FETCH_CHARACTER_INFO_BY_KOR_NAME_FAILURE = 'FETCH_CHARACTER_INFO_BY_KOR_NAME_FAILURE';
export const RESET_FETCH_CHARACTER_INFO_BY_KOR_NAME = 'RESET_FETCH_CHARACTER_INFO_BY_KOR_NAME';

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

export function fetchCharacterInfoById(id){
    const request = axios({
        url : `${CHARACTER_INFO_URL}/${id}`,
        method : 'get'
    });
    return {
        type : FETCH_CHARACTER_INFO_BY_ID,
        payload : request
    }
}

export function fetchCharacterInfoByIdSuccess(request){
    return {
        type : FETCH_CHARACTER_INFO_BY_ID_SUCCESS,
        payload : request.data
    }
}

export function fetchCharacterInfoByIdFailure(error){
    return {
        type : FETCH_CHARACTER_INFO_BY_ID_FAILURE,
        payload : error
    }
}

export function resetFetchCharacterInfoById(){
    return {
        type : RESET_FETCH_CHARACTER_INFO_BY_ID
    }
}

export function fetchCharacterInfoByKorName(korName){
    const request = axios({
        url : `${CHARACTER_INFO_URL}?kor_name=${korName}`,
        method : 'get'
    });
    return {
        type : FETCH_CHARACTER_INFO_BY_KOR_NAME,
        payload : request
    }
}

export function fetchCharacterInfoByKorNameSuccess(request){
    return {
        type : FETCH_CHARACTER_INFO_BY_KOR_NAME_SUCCESS,
        payload : request.data
    }
}

export function fetchCharacterInfoByKorNameFailure(error){
    return {
        type : FETCH_CHARACTER_INFO_BY_KOR_NAME_FAILURE,
        payload : error
    }
}

export function resetFetchCharacterInfoByKorName(){
    return {
        type : RESET_FETCH_CHARACTER_INFO_BY_KOR_NAME
    }
}