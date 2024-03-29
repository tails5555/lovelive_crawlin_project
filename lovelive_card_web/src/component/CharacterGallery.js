import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import {
    fetchCardImagesByCharacter, fetchCardImagesByCharacterSuccess, fetchCardImagesByCharacterFailure, resetFetchCardImagesByCharacter
} from '../action/action_image';

import './style/slick_btn_color.css';

const MEDIA_URL = 'http://localhost:8000/media';

const mapStateToProps = (state) => {
    return {
        cardImages : state.media.cardImages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImagesByCharacter : (character) => dispatch(fetchCardImagesByCharacter(character)).then(response => {
            if(response.payload.status === 204) {
                dispatch(fetchCardImagesByCharacterFailure({
                    info : ["선택하신 캐릭터의 카드 이미지가 존재하지 않습니다."]
                }));
            } else if(!response.error) {
                dispatch(fetchCardImagesByCharacterSuccess(response.payload));
            }
        }).catch(error => {
            const { status } = error.response;
            if(status !== 200)
                dispatch(fetchCardImagesByCharacterFailure({
                    info : ["이미지를 불러오는 도중 예기치 않은 오류가 발생했습니다."]
                }));
        }),
        resetFetchImagesByCharacter : () => dispatch(resetFetchCardImagesByCharacter())
    }
}

class CharacterGallery extends React.Component {
    constructor(props){
        super(props);
        this.state = { character : props.character, imageResult : [], imageError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { character, cardImages } = nextProps;
        const { results, error } = cardImages;
        if(
            character !== prevState.character ||
            results !== prevState.imageResult ||
            error !== prevState.imageError
        ) {
            return {
                character : character,
                imageResult : results,
                imageError : error
            };
        }
        return null;
    }

    componentDidMount(){
        const { character } = this.state;
        if(character)
            this.getCharacterImagesByName(character);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { character } = this.state;
        if(character !== prevState.character)
            this.getCharacterImagesByName(character);
    }

    componentWillUnmount(){
        this.props.resetFetchImagesByCharacter();
    }

    getCharacterImagesByName = (character) => {
        if(character !== undefined)
            this.props.fetchImagesByCharacter(character);
    }

    render(){
        const { imageResult, imageError } = this.state;
        const resultImages = Array.isArray(imageError) && imageResult.length > 0 ? 
            imageResult.map((image, idx) => (
                image.model !== undefined ? 
                <div key={`character_img_${image.pk}`}>
                    <img className="img-fluid" alt={`character_card_img_${image.pk}`} src={`${MEDIA_URL}/${image.fields && image.fields.img_file}`} />
                </div> : <div key={`character_img_${idx}`}></div>
            )) : null;

        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 2,
            autoplay: true,
            pauseOnHover: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };

        return(
            <div id="image_view" className="image_slide">
                <Slider { ...settings }>
                    {resultImages}
                </Slider>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterGallery);