import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { PopupCardInfo } from './popup';

import './style/card_table.css';

const IMAGE_ICON_URL = `http://localhost:8000/card_icons/`

class CardBriefInfo extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { info : props.info, icons : [], mouseNo : 0, mouseX : 0, mouseY : 0 };
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

    componentDidMount(){
        const {info} = this.state;
        const infoNo = info && (info.no || 0);
        this._isMounted = true;
        if(this._isMounted && infoNo !== 0){
            this.getIconImages(infoNo);
        }
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleMouseEnter = (no) => {
        this.setState({
            mouseNo : no
        });
    }
    
    handleMouseLeave = () => {
        this.setState({
            mouseNo : 0
        });
    }

    handleMouseMove = (event) => {
        this.setState({ 
            mouseX : event.clientX, 
            mouseY : event.clientY 
        });
    }

    handleClickPushingOrTouching = (infoNo) => {
        this._isMounted = false;
        const { location } = this.props.history;
        const clientQueryModel = queryString.parse(location.search);
        clientQueryModel['id'] = infoNo
        this.props.history.push(`/card/info?${queryString.stringify(clientQueryModel)}`)
    }

    render(){
        const { info, icons, mouseNo, mouseX, mouseY } = this.state;
        let smallCardInfo = null;
        const property_color = 
            info && info.property === '스마일' ? 'deeppink' :
                info && info.property === '퓨어' ? 'limegreen' : 
                    info && info.property === '쿨' ? 'slateblue' : 'black';

        if(mouseNo !== 0) {
            smallCardInfo = <PopupCardInfo property={info && info.property} character={`${(info && info.character_name)} ${(info && info.japanese_name)}`} no={mouseNo} mouseX={mouseX} mouseY={mouseY} />;    
        }

        return (
            <tr>
                <td className="align-middle">
                    {info && (info.no || 0)}
                </td>
                <td className="align-middle">{info && (info.rank || '')}</td>
                <td className="align-middle">
                    {
                        smallCardInfo !== null ? smallCardInfo : null
                    }
                    <div className="d-flex justify-content-around" onClick={() => this.handleClickPushingOrTouching(info.no)} onTouchStart={() => this.handleClickPushingOrTouching(info.no)} onMouseEnter={() => this.handleMouseEnter(info && (info.no || 0))} onMouseLeave={() => this.handleMouseLeave()} onMouseMove={this.handleMouseMove.bind(this)}>
                        {
                            icons.map((icon, idx) => 
                                <img 
                                    key={`icon_${info && (info.no || 0)}_${idx+1}`} 
                                    src={icon} 
                                    style={{ cursor : 'pointer' }} 
                                    alt={`info_icon_${info && (info.no || 0)}_${idx+1}`} 
                                    className="rounded img-responsive"
                                />
                            )
                        }
                    </div>
                </td>
                <td className="align-middle">
                    {
                        smallCardInfo !== null ? smallCardInfo : null
                    }
                    <div id="info_box" className="d-flex flex-column bd-highlight" onMouseEnter={() => this.handleMouseEnter(info && (info.no || 0))} onMouseLeave={() => this.handleMouseLeave()} onMouseMove={this.handleMouseMove.bind(this)} onClick={() => this.handleClickPushingOrTouching(info.no)} onTouchStart={() => this.handleClickPushingOrTouching(info.no)}>
                        {
                            info && info.card_title ? <span style={{ wordBreak : 'keep-all' }}><b>{info && (info.card_title || '')}</b></span> : null
                        }
                        <span style={{ wordBreak : 'keep-all' }}>{info && (info.character_name || '')}</span>
                        <span style={{ wordBreak : 'keep-all' }}>{info && (info.japanese_name || '')}</span>
                    </div>
                </td>
                <td className="align-middle">
                    <span style={{ color : property_color, wordBreak : 'keep-all' }}>
                        {info && (info.property || '')}
                    </span>
                </td>
                <td className="align-middle">
                    <span style={{ wordBreak : 'keep-all' }}>{info && (info.center_effect || '')}</span>
                </td>
                <td className="align-middle">
                    <div className="d-flex justify-content-around">
                        <span style={{ color : 'deeppink' }}>{info && (info.smile || 0)}&nbsp;</span>
                        <span style={{ color : 'limegreen' }}>{info && (info.pure || 0)}&nbsp;</span>
                        <span style={{ color : 'slateblue' }}>{info && (info.cool || 0)}</span>
                    </div> 
                </td>
                <td className="align-middle">
                    <div className="d-flex flex-column bd-highlight">
                        <span style={{ wordBreak : 'keep-all' }}>{info && (info.active_condition || '')}</span>
                        <span style={{ wordBreak : 'keep-all' }}>{info && (info.active_skill || '')}</span>
                    </div>
                </td>
            </tr>
        )
    }
    
}

export default withRouter(CardBriefInfo);
