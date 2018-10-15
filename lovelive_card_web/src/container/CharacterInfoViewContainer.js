import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchCharacterInfoById, fetchCharacterInfoByIdSuccess, fetchCharacterInfoByIdFailure, resetFetchCharacterInfoById
} from '../action/action_character';
import { CharacterProfile, CharacterGallery, CharacterGridAlbum } from '../component';

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
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCharacterInfoByIdFailure(data));
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

    render(){
        const { result, error } = this.props.characterInfo;
        return(
            <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
                <div id="character_gallery">
                    <CharacterGallery character={ Array.isArray(result) ? null : result.kor_name } />
                </div>
                <div id="character_profile" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterProfile character={ result } />
                </div>
                <div id="character_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterGridAlbum />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacterInfoViewContainer));