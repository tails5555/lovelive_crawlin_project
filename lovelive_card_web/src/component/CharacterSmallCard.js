import React from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './style/image_animate.css';
import './style/card_animate.css';
import { Link, withRouter } from 'react-router-dom';

const IMAGE_URL = 'http://127.0.0.1:8000/media';
const CARD_IMAGE_URL = 'http://127.0.0.1:8000/card_images/';

class CharacterSmallCard extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { character : props.character, imageResult : [], imageError : null, randomURL : null };
    }

    componentDidMount(){
        const { character } = this.props;
        this._isMounted = true;
        if(character && character.kor_name)
            this.getCardImageListByKorName(character.kor_name);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    async getCardImageListByKorName(korName){
        axios({
            url : `${CARD_IMAGE_URL}character_name?character=${korName}`,
            method : 'get'
        }).then(response => {
            if(this._isMounted)
                this.setState({ imageResult : response.data })
        }).catch(error => {
            if(this._isMounted)
                this.setState({ imageError : '이미지를 불러오는 도중 오류가 발생했습니다.'});
        });
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { imageResult } = this.state;
        if(imageResult !== prevState.imageResult)
            this.selectRandomURL();
    }

    handleTouchStart = () => {
        this.selectRandomURL();
    }

    handleMouseOver = () => {
        this.selectRandomURL();
    }

    selectRandomURL = () => {
        const { imageResult } = this.state;
        let randomIdx = -1;
        let randomImage = null;

        if(imageResult.length > 1){
            randomIdx = Math.floor(Math.random() * imageResult.length)
        }
        
        if(randomIdx !== -1){
            randomImage = imageResult[randomIdx];
        }

        if(randomImage !== null) {
            this.setState({
                randomURL : randomImage.fields.img_file
            })
        }
    }

    render(){
        const { character, imageResult, imageError, randomURL } = this.state;
        const { search } = this.props.history.location;
        return(
            <Card className="animationCard">
                <CardBody>
                    <CardTitle>{character && character.kor_name}</CardTitle>
                    <CardSubtitle>{character && character.jap_name} / {character && character.grade !== 0 ? `${character.grade} 학년` : '기타 캐릭터'}</CardSubtitle>
                </CardBody>
                <div onTouchStart={() => this.handleTouchStart()} onMouseOver={() => this.handleMouseOver()}>
                    {
                        randomURL ? <img style={{ width : "100%" }} alt={`card_random_image`} className="change-img" src={`${IMAGE_URL}/${randomURL}`} /> : null
                    }
                </div>
                <CardBody>
                    <Button tag={Link} to={`info?id=${character.id}&${search.replace('?', '')}`} color="info" block><i className="fas fa-user-circle"></i> 캐릭터 정보 조회하러 가기</Button>
                </CardBody>
            </Card>
        )
    }
}
export default withRouter(CharacterSmallCard);