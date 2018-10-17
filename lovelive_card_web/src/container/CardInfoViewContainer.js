import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { 
    fetchCardInfoByNo, fetchCardInfoByNoSuccess, fetchCardInfoByNoFailure, resetFetchCardInfoByNo 
} from '../action/action_card';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';
import {
    CardImageGallery
} from '../component';

const mapStateToProps = (state) => {
    return {
        cardInfo : state.card.cardInfo,
        detailElement : state.detail.detailElement
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardInfo : (cardNo) => dispatch(fetchCardInfoByNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardInfoByNoSuccess(response.payload));
            })
        .catch(error => {
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchCardInfoByNoFailure(data));
        }),
        resetFetchCardInfo : () => dispatch(resetFetchCardInfoByNo()),
        fetchDetailByCardNo : (cardNo) => dispatch(fetchCardDetailByInfoNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardDetailByInfoNoSuccess(response.payload));
            }).catch(error => {
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardDetailByInfoNoFailure(data));
            }),
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo())
    }
}

class CardInfoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { cardNo : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { search } = nextProps.history.location;
        const clientQueryModel = queryString.parse(search);
        if(clientQueryModel && (clientQueryModel.id || 0) !== prevState.cardNo){
            return {
                cardNo : clientQueryModel.id
            };
        }
        return null;
    }

    componentDidMount(){
        const { cardNo } = this.state;
        if(cardNo !== 0){
            this.props.fetchCardInfo(cardNo);
            this.props.fetchDetailByCardNo(cardNo);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchCardInfo();
        this.props.resetFetchDetailByCardNo();
    }

    render(){
        const { cardNo } = this.state;
        return(
            <Container>
                <div id="card_image_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CardImageGallery cardNo={cardNo} />
                </div>
                <div id="card_detail_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    카드 세부 정보 출력
                </div>
                <div id="card_effect_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    카드 효과 정보 출력
                </div>
                <div id="card_message_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    카드 메시지 정보 출력
                </div>
                <div id="card_pair_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    카드 세트 정보 출력
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardInfoViewContainer));