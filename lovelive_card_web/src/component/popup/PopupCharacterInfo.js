import React from 'react';
import {connect} from 'react-redux';
import { Alert } from 'reactstrap';
import {
    fetchCharacterInfoByKorName, fetchCharacterInfoByKorNameSuccess, fetchCharacterInfoByKorNameFailure, resetFetchCharacterInfoByKorName
} from '../../action/action_character';
import CharacterProfileTable from '../table/CharacterProfileTable';

import '../style/image_animate.css';
import '../style/popup_card.css';

const mapStateToProps = (state) => {
    return {
        characterList : state.character.characterList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacterByName : (korName) => dispatch(fetchCharacterInfoByKorName(korName)).then(response => {
            if(!response.error)
                dispatch(fetchCharacterInfoByKorNameSuccess(response.payload));
        }).catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCharacterInfoByKorNameFailure(data));
            }
        }),
        resetFetchCharacterByName : () => dispatch(resetFetchCharacterInfoByKorName())
    }
}

class PopupCharacterInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = { korName : props.korName, mouseX : props.mouseX, mouseY : props.mouseY, infoResult : null, infoError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { korName, mouseX, mouseY, characterList } = nextProps;
        const { results, error } = characterList;
        const tmpResult = results.length > 0 ? results[0] : null;
        if(
            korName !== prevState.korName ||
            mouseX !== prevState.mouseX ||
            mouseY !== prevState.mouseY ||
            tmpResult !== prevState.infoResult ||
            error !== prevState.infoError
        ) {
            return {
                korName : korName,
                mouseX : mouseX,
                mouseY : mouseY,
                infoResult : tmpResult,
                infoError : error
            }
        }
        return null;
    }
    
    componentDidMount(){
        const { korName } = this.state;
        if(korName !== undefined)
            this.props.fetchCharacterByName(korName);
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

    componentWillUnmount(){
        const { korName } = this.state;
        if(korName !== undefined)
            this.props.resetFetchCharacterByName();
    }

    render(){
        const { mouseX, mouseY, infoResult, infoError } = this.state;

        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;

        let oWidth = 400;
        let oHeight = 315;

        let divLeft = mouseX + 10;
        let divTop = mouseY + 5;
        
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        const popupView = 
            (infoResult) ? 
                <CharacterProfileTable character={infoResult} /> : 
                (infoError) ?
                    <Alert color="danger">
                        <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                        <h4 className="alert-heading">서버 측에서 에러가 발생했습니다.</h4>
                        <h5>에러 내용은 아래와 같습니다.</h5>
                        <hr />
                        <p className="mb-0">{ infoError }</p>
                        <hr />
                        <h5>오류 보고 기능을 통해 알려주시면 최대한 빠른 시일 내에 조치하겠습니다.</h5>
                    </Alert> : 
                    <Alert color="info">
                        <h1 className="text-center"><i className="fas fa-spinner" /></h1>
                        <h4 className="alert-heading">캐릭터 정보를 얻어오는 중입니다.</h4>
                        <hr />
                        <h5>캐릭터의 정보를 불러오는 중이니 잠시만 기다려 주시길 바랍니다.</h5>
                        <p className="mb-0">이후에도 캐릭터 정보가 안 나오는 경우엔 오류 보고 기능으로 알려주시길 바랍니다.</p>
                    </Alert>
        return(
            <div 
                className="characterPopupLayer"
                style={{
                    top : divTop,
                    left : divLeft,
                    position : 'fixed',
                    height: `${oHeight}px`
                }}
            >
                {popupView}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupCharacterInfo);