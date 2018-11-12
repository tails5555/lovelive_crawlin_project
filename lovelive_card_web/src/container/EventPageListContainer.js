import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import {
    fetchEventInfosByQuery, fetchEventInfosByQuerySuccess, fetchEventInfosByQueryFailure, resetFetchEventInfosByQuery
} from '../action/action_event_info';

import { EventTimeLineView, EventSearchForm, CardPagination } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => ({
    eventList : state.event_info.eventList 
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventList : (query) => dispatch(fetchEventInfosByQuery(query)).then(response => {
        if(!response.error)
                dispatch(fetchEventInfosByQuerySuccess(response.payload));
    }).catch(error => {
        if(error && error.response){
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchEventInfosByQueryFailure(data));
        }
    }),
    resetFetchEventList : () => dispatch(resetFetchEventInfosByQuery())
});

class EventPageListContainer extends React.Component {
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
        this.props.fetchEventList(query);
        window.onpopstate = this.onBackButtonEvent;
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        const { history } = this.props;
        if(history.location.pathname === '/event/list')
            this.props.history.push(`/event/list/_page${history.location.search}`);
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
        this.props.resetFetchEventList();
    }

    render(){
        const { results, count } = this.props.eventList;
        return(
            <div className="background_view" id="event_list">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '10px' }} />
                    <div id="event_search_form" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <EventSearchForm />
                    </div>
                    <div id="event_time_line_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <EventTimeLineView eventInfos={results} />
                    </div>
                    <div id="card_brief_pagination" style={{ marginTop : '10px' }}>
                        <CardPagination count={count} pageBase={9} />
                    </div>
                    <div id="container_bottom_margin" style={{ height : '10px' }} />
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventPageListContainer));