import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    fetchSongInfosByQuery, fetchSongInfosByQuerySuccess, fetchSongInfosByQueryFailure, resetFetchSongInfosByQuery
} from '../action/action_song_info';

import {
    SongCardList, CardPagination
} from '../component';
import './style/background_view.css';

const mapStateToProps = (state) => ({
    songList : state.song.songList
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSongList : (query) =>  dispatch(fetchSongInfosByQuery(query)).then(response => {
            if(!response.error)
                dispatch(fetchSongInfosByQuerySuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchSongInfosByQueryFailure(data));
                }
            }),
        resetFetchSongList : () => dispatch(resetFetchSongInfosByQuery())
    }
}

class SongCardListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : '' };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        if(search !== ''){
            return {
                query : search
            };
        }
        return null;
    }

    componentDidMount(){
        const { query } = this.state;
        this.props.fetchSongList(query);
        window.onpopstate = this.onBackButtonEvent;
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
        this.props.resetFetchSongList();
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        const { history } = this.props;
        if(history.location.pathname === '/song/list')
            this.props.history.push(`/song/list/_page${history.location.search}`);
    }

    render(){
        const { results, count } = this.props.songList;
        return(
            <div className="background_view" id="song_list">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="search_form_margin" style={{ height : '10px' }} />
                    <div id="song_search_form" style={{ marginBottom : '10px' }}>
                        
                    </div>
                    <div id="song_small_card_list" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <SongCardList songs={results} />
                    </div>
                    <div id="song_small_card_pagination" style={{ marginTop : '10px' }}>
                        <CardPagination count={count} pageBase={12} />
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongCardListContainer));