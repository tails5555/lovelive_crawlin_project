import React from 'react';
import { CardMessageAnalysis } from '../util';
class CardVoiceMessageList extends React.Component {
    constructor(props){
        super(props);
        this.state = { messageResult : props.messageResult, messageError : props.messageError, messageData : [] };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { messageResult, messageError } = nextProps;
        if(
            messageResult !== prevState.messageResult ||
            messageError !== prevState.messageError
        ) {
            return {
                messageResult : messageResult,
                messageError : messageError
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        const { messageResult } = prevState;
        const tmpMessageResult = this.state.messageResult;
        if(messageResult !== this.state.messageResult){
            if(Array.isArray(tmpMessageResult))
                this.setState({
                    messageData : CardMessageAnalysis(tmpMessageResult.length > 0 ? tmpMessageResult[0] : null)
                });
        }
    }

    render(){
        const { messageData, messageError } = this.state;
        console.log(messageData)
        return(
            <div>
                
            </div>
        )
    }
}
export default CardVoiceMessageList;