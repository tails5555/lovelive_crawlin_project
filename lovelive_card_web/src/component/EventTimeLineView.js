import React, { Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { VerticalTimeline } from 'react-vertical-timeline-component';

import EventTimeSpeechBubble from './EventTimeSpeechBubble';
import 'react-vertical-timeline-component/style.min.css';

class EventTimeLineView extends React.Component {
    constructor(props){
        super(props);
        this.state = { eventInfos : props.eventInfos, sortKey : ''  };
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        this.setState({
            sortKey : clientQueryModel['ordering']
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { eventInfos } = nextProps;
        if(eventInfos !== prevState.eventInfos){
            return {
                eventInfos : eventInfos
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

    handleClickSortPush = (key) => {
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['pg'] = 1;
        if(clientQueryModel['ordering'] === key) {
            clientQueryModel['ordering'] = `-${key}`;
        } else {
            clientQueryModel['ordering'] = key;
        }
        this.props.history.push(`/event/list/_page?${queryString.stringify(clientQueryModel)}`);
    }

    render(){
        const { eventInfos, sortKey } = this.state;
        const timeSpeechBubbles = eventInfos.map((eventInfo, idx) => <EventTimeSpeechBubble key={`event_time_speech_bubble_${idx}`} eventInfo={eventInfo} />);
        let startDateIcon;

        startDateIcon = (sortKey === 'start_date') ? 'fas fa-sort-up' : ((sortKey === '-start_date') ? 'fas fa-sort-down' : 'fas fa-sort');
        
        return(
            <Fragment>
                <div className="text-right">
                    <Button color="secondary" onClick={() => this.handleClickSortPush('start_date')}>날짜 순 <i className={startDateIcon} /></Button>
                </div>
                <VerticalTimeline>
                    {timeSpeechBubbles}
                </VerticalTimeline>
            </Fragment>
        )
    }
}

export default withRouter(EventTimeLineView);