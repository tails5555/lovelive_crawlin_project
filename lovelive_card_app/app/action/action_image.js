import axios from 'axios';

const CARD_IMAGE_URL = 'http://10.0.2.2:8000/card_images/';
const SONG_IMAGE_URL = 'http://10.0.2.2:8000/song_cover_images/';

export const FETCH_CARD_IMAGES_BY_INFO_NO = 'FETCH_CARD_IMAGES_BY_INFO_NO';
export const FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS = 'FETCH_CARD_IMAGES_BY_INFO_NO_SUCCESS';
export const FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE = 'FETCH_CARD_IMAGES_BY_INFO_NO_FAILURE';
export const RESET_FETCH_CARD_IMAGES_BY_INFO_NO = 'RESET_FETCH_CARD_IMAGES_BY_INFO_NO';

export const FETCH_CARD_IMAGES_BY_CHARACTER = 'FETCH_CARD_IMAGES_BY_CHARACTER';
export const FETCH_CARD_IMAGES_BY_CHARACTER_SUCCESS = 'FETCH_CARD_IMAGES_BY_CHARACTER_SUCCESS';
export const FETCH_CARD_IMAGES_BY_CHARACTER_FAILURE = 'FETCH_CARD_IMAGES_BY_CHARACTER_FAILURE';
export const RESET_FETCH_CARD_IMAGES_BY_CHARACTER = 'RESET_FETCH_CARD_IMAGES_BY_CHARACTER';

export const FETCH_SONG_IMAGE_BY_ID = 'FETCH_SONG_IMAGE_BY_ID';
export const FETCH_SONG_IMAGE_BY_ID_SUCCESS = 'FETCH_SONG_IMAGE_BY_ID_SUCCESS';
export const FETCH_SONG_IMAGE_BY_ID_FAILURE = 'FETCH_SONG_IMAGE_BY_ID_FAILURE';
export const RESET_FETCH_SONG_IMAGE_BY_ID = 'RESET_FETCH_SONG_IMAGE_BY_ID';

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

export function fetchCardImagesByCharacter(characterName){
    const request = axios({
        url : `${CARD_IMAGE_URL}character_name?character=${characterName}`,
        method : 'get'
    });
    return {
        type : FETCH_CARD_IMAGES_BY_CHARACTER,
        payload : request
    }
}

export function fetchCardImagesByCharacterSuccess(request){
    return {
        type : FETCH_CARD_IMAGES_BY_CHARACTER_SUCCESS,
        payload : request.data
    }
}

export function fetchCardImagesByCharacterFailure(error){
    return {
        type : FETCH_CARD_IMAGES_BY_CHARACTER_FAILURE,
        payload : error
    }
}

export function resetFetchCardImagesByCharacter(){
    return {
        type : RESET_FETCH_CARD_IMAGES_BY_CHARACTER
    }
}

export function fetchSongImageBySongId(songId){
    const request = axios({
        url : `${SONG_IMAGE_URL}?info=${songId}`,
        method : 'get'
    });

    return {
        type : FETCH_SONG_IMAGE_BY_ID,
        payload : request
    }
}

export function fetchSongImageBySongIdSuccess(request){
    return {
        type : FETCH_SONG_IMAGE_BY_ID_SUCCESS,
        payload : request.data
    }
}

export function fetchSongImageBySongIdFailure(error){
    return {
        type : FETCH_SONG_IMAGE_BY_ID_FAILURE,
        payload : error
    }
}

export function resetFetchSongImageBySongId(){
    return {
        type : RESET_FETCH_SONG_IMAGE_BY_ID
    }
}