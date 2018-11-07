import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/song_details/';

export const FETCH_SONG_DETAIL_BY_INFO_ID = 'FETCH_SONG_DETAIL_BY_INFO_ID';
export const FETCH_SONG_DETAIL_BY_INFO_ID_SUCCESS = 'FETCH_SONG_DETAIL_BY_INFO_ID_SUCCESS';
export const FETCH_SONG_DETAIL_BY_INFO_ID_FAILURE = 'FETCH_SONG_DETAIL_BY_INFO_ID_FAILURE';
export const RESET_FETCH_SONG_DETAIL_BY_INFO_ID = 'RESET_FETCH_SONG_DETAIL_BY_INFO_ID';

export function fetchSongDetailByInfoId(infoId){
    const request = axios({
        url : `${ROOT_URL}?info=${infoId}`,
        method : 'get'
    });
    return {
        type : FETCH_SONG_DETAIL_BY_INFO_ID,
        payload : request
    }
}

export function fetchSongDetailByInfoIdSuccess(request){
    return {
        type : FETCH_SONG_DETAIL_BY_INFO_ID_SUCCESS,
        payload : request.data
    }
}

export function fetchSongDetailByInfoIdFailure(error){
    return {
        type : FETCH_SONG_DETAIL_BY_INFO_ID_FAILURE,
        payload : error
    }
}

export function resetFetchSongDetailByInfoId(){
    return {
        type : RESET_FETCH_SONG_DETAIL_BY_INFO_ID
    }
}