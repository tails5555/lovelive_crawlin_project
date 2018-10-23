import React from 'react';
import axios from 'axios';
import { ListGroupItem } from 'reactstrap';

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

    render(){
        const {info, icons} = this.state;
        return(
            <ListGroupItem>
                {icons.map((icon, idx) => <img src={icon} key={`recently_card_icon_${info && info.no}_${idx}`} alt={`recently_card_icon_${info && info.id}_${idx}`} /> )}
            </ListGroupItem>
        )
    }
}

export default RecentlyCardBriefInfo;