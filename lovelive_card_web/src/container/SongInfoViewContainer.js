import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';

import {
    fetchSongInfoById, fetchSongInfoByIdSuccess, fetchSongInfoByIdFailure, resetFetchSongInfoById
} from '../action/action_song_info';

import {
    fetchSongDetailByInfoId, fetchSongDetailByInfoIdSuccess, fetchSongDetailByInfoIdFailure, resetFetchSongDetailByInfoId
} from '../action/action_song_detail';

import {
    fetchSongImageBySongId, fetchSongImageBySongIdSuccess, fetchSongImageBySongIdFailure, resetFetchSongImageBySongId
} from '../action/action_image';

import { SongDetailGraphView, TitleRibbon } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => ({
    songInfo : state.song_info.songInfo,
    songImages : state.media.sognImages,
    songDetail : state.song_detail.detailElement
});

const mapDispatchToProps = (dispatch) => ({
    fetchSongInfo : (id) => dispatch(fetchSongInfoById(id)).then(response => {
        if(!response.error)
                dispatch(fetchSongInfoByIdSuccess(response.payload));
            })
    .catch(error => {
        if(error && error.response){
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchSongInfoByIdFailure(data));
        }
    }),
    resetFetchSongInfo : () => dispatch(resetFetchSongInfoById()),
    fetchSongDetail : (id) => dispatch(fetchSongDetailByInfoId(id)).then(response => {
        if(!response.error)
            dispatch(fetchSongDetailByInfoIdSuccess(response.payload));
    }).catch(error => {
        if(error && error.response){
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchSongDetailByInfoIdFailure(data));
        }
    }),
    resetFetchSongDetail : () => dispatch(resetFetchSongDetailByInfoId()),
    fetchSongImage : (id) => dispatch(fetchSongImageBySongId(id)).then(response => {
        if(!response.error)
            dispatch(fetchSongImageBySongIdSuccess(response.payload));
    }).catch(error => {
        if(error && error.response){
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchSongImageBySongIdFailure(data));
        }
    }),
    resetFetchSongImage : () => dispatch(resetFetchSongImageBySongId()) 
});

class SongInfoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { songId : 0 };
    }

    componentDidMount(){
        const { songId } = this.state;
        if(songId !== 0){
            this.props.fetchSongInfo(songId);
            this.props.fetchSongDetail(songId);
            this.props.fetchSongImage(songId);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { search } = nextProps.history.location;
        const clientQueryModel = queryString.parse(search);
        if(clientQueryModel && (clientQueryModel.id || 0) !== prevState.songId){
            return {
                songId : clientQueryModel.id
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
        const { songId } = this.state;
        if(songId !== 0){
            this.props.resetFetchSongInfo();
            this.props.resetFetchSongDetail();
            this.props.resetFetchSongImage();
        } 
    }

    handleClickPushToList = () => {
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['id'] = undefined;
        this.props.history.push(`/song/list?${queryString.stringify(clientQueryModel)}`);
    }

    render(){
        const { songInfo, songDetail, songImages } = this.props;
        return(
            <div className="background_view" id="song_info">
                <div id="back_button" style={{ position : 'fixed', right : '20px', bottom : '20px', zIndex : '2' }}>
                    <Button className="shadow" color="warning" size="lg" style={{ borderRadius : '10px' }} onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /></Button>
                </div>

                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '10px' }} />

                    <div id="song_detail_graph_view_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="노래 점수 분산 그래프" />
                    </div>
                    <div id="song_detail_graph_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <SongDetailGraphView detailResult={songDetail.result} detailError={songDetail.error}/>
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongInfoViewContainer));