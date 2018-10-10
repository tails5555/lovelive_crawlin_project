import {connect} from 'react-redux';
import {CardTable} from '../component';
import {
    fetchCardInfosByPage, fetchCardInfosByPageSuccess, fetchCardInfosByPageFailure, resetFetchCardInfosByPage
} from '../action/action_card';

const mapStateToProps = (state) => {
    return {
        cardList : state.card.cardList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardList : (pageNo) => dispatch(fetchCardInfosByPage(pageNo)).then(response => {
            const { status } = response.payload;
            if(status === 200) {
                dispatch(fetchCardInfosByPageSuccess(response.payload));
            } else {
                dispatch(fetchCardInfosByPageFailure(response.payload));
            }
        }).catch(error => {
            console.log(error.message)
        }),
        resetFetchCardList : () => dispatch(resetFetchCardInfosByPage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardTable);