import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    fetchCardInfosByPage, fetchCardInfosByPageSuccess, fetchCardInfosByPageFailure, resetFetchCardInfosByPage
} from '../action/action_card';
import {
    resetFetchCardImagesByInfoNo
} from '../action/action_image';
import {
    resetFetchCardDetailByInfoNo
} from '../action/action_detail';

import { CardTable, CardPagination } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => {
    return {
        cardList : state.card.cardList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardList : (pageNo) =>  dispatch(fetchCardInfosByPage(pageNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardInfosByPageSuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCardInfosByPageFailure(data));
                }
            }),
        resetFetchCardList : () => dispatch(resetFetchCardInfosByPage()),
        resetFetchImagesByCardNo : () => dispatch(resetFetchCardImagesByInfoNo()),
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo())
    }
}

class CardPageListContainer extends React.Component {
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
        this.props.fetchCardList(page);
    }

    componentWillUnmount(){
        this.props.resetFetchCardList();
        this.props.resetFetchImagesByCardNo();
        this.props.resetFetchDetailByCardNo();
    }

    render(){
        const { results, count } = this.props.cardList;
        return(
            <div className="background_view" id="card_list">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="card_brief_list" style={{ marginBottom : '10px' }}>
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