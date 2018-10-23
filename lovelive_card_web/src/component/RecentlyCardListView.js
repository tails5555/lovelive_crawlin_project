import React from 'react';
import { connect } from 'react-redux';
import ParallaxStructureView from './ParallaxStructureView';
import {
    fetchCardInfosRecently, fetchCardInfosRecentlySuccess, fetchCardInfosRecentlyFailure, resetFetchCardInfosRecently
} from '../action/action_card';
import { ListGroup } from 'reactstrap';
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
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchCardInfosRecentlyFailure(data));
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

    render(){
        const { cardResult, cardError } = this.state;
        const { handleClickLeft, handleClickRight } = this.props;
        const recentlyCards = cardResult.map(card => <RecentlyCardBriefInfo key={card.no} info={card} />);
        return(
            <ParallaxStructureView viewId="recently_card_list_view" handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>새로운 카드</h3>
                    <hr/>
                    <ListGroup>
                        {recentlyCards}
                    </ListGroup>
                </div>
            </ParallaxStructureView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyCardListView);