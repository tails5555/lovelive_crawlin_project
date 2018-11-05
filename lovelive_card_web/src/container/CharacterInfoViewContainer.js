import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button, Alert } from 'reactstrap';

import {
    fetchCharacterInfoById, fetchCharacterInfoByIdSuccess, fetchCharacterInfoByIdFailure, resetFetchCharacterInfoById
} from '../action/action_character';

import { CharacterProfileTable, CharacterGallery, CharacterGridAlbum, TitleRibbon } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => {
    return {
        characterInfo : state.character.characterInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacterInfo : (id) =>  dispatch(fetchCharacterInfoById(id)).then(response => {
            if(!response.error)
                dispatch(fetchCharacterInfoByIdSuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCharacterInfoByIdFailure(data));
                }
            }),
        resetFetchCharacterInfo : () => dispatch(resetFetchCharacterInfoById())
    }
}

class CharacterInfoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { id : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        const clientQueryModel = queryString.parse(search);
        if(clientQueryModel.id && clientQueryModel.id !== prevState.id){
            return {
                id : clientQueryModel.id
            };
        }
        return null;
    }

    componentDidMount(){
        const { id } = this.state;
        this.props.fetchCharacterInfo(id);
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
        this.props.resetFetchCharacterInfo();
    }

    handleClickPushToList(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['id'] = undefined;
        this.props.history.push(`/character/list?${queryString.stringify(clientQueryModel)}`);
    }

    render(){
        const { result, error } = this.props.characterInfo;
        
        return(
            <div className="background_view" id="character_info">
                <div id="back_button" style={{ position : 'fixed', right : '20px', bottom : '20px', zIndex : '2' }}>
                    <Button className="shadow" color="warning" size="lg" style={{ borderRadius : '10px' }} onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /></Button>
                </div>

                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '10px' }} />

                    <div id="character_gallery_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="슬라이딩 갤러리" />
                    </div>
                    
                    <div id="character_gallery" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    {
                        error === null ? 
                            <CharacterGallery character={ result && result.kor_name } /> :
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">캐릭터 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{error}</p>
                            </Alert>
                    }
                    </div>
                    
                    <div id="character_profile_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="캐릭터 정보" />
                    </div>
                    
                    {
                        error === null ?
                        (
                            <div id="character_profile" style={{ marginTop : '10px', marginBottom : '10px' }}>
                                <CharacterProfileTable character={ result } />
                            </div>
                        ) : 
                        (
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">캐릭터 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{error}</p>
                            </Alert>
                        )
                    }
                    <div id="character_card_list_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="캐릭터 사진 모음" />
                    </div>

                    <div id="character_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    {
                        error === null ?
                            <CharacterGridAlbum />
                            :
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">캐릭터 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{error}</p>
                            </Alert>
                    }
                    </div>

                    <div id="container_bottom_margin" style={{ height : '10px' }} />
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacterInfoViewContainer));