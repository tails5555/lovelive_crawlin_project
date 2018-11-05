import React from 'react';
import { Row, Col } from 'reactstrap';
import SongSmallCard from './SongSmallCard';

class SongCardList extends React.Component {
    constructor(props){
        super(props);
        this.state = { songs : props.songs }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { songs } = nextProps;
        if(songs !== prevState.songs){
            return {
                songs : songs
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

    render(){
        const { songs } = this.state;
        let songCards = null;
        if(songs.length > 0){
            songCards = songs.map(song => (
                <Col sm={6} md={4} key={`song_card_${song.id}`} style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <SongSmallCard song={song} />
                </Col>
            ))
        }

        return(
            <Row className="justify-content-around">
                {songCards}
            </Row>
        )
    }
}

export default SongCardList;