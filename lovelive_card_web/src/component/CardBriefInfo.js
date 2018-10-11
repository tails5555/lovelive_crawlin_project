import React from 'react';
import PopupCardInfo from './PopupCardInfo';

class CardBriefInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = { info : props.info, mouseNo : 0, mouseX : 0, mouseY : 0 };
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

    render(){
        const { info, mouseNo, mouseX, mouseY } = this.state;
        let smallCardInfo = null;
        const property_color = 
            info && info.property === '스마일' ? 'deeppink' :
                info.property === '퓨어' ? 'limegreen' : 
                    info.property === '쿨' ? 'slateblue' : 'black';
        
        if(mouseNo !== 0) {
            smallCardInfo = <PopupCardInfo no={mouseNo} mouseX={mouseX} mouseY={mouseY} />;    
        }

        return (
            <tr>
                <td className="align-middle">
                    {info && (info.no || 0)}
                </td>
                <td className="align-middle">{info && (info.rank || '')}</td>
                <td className="align-middle">
                    {
                        smallCardInfo
                    }
                    <div className="d-flex justify-content-around" onMouseEnter={() => this.handleMouseEnter(info && (info.no || 0))} onMouseLeave={() => this.handleMouseLeave()} onMouseMove={this.handleMouseMove.bind(this)}>
                        {   
                            info && info.icon_url_1 ?
                                <img src={info.icon_url_1} className="rounded img-responsive" /> : null
                        }
                        {
                            info && info.icon_url_2 ?
                                <img src={info.icon_url_2} className="rounded img-responsive" /> : null
                        }
                    </div>
                </td>
                <td className="align-middle">
                    <div className="d-flex flex-column bd-highlight" onMouseEnter={() => this.handleMouseEnter(info && (info.no || 0))} onMouseLeave={() => this.handleMouseLeave()} onMouseMove={this.handleMouseMove.bind(this)}>
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

export default CardBriefInfo;
