import React, { Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import SongSmallCard from './SongSmallCard';

class SongCardList extends React.Component {
    constructor(props){
        super(props);
        this.state = { songs : props.songs, sortKey : '' }
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

    componentDidMount(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        this.setState({
            sortKey : clientQueryModel['ordering']
        });
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

    handleClickSortPush = (key) => {
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['pg'] = 1;
        if(clientQueryModel['ordering'] === key) {
            clientQueryModel['ordering'] = `-${key}`;
        } else {
            clientQueryModel['ordering'] = key;
        }
        this.props.history.push(`/song/list/_page?${queryString.stringify(clientQueryModel)}`);
    }

    render(){
        const { songs, sortKey } = this.state;
        let songCards = null;
        let idIcon, levelIcon;

        idIcon = (sortKey === 'id') ? 'fas fa-sort-up' : ((sortKey === '-id') ? 'fas fa-sort-down' : 'fas fa-sort');
        levelIcon = (sortKey === 'unlock_level') ? 'fas fa-sort-up' : ((sortKey === '-unlock_level') ? 'fas fa-sort-down' : 'fas fa-sort');

        if(songs.length > 0){
            songCards = songs.map(song => (
                <Col sm={6} md={4} key={`song_card_${song.id}`} style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <SongSmallCard song={song} />
                </Col>
            ))
        }

        return(
            <Fragment>
                <div className="d-flex justify-content-start" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button color="secondary" onClick={() => this.handleClickSortPush('id')} style={{ marginRight : '5px' }}>ID <i className={idIcon} /></Button>
                    <Button color="secondary" onClick={() => this.handleClickSortPush('unlock_level')} style={{ marginLeft : '5px' }}>잠금 LV <i className={levelIcon} /></Button>
                </div>
                <Row className="justify-content-around">
                    {songCards}
                </Row>
            </Fragment>
        )
    }
}

export default withRouter(SongCardList);