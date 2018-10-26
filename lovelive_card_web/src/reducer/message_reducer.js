import {
    FETCH_MESSAGES_BY_INFO, FETCH_MESSAGES_BY_INFO_SUCCESS, FETCH_MESSAGES_BY_INFO_FAILURE, RESET_FETCH_MESSAGES_BY_INFO
} from '../action/action_message';

const INITIAL_STATE = {
    messageElement : {
        result : null, error : []
    }
}

export default function(state = INITIAL_STATE, action){
    switch(action.type) {
        case FETCH_MESSAGES_BY_INFO :
            return { ...state, messageElement : { result : null, error : [] }};
        case FETCH_MESSAGES_BY_INFO_SUCCESS :
            return { ...state, messageElement : { result : action.payload, error : [] }};
        case FETCH_MESSAGES_BY_INFO_FAILURE :
            const { info } = action.payload;
            return { ...state, messageElement : { result : null, error : info }};
        case RESET_FETCH_MESSAGES_BY_INFO :
            return { ...state, messageElement : { result : null, error : [] }};

        default :
            return state;
    }
}