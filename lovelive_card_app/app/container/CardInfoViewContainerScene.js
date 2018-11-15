import React from 'react';
import queryString from 'query-string';
import { Container, Header, Title, Content, Body, Button, Text, Item, Picker } from 'native-base';
import { View } from 'react-native';
import { withRouter } from 'react-router-native'; 
import { connect } from 'react-redux';

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

import { CardInfoImageView } from '../component';

const mapStateToProps = (state) => {
    return {
        cardInfo : state.card_info.cardInfo,
        detailElement : state.card_detail.detailElement,
        effectList : state.card_effect.effectList,
        messageElement : state.card_message.messageElement,
        pairList : state.card_pair.pairList
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

class CardInfoViewContainerScene extends React.Component {
    constructor(props){
        super(props);
        const { search } = props.history.location;
        const clientQueryModel = queryString.parse(search);
        this.state = { cardNo : clientQueryModel.id };
    }

    componentWillReceiveProps(nextProps, nextState){
        const { search } = nextProps.history.location;
        const clientQueryModel = queryString.parse(search);
        if(clientQueryModel && (clientQueryModel.id || 0) !== this.state.cardNo){
            this.setState({
                cardNo : clientQueryModel.id
            });
        }
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
            <Container>
                <Header>
                    <Body>
                        <Title>Card Info #{cardNo}</Title>
                    </Body>
                </Header>
                <Content>
                    <CardInfoImageView cardNo={cardNo} />
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardInfoViewContainerScene));