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
    fetchCardEffectsByInfoNo, fetchCardEffectsByInfoNoSuccess, fetchCardEffectsByInfoNoFailure, resetFetchCardEffectsByInfoNo
} from '../action/action_effect';
import {
    fetchMessagesByInfo, fetchMessagesByInfoSuccess, fetchMessagesByInfoFailure, resetFetchMessagesByInfo
} from '../action/action_message';
import {
    fetchPairsByCardNo, fetchPairsByCardNoSuccess, fetchPairsByCardNoFailure, resetFetchPairsByCardNo
} from '../action/action_pair';

import {
    CardImageGallery, CardPropertyBar, CardInfoDetailView, CardLevelEffects, CardVoiceMessageList, CardPairSetView
} from '../component';

const mapStateToProps = (state) => {
    return {
        cardInfo : state.card.cardInfo,
        detailElement : state.detail.detailElement,
        effectList : state.effect.effectList,
        messageElement : state.message.messageElement,
        pairList : state.pair.pairList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardInfo : (cardNo) => dispatch(fetchCardInfoByNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardInfoByNoSuccess(response.payload));
            })
        .catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardInfoByNoFailure(data));
            }
        }),
        resetFetchCardInfo : () => dispatch(resetFetchCardInfoByNo()),
        fetchDetailByCardNo : (cardNo) => dispatch(fetchCardDetailByInfoNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardDetailByInfoNoSuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCardDetailByInfoNoFailure(data));
                }
            }),
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo()),
        fetchEffectsByCardNo : (cardNo) => dispatch(fetchCardEffectsByInfoNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardEffectsByInfoNoSuccess(response.payload));
            })
        .catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardEffectsByInfoNoFailure(data));
            }
        }),
        resetFetchEffectsByCardNo : () => dispatch(resetFetchCardEffectsByInfoNo()),
        fetchMessageJsonData : (cardNo) => dispatch(fetchMessagesByInfo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchMessagesByInfoSuccess(response.payload));
            })
        .catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchMessagesByInfoFailure(data));
            }
        }),
        resetFetchMessageJsonData : () => dispatch(resetFetchMessagesByInfo()),
        fetchPairListByCardNo : (cardNo) => dispatch(fetchPairsByCardNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchPairsByCardNoSuccess(response.payload));
            })
        .catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchPairsByCardNoFailure(data));
            }
        }),
        resetFetchPairListByCardNo : () => dispatch(resetFetchPairsByCardNo())
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
            this.props.fetchEffectsByCardNo(cardNo);
            this.props.fetchPairListByCardNo(cardNo);
            this.props.fetchMessageJsonData(cardNo);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchCardInfo();
        this.props.resetFetchDetailByCardNo();
        this.props.resetFetchEffectsByCardNo();
        this.props.resetFetchPairListByCardNo();
        this.props.resetFetchMessageJsonData();
    }

    render(){
        const { cardNo } = this.state;
        const { cardInfo, detailElement, effectList, messageElement, pairList } = this.props;
        return(
            <div className="background_view" id="card_info">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '20px' }} />
                    <div id="card_image_view" style={{ marginBottom : '10px' }}>
                        <CardImageGallery cardNo={cardNo} />
                    </div>
                    <div id="card_property_progress_bar" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardPropertyBar infoResult={cardInfo.result} infoError={cardInfo.error} />
                    </div>
                    <div id="card_detail_info" style={{ marginTop : '10px' }}>
                        <CardInfoDetailView infoResult={cardInfo.result} infoError={cardInfo.error} detailResult={detailElement.result.length > 0 ? detailElement.result[0] : null} detailError={detailElement.error} />
                    </div>
                    <div id="back_button" style={{ marginBottom : '10px' }}>
                        <Button color="info" size="lg" block onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /> 카드 목록으로</Button>
                    </div>
                    <div id="card_effect_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardLevelEffects effectResult={effectList.results} effectError={effectList.error} />
                    </div>
                    {
                        pairList.results.length > 0 ? 
                            <div id="card_pair_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                                <CardPairSetView pairResult={pairList.results} pairError={pairList.error} />
                            </div> : null
                    }
                    <div id="card_message_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardVoiceMessageList messageResult={messageElement.result} messageError={messageElement.error} />
                    </div>
                    <div id="container_bottom_margin" style={{ height : '10px' }} />
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardInfoViewContainer));