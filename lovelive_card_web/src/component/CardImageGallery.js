import React from 'react';
import axios from 'axios';
import { Row, Col, Alert } from 'reactstrap';

import './style/image_animate.css';

const CARD_IMAGE_URL = 'http://127.0.0.1:8000/card_images/';

class CardImageGallery extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { cardNo : props.cardNo, imageResult : [], imageError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { cardNo } = nextProps;
        if(cardNo !== prevState.cardNo){
            return {
                cardNo : cardNo
            }
        }
        return null;
    }

    componentDidMount(){
        const { cardNo } = this.state;
        this._isMounted = true;
        if(cardNo !== 0)
            this.getCardImages(cardNo);
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
        this._isMounted = false;
    }

    async getCardImages(cardNo){
        axios({
            url : `${CARD_IMAGE_URL}?info=${cardNo}`,
            method : 'get'
        }).then(response => {
            if(this._isMounted)
                this.setState({ imageResult : response.data });
        }).catch(error => {
            if(this._isMounted)
                this.setState({ imageError : '이미지를 불러오는 도중 오류가 발생했습니다.'});
        });
    }

    render(){
        const { imageResult, imageError } = this.state;
        const imageView = imageError === null ? 
            imageResult.map(image => (
                <Col key={`card_detail_img_${image.id}`} xs={6} sm={6} className="fade-in text-center">
                    <img className="img-fluid" alt={`card_detail_img_${image.id}`} src={image && image.img_file} />
                </Col>
            )) :
            (
                <Alert color="danger">
                    <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                    <p className="text-center">카드 이미지를 불러오는 도중 에러가 발생 했습니다.</p>
                    <p className="text-center">내용은 다음과 같습니다.</p>
                    <hr/>
                    <p className="text-center">{imageError}</p>
                </Alert>
            );
        return(
            <Row>
                {imageView}
            </Row>
        )
    }
}

export default CardImageGallery;