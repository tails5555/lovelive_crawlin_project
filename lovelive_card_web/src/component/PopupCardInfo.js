import React from 'react';
import {connect} from 'react-redux';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';
import './popup_card.css';
import axios from 'axios';

function mapStateToProps(state){
    return {
        detailElement : state.detail.detailElement
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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

class PopupCardInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = { cardNo : props.no, mouseX : props.mouseX, mouseY : props.mouseY, detailResult : null, detailError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { no, mouseX, mouseY, detailElement } = nextProps;
        const { result, error } = detailElement;
        if(no !== prevState.cardNo || mouseX !== prevState.mouseX || mouseY !== prevState.mouseY || (result.length > 0 ? result[0] : null) !== prevState.detailResult || error !== prevState.detailError){
            return {
                cardNo : no,
                mouseX : mouseX,
                mouseY : mouseY,
                detailResult : result.length > 0 ? result[0] : null,
                detailError : error
            };
        }
        return null;
    }

    componentDidMount(){
        const { cardNo } = this.state;
        this.props.fetchDetailByCardNo(cardNo);
    }

    componentWillUnmount(){
        this.props.resetFetchDetailByCardNo();
    }

    render(){
        const { cardNo, mouseX, mouseY, detailResult, detailError } = this.state;

        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;

        let oWidth = 350;
        let oHeight = 400;

        let divLeft = mouseX + 10;
        let divTop = mouseY + 5;
        
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        let resultRender = null;

        if(detailResult){
            resultRender = (
                <div>
                    <img src={detailResult.img_url_1} style={{ width : '160px' }} />
                    <img src={detailResult.img_url_2} style={{ width : '160px' }} />
                </div>
            )
        }
        return (
            <div 
                className="popupLayer"
                style={{
                    top : divTop,
                    left : divLeft,
                    position : 'fixed'
                }}
            >
                {resultRender}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupCardInfo);