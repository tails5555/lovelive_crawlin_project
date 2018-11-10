import React from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import EventTimeSpeechBubble from './EventTimeSpeechBubble';

class EventTimeLineView extends React.Component {
    constructor(props){
        super(props);
        this.state = { eventInfos : props.eventInfos };
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

    render(){
        const { eventInfos } = this.state;
        const timeSpeechBubbles = eventInfos.map((eventInfo, idx) => <EventTimeSpeechBubble key={`event_time_speech_bubble_${idx}`} eventInfo={eventInfo} />);
        return(
            <VerticalTimeline>
                {timeSpeechBubbles}
            </VerticalTimeline>
        )
    }
}

export default EventTimeLineView;