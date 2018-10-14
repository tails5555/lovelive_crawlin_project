import React from 'react';
import {connect} from 'react-redux';
import {Alert, Table} from 'reactstrap';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';
import {
    fetchCardImagesByInfoNo, fetchCardImagesByInfoNoSuccess, fetchCardImagesByInfoNoFailure, resetFetchCardImagesByInfoNo
} from '../action/action_image';

import './style/image_animate.css';
import './style/popup_card.css';

function mapStateToProps(state){
    return {
        detailElement : state.detail.detailElement,
        cardImages : state.media.cardImages
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
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo()),
        fetchImagesByCardNo : (cardNo) => dispatch(fetchCardImagesByInfoNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardImagesByInfoNoSuccess(response.payload));
            }).catch(error => {
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardImagesByInfoNoFailure(data));
            }),
        resetFetchImagesByCardNo : () => dispatch(resetFetchCardImagesByInfoNo()),
    }
}

class PopupCardInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = { cardNo : props.no, character : props.character, property : props.property, mouseX : props.mouseX, mouseY : props.mouseY, detailResult : null, detailError : null, imageResult : [], imageError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { no, mouseX, mouseY, detailElement, cardImages, character, property } = nextProps;
        if(
            no !== prevState.cardNo || 
            mouseX !== prevState.mouseX || 
            mouseY !== prevState.mouseY || 
            (detailElement.result.length > 0 ? detailElement.result[0] : null) !== prevState.detailResult || 
            detailElement.error !== prevState.detailError || 
            cardImages.results !== prevState.imageResult ||
            cardImages.error !== prevState.imageError ||
            character !== prevState.character ||
            property !== prevState.property
        ){
            return {
                cardNo : no,
                mouseX : mouseX,
                mouseY : mouseY,
                detailResult : detailElement.result.length > 0 ? detailElement.result[0] : null,
                detailError : detailElement.error,
                imageResult : cardImages.results,
                imageError : cardImages.error,
                character : character,
                property : property
            };
        }
        return null;
    }

    componentDidMount(){
        const { cardNo } = this.state;
        this.props.fetchDetailByCardNo(cardNo);
        this.props.fetchImagesByCardNo(cardNo);
    }

    componentWillUnmount(){
        this.props.resetFetchDetailByCardNo();
        this.props.resetFetchImagesByCardNo();
    }

    render(){
        const { cardNo, character, property, mouseX, mouseY, detailResult, detailError, imageResult, imageError } = this.state;

        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;

        let oWidth = 400;
        let oHeight = 580;

        let divLeft = mouseX + 10;
        let divTop = mouseY + 5;
        
        if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
        if( divTop + oHeight > sHeight ) divTop -= oHeight;

        if( divLeft < 0 ) divLeft = 0;
        if( divTop < 0 ) divTop = 0;

        let resultRender = null;
        
        const property_color = 
            property === '스마일' ? 'danger' :
                property === '퓨어' ? 'success' : 
                    property === '쿨' ? 'primary' : 'dark';
        
        if(imageResult.length > 0 && detailResult !== null){
            resultRender = (
                <div id="mini_card_info">
                    <Alert color={property_color}>
                        #{cardNo}. {character}
                    </Alert>
                    <div id="mini_card_imgs" className="fade-in" style={{ marginBottom : '15px' }}>
                        {
                            imageResult.map((image, idx) => <img key={`card_img_${image.info}_${idx}`} alt={`card_img_${image.id}`} src={image.img_file} style={{ width : '185px' }} />)
                        }
                    </div>
                    <Table className="fade-in" size="sm" bordered>
                        <tbody style={{ 
                            textAlign : 'center',
                            verticalAlign : 'center' 
                        }}>
                            <tr>
                                <th className="align-middle" style={{ width : '80px', backgroundColor : 'deeppink', color : 'white' }}>센터 스킬</th>
                                <td className="align-middle">{detailResult && detailResult.property_shape}</td>
                            </tr>
                            <tr>
                                <th className="align-middle" style={{ width : '80px', backgroundColor : 'deeppink', color : 'white' }}>스킬 효과</th>
                                <td className="align-middle">
                                {
                                    detailResult && detailResult.main_effect ?
                                        <span style={{ wordBreak : 'keep-all' }}>
                                            <h6>{detailResult.main_effect}</h6>
                                        </span> : null
                                }
                                {   
                                    detailResult && detailResult.plus_effect ?
                                        <span style={{ wordBreak : 'keep-all' }}>
                                            <h6>{detailResult.plus_effect}</h6>
                                        </span> : null
                                }
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2" style={{ backgroundColor : 'deeppink', color : 'white' }}>능력치</th>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <span style={{ wordBreak : 'keep-all', color : 'deeppink' }}>
                                        <h6>SMILE LIMIT : {detailResult && detailResult.basic_smile} ~ {detailResult && detailResult.wake_up_smile}</h6>
                                    </span>
                                    <span style={{ wordBreak : 'keep-all', color : 'limegreen' }}>
                                        <h6>PURE LIMIT : {detailResult && detailResult.basic_pure} ~ {detailResult && detailResult.wake_up_pure}</h6>
                                    </span>
                                    <span style={{ wordBreak : 'keep-all', color : 'slateblue' }}>
                                        <h6>COOL LIMIT : {detailResult && detailResult.basic_cool} ~ {detailResult && detailResult.wake_up_cool}</h6>
                                    </span>
                                    <span style={{ wordBreak : 'keep-all' }}>
                                        <h6>HP LIMIT : {detailResult && detailResult.basic_hp} ~ {detailResult && detailResult.wake_up_hp}</h6>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        }

        return (
            <div 
                className="popupLayer"
                style={{
                    top : divTop,
                    left : divLeft,
                    position : 'fixed',
                    height: `${((detailResult && detailResult.plus_effect) ? 25 : 0) + oHeight}px`
                }}
            >
                {resultRender}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupCardInfo);