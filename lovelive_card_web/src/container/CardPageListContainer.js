import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import queryString from 'query-string';
import {connect} from 'react-redux';
import {CardTable} from '../component';
import {
    fetchCardInfosByPage, fetchCardInfosByPageSuccess, fetchCardInfosByPageFailure, resetFetchCardInfosByPage
} from '../action/action_card';
import CardPagination from '../component/CardPagination';

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
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchCardInfosByPageFailure(data));
        }),
        resetFetchCardList : () => dispatch(resetFetchCardInfosByPage())
    }
}

class CardPageListContainer extends Component {
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
    }

    render(){
        const { results, count } = this.props.cardList;
        return(
            <div className="container">
                <div id="card_brief_list">
                    <CardTable infos={results} />
                </div>
                <div id="card_brief_pagination">
                    <CardPagination count={count} />
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(CardPageListContainer));