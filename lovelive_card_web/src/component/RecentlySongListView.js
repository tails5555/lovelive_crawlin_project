import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ListGroup, Alert } from 'reactstrap';

import {
    fetchSongInfosByQuery, fetchSongInfosByQuerySuccess, fetchSongInfosByQueryFailure, resetFetchSongInfosByQuery
} from '../action/action_song_info';

import ParallaxStructureView from './ParallaxStructureView';
import RecentlySongBriefInfo from './RecentlySongBriefInfo';

const mapStateToProps = (state) => {
    return {
        songList : state.song_info.songList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSongInfosRecently : () => dispatch(fetchSongInfosByQuery('?pg=1')).then(response => {
            if(!response.error)
                dispatch(fetchSongInfosByQuerySuccess(response.payload));
        }).catch(error => {
            if(error && error.response){
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchSongInfosByQueryFailure(data));
            }
        }),
        resetFetchSongInfosRecently : () => dispatch(resetFetchSongInfosByQuery())
    }
}

class RecentlySongAndEventView extends React.Component {
    constructor(props){
        super(props);
        this.state = { songResults : [], songError : null };
    }

    componentDidMount(){
        this.props.fetchSongInfosRecently();
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
        this.props.resetFetchSongInfosRecently();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { results, error } = nextProps.songList;
        if(
            results !== prevState.cardResult ||
            error !== prevState.cardError
        ) {
            return {
                songResults : results.slice(0, 3),
                songError : error
            }
        }
        return null;
    }

    handleClickSongMoreView = () => {
        this.props.history.push('/song/list?pg=1');
    }

    render(){
        const { songResults, songError } = this.state;
        const { handleClickLeft, handleClickRight } = this.props;
        const recentlySongs = 
            songError === null ? 
                songResults.map(song => <RecentlySongBriefInfo key={song.id} info={song} />) :
                (
                    <Alert color="danger">
                        <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                        <p className="text-center">최신 게임 노래 정보 불러오는 도중 에러가 발생 했습니다.</p>
                        <p className="text-center">내용은 다음과 같습니다.</p>
                        <hr/>
                        <p className="text-center">{songError}</p>
                    </Alert>
                );

        return(
            <ParallaxStructureView viewId="recently_song_and_event_list" handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>새로운 노래 목록</h3>
                    <hr/>
                    <ListGroup>
                        {recentlySongs}
                    </ListGroup>
                    <br/>
                    <Button block color="primary" onClick={() => this.handleClickSongMoreView()}><i className="fas fa-search-plus" /> 노래 목록 조회</Button>
                </div>
            </ParallaxStructureView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecentlySongAndEventView));