import axios from 'axios';
import { MAIN_ROOT_URL } from './server_url';

const CARD_EFFECT_URL = `${MAIN_ROOT_URL}/card_level_effects`;

export const FETCH_CARD_EFFECTS_BY_INFO_NO = 'FETCH_CARD_EFFECTS_BY_INFO_NO';
export const FETCH_CARD_EFFECTS_BY_INFO_NO_SUCCESS = 'FETCH_CARD_EFFECTS_BY_INFO_NO_SUCCESS';
export const FETCH_CARD_EFFECTS_BY_INFO_NO_FAILURE = 'FETCH_CARD_EFFECTS_BY_INFO_NO_FAILURE';
export const RESET_FETCH_CARD_EFFECTS_BY_INFO_NO = 'RESET_FETCH_CARD_EFFECTS_BY_INFO_NO';

export function fetchCardEffectsByInfoNo(infoNo){
    const request = axios({
        url : `${CARD_EFFECT_URL}/?info=${infoNo}`,
        method : 'get'        
    });
    return {
        type : FETCH_CARD_EFFECTS_BY_INFO_NO,
        payload : request
    }
}

export function fetchCardEffectsByInfoNoSuccess(request){
    return {
        type : FETCH_CARD_EFFECTS_BY_INFO_NO_SUCCESS,
        payload : request.data
    }
}

export function fetchCardEffectsByInfoNoFailure(error){
    return {
        type : FETCH_CARD_EFFECTS_BY_INFO_NO_FAILURE,
        payload : error
    }
}

export function resetFetchCardEffectsByInfoNo(){
    return {
        type : RESET_FETCH_CARD_EFFECTS_BY_INFO_NO
    }
}