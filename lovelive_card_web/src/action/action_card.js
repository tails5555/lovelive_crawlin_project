import axios from 'axios';

const CARD_INFO_URL = 'http://127.0.0.1:8000/card_infos/';

export const FETCH_CARD_INFOS_BY_PAGE = 'FETCH_CARD_INFOS_BY_PAGE';
export const FETCH_CARD_INFOS_BY_PAGE_SUCCESS = 'FETCH_CARD_INFOS_BY_PAGE_SUCCESS';
export const FETCH_CARD_INFOS_BY_PAGE_FAILURE = 'FETCH_CARD_INFOS_BY_PAGE_FAILURE';
export const RESET_FETCH_CARD_INFOS_BY_PAGE = 'RESET_FETCH_CARD_INFOS_BY_PAGE';

export function fetchCardInfosByPage(pageNo) {
    const request = axios({
        url : `${CARD_INFO_URL}?page=${pageNo}`,
        method : 'get'
    });
    
    return {
        type : FETCH_CARD_INFOS_BY_PAGE,
        payload : request
    }
}

export function fetchCardInfosByPageSuccess(request){
    return {
        type : FETCH_CARD_INFOS_BY_PAGE_SUCCESS,
        payload : request.data
    }
}

export function fetchCardInfosByPageFailure(error){
    return {
        type : FETCH_CARD_INFOS_BY_PAGE_FAILURE,
        payload : error
    }
}

export function resetFetchCardInfosByPage(){
    return {
        type : RESET_FETCH_CARD_INFOS_BY_PAGE
    }
}