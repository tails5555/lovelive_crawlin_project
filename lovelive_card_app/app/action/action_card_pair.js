import axios from 'axios';
import { MAIN_ROOT_URL } from './server_url';

const ROOT_URL = `${MAIN_ROOT_URL}/card_pairs`;

export const FETCH_PAIRS_BY_CARD_NO = 'FETCH_PAIRS_BY_CARD_NO';
export const FETCH_PAIRS_BY_CARD_NO_SUCCESS = 'FETCH_PAIRS_BY_CARD_NO_SUCCESS';
export const FETCH_PAIRS_BY_CARD_NO_FAILURE = 'FETCH_PAIRS_BY_CARD_NO_FAILURE';
export const RESET_FETCH_PAIRS_BY_CARD_NO = 'RESET_FETCH_PAIRS_BY_CARD_NO';

export function fetchPairsByCardNo(cardNo){
    const request = axios({
        url : `${ROOT_URL}?info=${cardNo}`,
        method : 'get'
    });
    
    return {
        type : FETCH_PAIRS_BY_CARD_NO,
        payload : request
    }
}

export function fetchPairsByCardNoSuccess(request){
    return {
        type : FETCH_PAIRS_BY_CARD_NO_SUCCESS,
        payload : request.data
    }
}

export function fetchPairsByCardNoFailure(error){
    return {
        type : FETCH_PAIRS_BY_CARD_NO_FAILURE,
        payload : error
    }
}

export function resetFetchPairsByCardNo(){
    return {
        type : RESET_FETCH_PAIRS_BY_CARD_NO
    }
}