import axios from 'axios';

const CARD_DETAIL_URL = 'http://10.0.2.2:8000/card_details/';

export const FETCH_CARD_DETAIL_BY_INFO_NO = 'FETCH_CARD_DETAIL_BY_INFO_NO';
export const FETCH_CARD_DETAIL_BY_INFO_NO_SUCCESS = 'FETCH_CARD_DETAIL_BY_INFO_NO_SUCCESS';
export const FETCH_CARD_DETAIL_BY_INFO_NO_FAILURE = 'FETCH_CARD_DETAIL_BY_INFO_NO_FAILURE';
export const RESET_FETCH_CARD_DETAIL_BY_INFO_NO = 'RESET_FETCH_CARD_DETAIL_BY_INFO_NO';

export function fetchCardDetailByInfoNo(cardNo){
    const request = axios({
        url : `${CARD_DETAIL_URL}?info=${cardNo}`,
        method : 'get'
    });
    return {
        type : FETCH_CARD_DETAIL_BY_INFO_NO,
        payload : request
    }
}

export function fetchCardDetailByInfoNoSuccess(request){
    return {
        type : FETCH_CARD_DETAIL_BY_INFO_NO_SUCCESS,
        payload : request.data
    }
}

export function fetchCardDetailByInfoNoFailure(error){
    return {
        type : FETCH_CARD_DETAIL_BY_INFO_NO_FAILURE,
        payload : error
    }
}

export function resetFetchCardDetailByInfoNo(){
    return {
        type : RESET_FETCH_CARD_DETAIL_BY_INFO_NO
    }
}