import React from 'react';
import axios from 'axios';
import { ImageBackground } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { MAIN_ROOT_URL } from '../action/server_url';

const CARD_IMAGE_URL = `${MAIN_ROOT_URL}/card_images/`;

class CardInfoImageView extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { cardNo : props.cardNo, imageResult : [], imageError : null };
    }

    componentWillReceiveProps(nextProps, nextState) {
        const { cardNo } = nextProps;
        if(cardNo !== this.state.cardNo){
            this.setState({
                cardNo : cardNo
            });
        }
    }

    componentDidMount(){
        const { cardNo } = this.state;
        this._isMounted = true;
        if(cardNo !== 0) {
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

    render(){
        const { imageResult, imageError } = this.state;
        const imageViews = imageResult.map((image, idx) => 
            <ImageBackground key={`card_image_key_${idx}`} style={{ flex : 1 }} source={{uri : image && image.img_file}} >
                <Col />
            </ImageBackground>
        )
        return (
            <Grid>
                {imageViews}
            </Grid>
        )
    }
}

export default CardInfoImageView;