import axios from 'axios';

const CARD_MESSAGE_URL = 'http://127.0.0.1:8000/card_messages';

export const FETCH_MESSAGES_BY_INFO = 'FETCH_MESSAGES_BY_INFO';
export const FETCH_MESSAGES_BY_INFO_SUCCESS = 'FETCH_MESSAGES_BY_INFO_SUCCESS';
export const FETCH_MESSAGES_BY_INFO_FAILURE = 'FETCH_MESSAGES_BY_INFO_FAILURE';
export const RESET_FETCH_MESSAGES_BY_INFO = 'RESET_FETCH_MESSAGES_BY_INFO';

export function fetchMessagesByInfo(infoNo) {
    const request = axios({
        url : `${CARD_MESSAGE_URL}?info=${infoNo}`,
        method : 'get'
    });
    
    return {
        type : FETCH_MESSAGES_BY_INFO,
        payload : request
    }
}

export function fetchMessagesByInfoSuccess(request){
    return {
        type : FETCH_MESSAGES_BY_INFO_SUCCESS,
        payload : request.data
    }
}

export function fetchMessagesByInfoFailure(error){
    return {
        type : FETCH_MESSAGES_BY_INFO_FAILURE,
        payload : error
    }
}

export function resetFetchMessagesByInfo(){
    return {
        type : RESET_FETCH_MESSAGES_BY_INFO
    }
}