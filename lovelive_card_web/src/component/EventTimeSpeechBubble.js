import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import CountUp from 'react-countup';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { convertDateTimeToKoreanDateAndHour } from '../util/DateTimeStringConverter';

const IMAGE_ICON_URL = `http://localhost:8000/card_icons/`;
const SONG_INFO_URL = 'http://127.0.0.1:8000/song_infos/'

class EventTimeSpeechBubble extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { eventInfo : props.eventInfo, icon : null, characterInfo : null, songInfo : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { eventInfo } = nextProps;
        if(eventInfo !== prevState.eventInfo){
            return {
                eventInfo : eventInfo
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

    componentDidMount(){
        const { eventInfo } = this.state;
        const infoNo = eventInfo && (eventInfo.card_info || 0);
        const songNo = eventInfo && (eventInfo.song_info || 0);
        this._isMounted = true;
        if(this._isMounted && infoNo !== 0){
            this.getIconImageAndSongInfo(infoNo, songNo);
        }
    }

    async getIconImageAndSongInfo(infoNo, songNo) {
        let requests = [
            axios({
                url : `${IMAGE_ICON_URL}?info=${infoNo}`,
                method : 'get'
            })
        ];
        if (songNo !== 0){
            requests.push(
                axios({
                    url : `${SONG_INFO_URL}${songNo}`,
                    method : 'get'
                })
            );
        }
        axios.all(requests).then((results) => {
            if(this._isMounted) {
                const images = results[0].data.map(image => image.img_file);
                const songInfo = results.length > 1 ? results[1].data : null;
                this.setState({
                    icon : images[1],
                    songInfo : songInfo
                });
            }
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleClickViewEventInfo = (infoId) => {
        const { history } = this.props;
        const { search } = this.props.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['id'] = infoId;
        history.push(`/event/info?${queryString.stringify(clientQueryModel)}`)
    }

    handleClickViewCardInfo = (cardNo) => {
        const { history } = this.props;
        history.push(`/card/info?id=${cardNo}&pg=1`);
    }

    handleClickViewSongInfo = (songTitle) => {
        const { history } = this.props;
        history.push(`/song/list?st=${songTitle}&pg=1`);
    }

    render() {
        const { eventInfo, icon, songInfo } = this.state;
        const dateUnit = <p className="d-flex justify-content-center">{eventInfo && convertDateTimeToKoreanDateAndHour(new Date(eventInfo.start_date))} ~ {eventInfo && convertDateTimeToKoreanDateAndHour(new Date(eventInfo.end_date))}</p>;
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element"
                date={dateUnit}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<img className="img-fluid rounded-circle" src={icon} alt={`event_card_icon_${eventInfo && eventInfo.card_info}`} />}
            >
                <h4 className="float-right" style={eventInfo && eventInfo.region === 'KOR' ? { color : 'blue' } : { color : 'red' }}>{eventInfo && eventInfo.region === 'KOR' ? '韓' : '日'}</h4>
                <h3 className="vertical-timeline-element-title">{eventInfo && eventInfo.event_title}</h3>
                <h4 className="vertical-timeline-element-subtitle">최다 득점 {eventInfo && eventInfo.first_cut_score === 0 ? '미상' : <CountUp end={ eventInfo.first_cut_score } duration={2} suffix=" pt" />}</h4>
                {
                    eventInfo && eventInfo.event_context.trim() !== '' ? <p style={{ marginTop : '10px', marginBottom : '10px', color : 'deeppink' }}><i className="fas fa-exclamation-circle"/> {eventInfo.event_context}</p> : null
                }
                <div className="d-flex justify-content-around flex-wrap" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button color="info" onClick={() => this.handleClickViewEventInfo(eventInfo && eventInfo.id)} style={{ margin : '10px' }}>
                        <i className="fas fa-chart-line" /> 이벤트 점수 열람
                    </Button>
                    <Button color="success" onClick={() => this.handleClickViewCardInfo(eventInfo && eventInfo.card_info)} style={{ margin : '10px' }}>
                        <i className="fas fa-id-card" /> 카드 정보 열람
                    </Button>
                    {
                        songInfo !== null ? 
                            <Button color="primary" onClick={() => this.handleClickViewSongInfo(songInfo && songInfo.kor_title)} style={{ margin : '10px' }}>
                                <i className="fas fa-music" /> 노래 정보 열람
                            </Button> : null
                    }
                </div>
            </VerticalTimelineElement>
        )
    }
}

export default withRouter(EventTimeSpeechBubble);