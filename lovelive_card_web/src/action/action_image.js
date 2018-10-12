import axios from 'axios';

const CARD_IMAGE_URL = 'http://127.0.0.1:8000/card_images/';

export const FETCH_CARD_IMAGES_BY_INFO_NO = 'FETCH_CARD_IMAGES_BY_INFO_NO';
export const FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS = 'FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS';
export const FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE = 'FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE';
export const RESET_FETCH_CARD_IMAGES_BY_INFO_NO = 'RESET_FETCH_CARD_IMAGES_BY_INFO_NO';

export function fetchCardImagesByInfoNo(cardNo){
    const request = axios({
        url : `${CARD_IMAGE_URL}?info=${cardNo}`,
        method : 'get'
    });
    return {
        type : FETCH_CARD_IMAGES_BY_INFO_NO,
        payload : request
    }
}

export function fetchCardImagesByInfoNoSuccess(request){
    return {
        type : FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS,
        payload : request.data
    }
}

export function fetchCardImagesByInfoNoFailure(error){
    return {
        type : FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE,
        payload : error
    }
}

export function resetFetchCardImagesByInfoNo(){
    return {
        type : RESET_FETCH_CARD_IMAGES_BY_INFO_NO
    }
}