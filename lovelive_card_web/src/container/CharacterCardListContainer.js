import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import queryString from 'query-string';
import {connect} from 'react-redux';
import {CharacterCardList} from '../component';
import {
    fetchCharacterListByPage, fetchCharacterListByPageSuccess, fetchCharacterListByPageFailure, resetFetchCharacterListByPage
} from '../action/action_character';
import CardPagination from '../component/CardPagination';

const mapStateToProps = (state) => {
    return {
        characterList : state.character.characterList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacterList : (pageNo) =>  dispatch(fetchCharacterListByPage(pageNo)).then(response => {
            if(!response.error)
                dispatch(fetchCharacterListByPageSuccess(response.payload));
            }).catch(error => {
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCharacterListByPageFailure(data));
            }),
        resetFetchCharacterList : () => dispatch(resetFetchCharacterListByPage())
    }
}

class CharacterCardListContainer extends Component {
    constructor(props){
        super(props);
        this.state = { page : 1 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        const query = queryString.parse(search);
        if(query && (query.pg || 1) !== prevState.page){
            return {
                page : query.pg
            };
        }
        return null;
    }

    componentDidMount(){
        const { page } = this.state;
        this.props.fetchCharacterList(page);
    }

    componentWillUnmount(){
        this.props.resetFetchCharacterList();
    }

    render(){
        const { results, count } = this.props.characterList;
        return(
            <div className="container">
                <div id="character_small_card_list">
                    <CharacterCardList characters={results} />
                </div>
                <div id="character_small_card_pagination">
                    <CardPagination count={count} pageBase={9} />
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CharacterCardListContainer));