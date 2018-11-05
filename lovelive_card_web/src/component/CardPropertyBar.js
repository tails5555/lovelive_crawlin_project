import React, { Fragment } from 'react';
import { Progress, Alert } from 'reactstrap';

import './style/progress_bar_style.css';

class CardPropertyBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { infoResult : props.infoResult, infoError : props.infoError };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { infoResult, infoError } = nextProps;
        if(
            infoResult !== prevState.infoResult ||
            infoError !== prevState.infoError
        ) {
            return {
                infoResult : infoResult,
                infoError : infoError
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState){
        for (let stateKey in this.state) {
            if(this.state[stateKey] !== nextState[stateKey]){
                return true;
            }
        }
        for (let propsKey in this.props) {
            if(this.props[propsKey] !== nextProps[propsKey]) {
                return true;
            }
        }
        return false;
    }

    render(){
        const { infoResult, infoError } = this.state; 
        const smile = infoResult && infoResult.smile;
        const pure = infoResult && infoResult.pure;
        const cool = infoResult && infoResult.cool;
        let max = 6000;

        if(smile && pure && cool){
            max = (smile > pure) ? (smile > cool) ? smile : cool : (pure > cool) ? pure : cool;
        }

        return(
            (infoError === null) ?
                (
                    <Fragment>
                        <Progress className="smile_bar" bar value={smile} max={max}>{smile}</Progress>
                        <Progress className="pure_bar" bar value={pure} max={max}>{pure}</Progress>
                        <Progress className="cool_bar" bar value={cool} max={max}>{cool}</Progress>
                    </Fragment>
                ) :
                (
                    <Alert color="danger">
                        <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                        <p className="text-center">카드 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                        <p className="text-center">내용은 다음과 같습니다.</p>
                        <hr/>
                        <p className="text-center">{infoError}</p>
                    </Alert>
                )
        );
    }
}

export default CardPropertyBar;