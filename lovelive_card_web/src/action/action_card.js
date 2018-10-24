import axios from 'axios';

const CARD_INFO_URL = 'http://127.0.0.1:8000/card_infos';

export const FETCH_CARD_INFOS_BY_PAGE = 'FETCH_CARD_INFOS_BY_PAGE';
export const FETCH_CARD_INFOS_BY_PAGE_SUCCESS = 'FETCH_CARD_INFOS_BY_PAGE_SUCCESS';
export const FETCH_CARD_INFOS_BY_PAGE_FAILURE = 'FETCH_CARD_INFOS_BY_PAGE_FAILURE';
export const RESET_FETCH_CARD_INFOS_BY_PAGE = 'RESET_FETCH_CARD_INFOS_BY_PAGE';

export const FETCH_CARD_INFOS_RECENTLY = 'FETCH_CARD_INFOS_RECENTLY';
export const FETCH_CARD_INFOS_RECENTLY_SUCCESS = 'FETCH_CARD_INFOS_RECENTLY_SUCCESS';
export const FETCH_CARD_INFOS_RECENTLY_FAILURE = 'FETCH_CARD_INFOS_RECENTLY_FAILURE';
export const RESET_FETCH_CARD_INFOS_RECENTLY = 'RESET_FETCH_CARD_INFOS_RECENTLY';

export const FETCH_CARD_INFO_BY_NO = 'FETCH_CARD_INFO_BY_NO';
export const FETCH_CARD_INFO_BY_NO_SUCCESS = 'FETCH_CARD_INFO_BY_NO_SUCCESS';
export const FETCH_CARD_INFO_BY_NO_FAILURE = 'FETCH_CARD_INFO_BY_NO_FAILURE';
export const RESET_FETCH_CARD_INFO_BY_NO = 'RESET_FETCH_CARD_INFO_BY_NO';

export function fetchCardInfosByPage(pageNo) {
    const request = axios({
        url : `${CARD_INFO_URL}?ordering=-no&page=${pageNo}`,
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

export function fetchCardInfosRecently(){
    const request = axios({
        url : `${CARD_INFO_URL}?ordering=-no&page=1`,
        method : 'get'
    });
    
    return {
        type : FETCH_CARD_INFOS_RECENTLY,
        payload : request
    }
}

export function fetchCardInfosRecentlySuccess(request){
    return {
        type : FETCH_CARD_INFOS_RECENTLY_SUCCESS,
        payload : request.data
    }
}

export function fetchCardInfosRecentlyFailure(error){
    return {
        type : FETCH_CARD_INFOS_RECENTLY_FAILURE,
        payload : error
    }
}

export function resetFetchCardInfosRecently(){
    return {
        type : RESET_FETCH_CARD_INFOS_RECENTLY
    }
}

export function fetchCardInfoByNo(cardNo){
    const request = axios({
        url : `${CARD_INFO_URL}/${cardNo}`,
        method : 'get'
    });
    
    return {
        type : FETCH_CARD_INFO_BY_NO,
        payload : request
    }
}

export function fetchCardInfoByNoSuccess(request){
    return {
        type : FETCH_CARD_INFO_BY_NO_SUCCESS,
        payload : request.data
    }
}

export function fetchCardInfoByNoFailure(error){
    return {
        type : FETCH_CARD_INFO_BY_NO_FAILURE,
        payload : error
    }
}

export function resetFetchCardInfoByNo(){
    return {
        type : RESET_FETCH_CARD_INFO_BY_NO
    }
}