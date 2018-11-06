import axios from 'axios';
import queryString from 'query-string';

const SONG_INFO_URL = 'http://127.0.0.1:8000/song_infos/';

export const FETCH_SONG_INFOS_BY_QUERY = 'FETCH_SONG_INFOS_BY_QUERY';
export const FETCH_SONG_INFOS_BY_QUERY_SUCCESS = 'FETCH_SONG_INFOS_BY_QUERY_SUCCESS';
export const FETCH_SONG_INFOS_BY_QUERY_FAILURE = 'FETCH_SONG_INFOS_BY_QUERY_FAILURE';
export const RESET_FETCH_SONG_INFOS_BY_QUERY = 'RESET_FETCH_SONG_INFOS_BY_QUERY';

export function fetchSongInfosByQuery(qs){
    const queryModel = queryString.parse(qs);
    const serverQuery = {
        page : queryModel && queryModel.pg,
        search : queryModel && queryModel.st,
        type : queryModel && queryModel.type,
        property : queryModel && queryModel.property,
        ordering : queryModel && (queryModel.ordering || '-id')  
    };

    const serverQS = queryString.stringify(serverQuery);
    const request = axios({
        url : `${SONG_INFO_URL}?${serverQS}`,
        method : 'get'
    });

    return {
        type : FETCH_SONG_INFOS_BY_QUERY,
        payload : request
    }
}

export function fetchSongInfosByQuerySuccess(request){
    return {
        type : FETCH_SONG_INFOS_BY_QUERY_SUCCESS,
        payload : request.data
    }
}

export function fetchSongInfosByQueryFailure(error){
    return {
        type : FETCH_SONG_INFOS_BY_QUERY_FAILURE,
        payload : error
    }
}

export function resetFetchSongInfosByQuery(){
    return {
        type : RESET_FETCH_SONG_INFOS_BY_QUERY
    }
}