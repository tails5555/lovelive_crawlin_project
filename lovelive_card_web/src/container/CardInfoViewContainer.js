import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';

import { 
    fetchCardInfoByNo, fetchCardInfoByNoSuccess, fetchCardInfoByNoFailure, resetFetchCardInfoByNo 
} from '../action/action_card_info';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_card_detail';
import {
    fetchCardEffectsByInfoNo, fetchCardEffectsByInfoNoSuccess, fetchCardEffectsByInfoNoFailure, resetFetchCardEffectsByInfoNo
} from '../action/action_card_effect';
import {
    fetchMessagesByInfo, fetchMessagesByInfoSuccess, fetchMessagesByInfoFailure, resetFetchMessagesByInfo
} from '../action/action_card_message';
import {
    fetchPairsByCardNo, fetchPairsByCardNoSuccess, fetchPairsByCardNoFailure, resetFetchPairsByCardNo
} from '../action/action_card_pair';
import {
    CardImageGallery, CardPropertyBar, CardInfoDetailView, CardLevelEffects, CardVoiceMessageList, CardPairSetView, TitleRibbon
} from '../component';

import './style/background_view.css';

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
                <div id="back_button" style={{ position : 'fixed', right : '20px', bottom : '20px', zIndex : '2' }}>
                    <Button className="shadow" color="warning" size="lg" style={{ borderRadius : '10px' }} onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /></Button>
                </div>

                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '10px' }} />
                    
                    <div id="card_image_view_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="카드 사진" />
                    </div>

                    <div id="card_image_view" style={{ marginBottom : '10px' }}>
                        <CardImageGallery cardNo={cardNo} />
                    </div>

                    <div id="card_info_and_detail_title" style={{ marginTop : '20px', marginBottom : '10px' }}>
                        <TitleRibbon title="카드 상세 정보" />
                    </div>
                    
                    <div id="card_property_progress_bar" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardPropertyBar infoResult={cardInfo.result} infoError={cardInfo.error} />
                    </div>

                    <div id="card_detail_info" style={{ marginTop : '10px' }}>
                        <CardInfoDetailView infoResult={cardInfo.result} infoError={cardInfo.error} detailResult={detailElement.result.length > 0 ? detailElement.result[0] : null} detailError={detailElement.error} />
                    </div>
                    
                    <div id="card_effect_title" style={{ marginBottom : '10px' }}>
                        <TitleRibbon title="카드 효과" />
                    </div>

                    <div id="card_effect_info" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <CardLevelEffects effectResult={effectList.results} effectError={effectList.error} />
                    </div>

                    {
                        pairList.results.length > 0 ? 
                            <div id="card_pair_view">
                                <div id="card_pair_title" style={{ marginTop : '20px', marginBottom : '10px' }}>
                                    <TitleRibbon title="세트 갤러리" />
                                </div>
                                <div id="card_pair_gallery" style={{ marginTop : '10px', marginBottom : '10px' }}>
                                    <CardPairSetView pairResult={pairList.results} pairError={pairList.error} />
                                </div>
                            </div> : null
                    }

                    <div id="card_message_title" style={{ marginTop : '20px', marginBottom : '10px' }}>
                        <TitleRibbon title="카드 보이스 목록" />
                    </div>

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