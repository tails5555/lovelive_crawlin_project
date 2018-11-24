import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';

import {
    fetchEventInfoById, fetchEventInfoByIdSuccess, fetchEventInfoByIdFailure, resetFetchEventInfoById
} from '../action/action_event_info';

import { EventScoreChartView, TitleRibbon } from '../component';

import './style/background_view.css';

const mapStateToProps = (state) => ({
    eventInfo : state.event_info.eventInfo 
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventInfo : (id) => dispatch(fetchEventInfoById(id)).then(response => {
        if(!response.error)
            dispatch(fetchEventInfoByIdSuccess(response.payload));
        }).catch(error => {
        if(error && error.response){
            const { status, data } = error.response;
            if(status !== 200)
                dispatch(fetchEventInfoByIdFailure(data));
        }
    }),
    resetFetchEventInfo : () => dispatch(resetFetchEventInfoById())
});

class EventInfoViewContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = { id : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { search } = nextProps.history.location;
        const clientQueryModel = queryString.parse(search);
        if(clientQueryModel.id && clientQueryModel.id !== prevState.id){
            return {
                id : clientQueryModel.id
            };
        }
        return null;
    }

    componentDidMount(){
        const { id } = this.state;
        if(id !== 0)
            this.props.fetchEventInfo(id);
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
        this.props.resetFetchEventInfo();
    }

    handleClickPushToList(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['id'] = undefined;
        this.props.history.push(`/event/list?${queryString.stringify(clientQueryModel)}`);
    }

    render(){
        const { result, error } = this.props.eventInfo;
        return(
            <div className="background_info" id="card_info" style={{ padding : '30px' }}>
                <div id="back_button" style={{ position : 'fixed', right : '20px', bottom : '20px', zIndex : '2' }}>
                    <Button className="shadow" color="warning" size="lg" style={{ borderRadius : '10px' }} onClick={() => this.handleClickPushToList()}><i className="fas fa-arrow-circle-left" /></Button>
                </div>

                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="container_top_margin" style={{ height : '10px' }} />
                    
                    <div id="event_score_chart_view_title" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <TitleRibbon title="이벤트 점수 그래프" />
                    </div>

                    <div id="event_score_chart_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <EventScoreChartView infoResult={result} infoError={error} />
                    </div>

                    <div id="container_bottom_margin" style={{ height : '10px' }} />
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventInfoViewContainer));