import React from 'react';
import { Button, ListGroup, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ParallaxStructureView from './ParallaxStructureView';
import {
    fetchCardInfosRecently, fetchCardInfosRecentlySuccess, fetchCardInfosRecentlyFailure, resetFetchCardInfosRecently
} from '../action/action_card_info';
import RecentlyCardBriefInfo from './RecentlyCardBriefInfo';

const mapStateToProps = (state) => {
    return {
        cardList : state.card.cardList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardsRecently : () => dispatch(fetchCardInfosRecently()).then(response => {
            if(!response.error)
                dispatch(fetchCardInfosRecentlySuccess(response.payload));
        }).catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardInfosRecentlyFailure(data));
            }
        }),
        resetFetchCardsRecently : () => dispatch(resetFetchCardInfosRecently())
    }
}

class RecentlyCardListView extends React.Component {
    constructor(props){
        super(props);
        this.state = { cardResult : [], cardError : null };
    }

    componentDidMount(){
        this.props.fetchCardsRecently();
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
        this.props.resetFetchCardsRecently();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { results, error } = nextProps.cardList;
        if(
            results !== prevState.cardResult ||
            error !== prevState.cardError
        ) {
            return {
                cardResult : results.slice(0, 5),
                cardError : error
            }
        }
        return null;
    }

    handleClickCardMoreView = () => {
        this.props.history.push('/card/list?pg=1');
    }

    render(){
        const { cardResult, cardError } = this.state;
        const { handleClickLeft, handleClickRight } = this.props;
        const recentlyCards = 
            cardError === null ? 
                cardResult.map(card => <RecentlyCardBriefInfo key={card.no} info={card} />) :
                (
                    <Alert color="danger">
                        <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                        <p className="text-center">최신 카드 정보 불러오는 도중 에러가 발생 했습니다.</p>
                        <p className="text-center">내용은 다음과 같습니다.</p>
                        <hr/>
                        <p className="text-center">{cardError}</p>
                    </Alert>
                );
        return(
            <ParallaxStructureView viewId="recently_card_list_view" handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>새로운 카드</h3>
                    <hr/>
                    <ListGroup>
                        {recentlyCards}
                    </ListGroup>
                    <br/>
                    <Button block color="primary" onClick={() => this.handleClickCardMoreView()}><i className="fas fa-search-plus" /> 카드 목록 조회</Button>
                </div>
            </ParallaxStructureView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecentlyCardListView));