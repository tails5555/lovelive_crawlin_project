import axios from 'axios';
import queryString from 'query-string';
import { MAIN_ROOT_URL } from './server_url';

const CARD_INFO_URL = `${MAIN_ROOT_URL}/card_infos`;

export const FETCH_CARD_INFOS_BY_QUERY = 'FETCH_CARD_INFOS_BY_QUERY';
export const FETCH_CARD_INFOS_BY_QUERY_SUCCESS = 'FETCH_CARD_INFOS_BY_QUERY_SUCCESS';
export const FETCH_CARD_INFOS_BY_QUERY_FAILURE = 'FETCH_CARD_INFOS_BY_QUERY_FAILURE';
export const RESET_FETCH_CARD_INFOS_BY_QUERY = 'RESET_FETCH_CARD_INFOS_BY_QUERY';

export const FETCH_CARD_INFOS_RECENTLY = 'FETCH_CARD_INFOS_RECENTLY';
export const FETCH_CARD_INFOS_RECENTLY_SUCCESS = 'FETCH_CARD_INFOS_RECENTLY_SUCCESS';
export const FETCH_CARD_INFOS_RECENTLY_FAILURE = 'FETCH_CARD_INFOS_RECENTLY_FAILURE';
export const RESET_FETCH_CARD_INFOS_RECENTLY = 'RESET_FETCH_CARD_INFOS_RECENTLY';

export const FETCH_CARD_INFO_BY_NO = 'FETCH_CARD_INFO_BY_NO';
export const FETCH_CARD_INFO_BY_NO_SUCCESS = 'FETCH_CARD_INFO_BY_NO_SUCCESS';
export const FETCH_CARD_INFO_BY_NO_FAILURE = 'FETCH_CARD_INFO_BY_NO_FAILURE';
export const RESET_FETCH_CARD_INFO_BY_NO = 'RESET_FETCH_CARD_INFO_BY_NO';

export function fetchCardInfosByQuery(qs) {
    const queryModel = queryString.parse(qs);
    const serverQuery = {
        page : queryModel && queryModel.pg,
        search : queryModel && queryModel.st,
        property : queryModel && queryModel.property,
        rank : queryModel && queryModel.rank,
        condition : queryModel && queryModel.condition,
        skill : queryModel && queryModel.skill,
        ordering : queryModel && (queryModel.ordering || '-no') 
    };
    const serverQS = queryString.stringify(serverQuery);
    const request = axios({
        url : `${CARD_INFO_URL}?${serverQS}`,
        method : 'get'
    });
    
    return {
        type : FETCH_CARD_INFOS_BY_QUERY,
        payload : request
    }
}

export function fetchCardInfosByQuerySuccess(request){
    return {
        type : FETCH_CARD_INFOS_BY_QUERY_SUCCESS,
        payload : request.data
    }
}

export function fetchCardInfosByQueryFailure(error){
    return {
        type : FETCH_CARD_INFOS_BY_QUERY_FAILURE,
        payload : error
    }
}

export function resetFetchCardInfosByQuery(){
    return {
        type : RESET_FETCH_CARD_INFOS_BY_QUERY
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