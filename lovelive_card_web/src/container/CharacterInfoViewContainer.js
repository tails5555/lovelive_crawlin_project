import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import {
    fetchCharacterInfoById, fetchCharacterInfoByIdSuccess, fetchCharacterInfoByIdFailure, resetFetchCharacterInfoById
} from '../action/action_character';
import { CharacterProfileTable, CharacterGallery, CharacterGridAlbum } from '../component';

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
            <Container style={{ marginTop : '10px', marginBottom : '10px' }}>
                <div id="character_gallery" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterGallery character={ result && result.kor_name } />
                </div>
                <div id="character_profile" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterProfileTable character={ result } />
                </div>
                <div id="back_button text-center" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button color="info" size="lg" block onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /> 캐릭터 목록으로</Button>
                </div>
                <div id="character_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterGridAlbum />
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacterInfoViewContainer));