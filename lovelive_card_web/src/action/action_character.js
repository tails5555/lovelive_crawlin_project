import axios from 'axios';

const CHARACTER_INFO_URL = 'http://127.0.0.1:8000/character_main_infos/';

export const FETCH_CHARACTER_LIST_BY_PAGE = 'FETCH_CHARACTER_LIST_BY_PAGE';
export const FETCH_CHARACTER_LIST_BY_PAGE_SUCCESS = 'FETCH_CHARACTER_LIST_BY_PAGE_SUCCESS';
export const FETCH_CHARACTER_LIST_BY_PAGE_FAILURE = 'FETCH_CHARACTER_LIST_BY_PAGE_FAILURE';
export const RESET_FETCH_CHARACTER_LIST_BY_PAGE = 'RESET_FETCH_CHARACTER_LIST_BY_PAGE';

export function fetchCharacterListByPage(page){
    const request = axios({
        url : `${CHARACTER_INFO_URL}?page=${page}`,
        method : 'get'
    });
    return {
        type : FETCH_CHARACTER_LIST_BY_PAGE,
        payload : request
    }
}

export function fetchCharacterListByPageSuccess(request){
    return {
        type : FETCH_CHARACTER_LIST_BY_PAGE_SUCCESS,
        payload : request.data
    }
}

export function fetchCharacterListByPageFailure(error){
    return {
        type : FETCH_CHARACTER_LIST_BY_PAGE_FAILURE,
        payload : error
    }
}

export function resetFetchCharacterListByPage(){
    return {
        type : RESET_FETCH_CHARACTER_LIST_BY_PAGE
    }
}