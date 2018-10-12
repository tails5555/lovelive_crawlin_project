import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import {
    fetchCardImagesByCharacter, fetchCardImagesByCharacterSuccess, fetchCardImagesByCharacterFailure, resetFetchCardImagesByCharacter
} from '../action/action_image';

const IMAGE_URL = 'http://127.0.0.1:8000/media';
const CARD_IMAGE_URL = 'http://127.0.0.1:8000/card_images/';

class CharacterSmallCard extends React.Component {
    constructor(props){
        super(props);
        this.state = { character : props.character, imageResult : [], imageError : null };
    }

    componentDidMount(){
        const { character } = this.props;
        if(character && character.kor_name)
            axios({
                url : `${CARD_IMAGE_URL}character_name?character=${character.kor_name}`,
                method : 'get'
            }).then(response => {
                this.setState({ imageResult : response.data })
            }).catch(error => {
                this.setState({ imageError : '이미지를 불러오는 도중 오류가 발생했습니다.'});
            })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { character } = nextProps;
        if(character !== prevState.character){
            return {
                character : character
            };
        }
        return null;
    }

    render(){
        const { character, imageResult, imageError } = this.state;
        let randomIdx = -1;
        let randomImage = null;

        if(imageResult.length > 0){
            randomIdx = Math.floor(Math.random() * imageResult.length)
        }
        
        if(randomIdx !== -1){
            randomImage = imageResult[randomIdx];
        }

        return(
            <Card>
                <CardBody>
                    <CardTitle>{character && character.kor_name}</CardTitle>
                    <CardSubtitle>{character && character.jap_name}</CardSubtitle>
                </CardBody>
                {
                    randomImage ? <img width="100%" src={`${IMAGE_URL}/${randomImage.fields.img_file}`} /> : null
                }
                <CardBody>
                    <CardLink href="#">캐릭터 정보 조회하러 가기</CardLink>
                </CardBody>
            </Card>
        )
    }
}
export default CharacterSmallCard;