import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    fetchCardInfosByQuery, fetchCardInfosByQuerySuccess, fetchCardInfosByQueryFailure, resetFetchCardInfosByQuery
} from '../action/action_card_info';
import {
    resetFetchCardImagesByInfoNo
} from '../action/action_image';
import {
    resetFetchCardDetailByInfoNo
} from '../action/action_card_detail';

import { CardTable, CardPagination, CardSearchForm } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => {
    return {
        cardList : state.card_info.cardList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardList : (clientQS) =>  dispatch(fetchCardInfosByQuery(clientQS)).then(response => {
            if(!response.error)
                dispatch(fetchCardInfosByQuerySuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCardInfosByQueryFailure(data));
                }
            }),
        resetFetchCardList : () => dispatch(resetFetchCardInfosByQuery()),
        resetFetchImagesByCardNo : () => dispatch(resetFetchCardImagesByInfoNo()),
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo())
    }
}

class CardPageListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : '' };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        if(search !== ''){
            return {
                query : search
            };
        }
        return null;
    }

    componentDidMount(){
        const { query } = this.state;
        this.props.fetchCardList(query);
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
        this.props.resetFetchCardList();
        this.props.resetFetchImagesByCardNo();
        this.props.resetFetchDetailByCardNo();
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        const { history } = this.props;
        if(history.location.pathname === '/card/list')
            this.props.history.push(`/card/list/_page${history.location.search}`);
    }

    render(){
        const { results, count } = this.props.cardList;
        return(
            <div className="background_view" id="card_list">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="search_form_margin" style={{ height : '10px' }} />
                    <div id="card_search_form" style={{ marginBottom : '10px' }}>
                        <CardSearchForm />
                    </div>
                    <div id="card_brief_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardTable infos={results} />
                    </div>
                    <div id="card_brief_pagination" style={{ marginTop : '10px' }}>
                        <CardPagination count={count} pageBase={20} />
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CardPageListContainer));