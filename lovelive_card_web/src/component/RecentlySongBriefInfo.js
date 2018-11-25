import React from 'react';
import axios from 'axios';
import { ListGroupItem, Media } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const SONG_COVER_ICONS_URL = `http://localhost:8000/song_cover_images/`

class RecentlySongBriefInfo extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { info : props.info, images : [], mouseOn : false };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { info } = nextProps;
        if(info !== prevState.info){
            return {
                info : info
            };
        }
        return null;
    }

    async getIconImages(infoId) {
        axios({
            url : `${SONG_COVER_ICONS_URL}?info=${infoId}`,
            method : 'get'
        }).then(response => {
            const { data } = response;
            const images = data.map(d => d.img_file);
            if(this._isMounted)
                this.setState({ images });
        });
    }

    componentDidMount(){
        const { info } = this.state;
        const infoId = info && (info.id || 0);
        this._isMounted = true;
        if(this._isMounted && infoId !== 0)
            this.getIconImages(infoId);
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
        this._isMounted = false;
    }

    handleMouseEnter = () => { 
        this.setState({
            mouseOn : true
        });
    }
    
    handleMouseLeave = () => {
        this.setState({
            mouseOn : false
        });
    }

    handleClickPushSongInfo = (infoId) => {
        this.props.history.push(`/song/info?pg=1&id=${infoId}`)
    }

    render(){
        const { info, images, mouseOn } = this.state;
        return(
            <ListGroupItem>
                <Media style={{ cursor : 'pointer' }} onClick={() => this.handleClickPushSongInfo(info.id)} onTouchStart={() => this.handleClickPushSongInfo(info.id)} onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()} >
                    {
                        window.innerWidth > 1024 ?
                            <Media left>
                                {images.map((icon, idx) => <img src={icon} style={{ width : '64px', height : '64px' }} className="img-fluid" key={`recently_song_icon_${info && info.id}_${idx}`} alt={`recently_song_icon_${info && info.id}_${idx}`} /> )}
                            </Media> :
                            <Media body>
                                {images.map((icon, idx) => <img src={icon} style={{ width : '64px', height : '64px' }} className="img-fluid" key={`recently_song_icon_${info && info.id}_${idx}`} alt={`recently_song_icon_${info && info.id}_${idx}`} /> )}
                            </Media>
                    }
                    
                    {
                        window.innerWidth < 1024 ? 
                            null : 
                            <Media body style={mouseOn ? { textDecoration : 'underline' } : null}>
                                <Media heading>
                                { info && info.kor_title }
                                </Media>
                                { info && info.jap_title }
                            </Media>
                    }
                </Media>       
            </ListGroupItem>
        )
    }
}

export default withRouter(RecentlySongBriefInfo);