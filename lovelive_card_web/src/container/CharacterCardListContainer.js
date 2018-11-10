import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    fetchCharacterListByQuery, fetchCharacterListByQuerySuccess, fetchCharacterListByQueryFailure, resetFetchCharacterListByQuery
} from '../action/action_character';

import { CardPagination, CharacterSearchForm, CharacterCardList } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => {
    return {
        characterList : state.character.characterList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacterList : (query) => dispatch(fetchCharacterListByQuery(query)).then(response => {
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

class CharacterCardListContainer extends React.Component {
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
        window.onpopstate = this.onBackButtonEvent;
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
        this.props.resetFetchCharacterList();
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        const { history } = this.props;
        if(history.location.pathname === '/character/list')
            this.props.history.push(`/character/list/_page${history.location.search}`);
    }

    render(){
        const { results, count } = this.props.characterList;
        return(
            <div className="background_view" id="character_list">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="search_form_margin" style={{ height : '10px' }} />
                    <div id="character_search_form" style={{ marginBottom : '10px' }}>
                        <CharacterSearchForm />
                    </div>
                    <div id="character_small_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CharacterCardList characters={results} />
                    </div>
                    <div id="character_small_card_pagination" style={{ marginTop : '10px' }}>
                        <CardPagination count={count} pageBase={9} />
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CharacterCardListContainer));