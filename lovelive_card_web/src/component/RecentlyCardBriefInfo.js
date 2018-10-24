import React from 'react';
import axios from 'axios';
import { ListGroupItem, Media } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const IMAGE_ICON_URL = `http://localhost:8000/card_icons/`

class RecentlyCardBriefInfo extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { info : props.info, icons : [] };
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

    async getIconImages(infoNo) {
        axios({
            url : `${IMAGE_ICON_URL}?info=${infoNo}`,
            method : 'get'
        }).then(response => {
            const { data } = response;
            const images = data.map(d => d.img_file);
            if(this._isMounted)
                this.setState({
                    icons : images
                });
        });
    }

    componentDidMount(){
        const { info } = this.state;
        const infoNo = info && (info.no || 0);
        this._isMounted = true;
        if(this._isMounted && infoNo !== 0)
            this.getIconImages(infoNo);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleClickPushCardInfo = (infoNo) => {
        this.props.history.push(`/card/info?pg=1&id=${infoNo}`)
    }

    render(){
        const {info, icons} = this.state;
        return(
            <ListGroupItem>
                <Media>
                    {
                        window.innerWidth > 1024 ?
                            <Media left onClick={() => this.handleClickPushCardInfo(info.no)}>
                                {icons.map((icon, idx) => <img src={icon} className="img-fluid" key={`recently_card_icon_${info && info.no}_${idx}`} alt={`recently_card_icon_${info && info.no}_${idx}`} /> )}
                            </Media> :
                            <Media body onClick={() => this.handleClickPushCardInfo(info.no)}>
                                {icons.map((icon, idx) => <img src={icon} className="img-fluid" key={`recently_card_icon_${info && info.no}_${idx}`} alt={`recently_card_icon_${info && info.no}_${idx}`} /> )}
                            </Media>
                    }
                    
                    {
                        window.innerWidth < 1024 ? null : 
                            <Media body>
                                <Media heading>
                                { info && info.character_name }
                                </Media>
                                { info && info.card_title !== '' ? info.card_title : info && info.japanese_name }
                            </Media>
                    }
                </Media>       
            </ListGroupItem>
        )
    }
}

export default withRouter(RecentlyCardBriefInfo);