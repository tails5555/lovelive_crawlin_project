import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { 
    fetchCardInfoByNo, fetchCardInfoByNoSuccess, fetchCardInfoByNoFailure, resetFetchCardInfoByNo 
} from '../action/action_card';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';
import {
    CardImageGallery, CardPropertyBar, CardInfoDetailView
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

    handleClickPushToList(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['id'] = undefined;
        this.props.history.push(`/card/list?${queryString.stringify(clientQueryModel)}`);
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
        const { cardInfo, detailElement } = this.props;
        return(
            <Container>
                <div id="card_image_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CardImageGallery cardNo={cardNo} />
                </div>
                <div id="card_property_progress_bar" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CardPropertyBar infoResult={cardInfo.result} infoError={cardInfo.error} />
                </div>
                <div id="card_detail_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CardInfoDetailView infoResult={cardInfo.result} infoError={cardInfo.error} detailResult={detailElement.result.length > 0 ? detailElement.result[0] : null} detailError={detailElement.error} />
                </div>
                <div id="back_button text-center" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button color="info" size="lg" block onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /> 카드 목록으로</Button>
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