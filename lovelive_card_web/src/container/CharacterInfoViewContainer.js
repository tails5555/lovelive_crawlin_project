import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchCharacterInfoById, fetchCharacterInfoByIdSuccess, fetchCharacterInfoByIdFailure, resetFetchCharacterInfoById
} from '../action/action_character';
import { CharacterProfile } from '../component';

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
            <div className="container">
                <div id="character_profile">
                    <CharacterProfile character={ result } />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacterInfoViewContainer));