import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Alert } from 'reactstrap';

import './style/image_animate.css';
import './style/card_animate.css';

const SONG_IMAGE_URL = 'http://127.0.0.1:8000/song_cover_images/';

class SongSmallCard extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { song : props.song, imageResult : [], imageError : null };
    }

    componentDidMount(){
        const { song } = this.props;
        this._isMounted = true;
        if(song && song.id)
            this.getSongImageById(song.id);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        const { song } = nextProps;
        if(song !== prevState.song){
            return {
                song : song
            };
        }
        return null;
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

    async getSongImageById(id){
        axios({
            url : `${SONG_IMAGE_URL}?info=${id}`,
            method : 'get'
        }).then(response => {
            if(this._isMounted)
                this.setState({ imageResult : response.data })
        }).catch(error => {
            if(this._isMounted)
                this.setState({ imageError : '이미지를 불러오는 도중 오류가 발생했습니다.' });
        });
    }

    render(){
        const { song, imageResult, imageError } = this.state;
        const { search } = this.props.history.location;
        return(
            <Card className="animationCard">
                <CardBody>
                    <CardTitle>{song && song.kor_title}</CardTitle>
                    <CardSubtitle>{song && song.jap_title}</CardSubtitle>
                </CardBody>
                {
                    imageError === null ? 
                        imageResult.map((image, idx) => <img style={{ width : "100%" }} key={`song_key_image_${idx}`} alt={`song_image_${idx}`} src={image.img_file} />) :
                        (
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">이미지를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{imageError}</p>
                            </Alert>
                        )
                }
                <CardBody>
                    <Button tag={Link} to={`info?id=${song.id}&${search.replace('?', '')}`} color="info" block><i className="fas fa-music"></i> 노래 정보 조회하러 가기</Button>
                </CardBody>
            </Card>
        )
    }
}
export default withRouter(SongSmallCard);