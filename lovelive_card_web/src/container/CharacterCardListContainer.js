import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import {connect} from 'react-redux';
import {CharacterCardList} from '../component';
import {
    fetchCharacterListByQuery, fetchCharacterListByQuerySuccess, fetchCharacterListByQueryFailure, resetFetchCharacterListByQuery
} from '../action/action_character';
import CardPagination from '../component/CardPagination';
import CharacterSearchForm from '../component/CharacterSearchForm';

const mapStateToProps = (state) => {
    return {
        characterList : state.character.characterList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacterList : (pageNo) =>  dispatch(fetchCharacterListByQuery(pageNo)).then(response => {
            if(!response.error)
                dispatch(fetchCharacterListByQuerySuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCharacterListByQueryFailure(data));
                }
            }),
        resetFetchCharacterList : () => dispatch(resetFetchCharacterListByQuery())
    }
}

class CharacterCardListContainer extends Component {
    constructor(props){
        super(props);
        this.state = { query : '' };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        if(search !== prevState.query){
            return {
                query : search
            };
        }
        return null;
    }

    componentDidMount(){
        const { query } = this.state;
        this.props.fetchCharacterList(query);
    }

    componentWillUnmount(){
        this.props.resetFetchCharacterList();
    }

    render(){
        const { results, count } = this.props.characterList;
        return(
            <div className="container">
                <div id="character_search_form" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterSearchForm />
                </div>
                <div id="character_small_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterCardList characters={results} />
                </div>
                <div id="character_small_card_pagination" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CardPagination count={count} pageBase={9} />
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CharacterCardListContainer));