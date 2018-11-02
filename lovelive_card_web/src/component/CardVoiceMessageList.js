import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import classnames from 'classnames';

import { CardMessageAnalysis } from '../util';

const tabName = {
    skill : '스킬 발동',
    function : '메뉴 화면',
    random : '랜덤',
    touch : '터치할 때',
    time : '특정 시간',
    period : '특정 날짜',   
}

class CardVoiceMessageList extends React.Component {
    constructor(props){
        super(props);
        this.state = { messageResult : props.messageResult, messageError : props.messageError, messageData : null, activeTab : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { messageResult, messageError } = nextProps;
        if(
            messageResult !== prevState.messageResult ||
            messageError !== prevState.messageError
        ) {
            return {
                messageResult : messageResult,
                messageError : messageError
            }
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

    componentDidUpdate(prevProps, prevState){
        const { messageResult } = prevState;
        const tmpMessageResult = this.state.messageResult;
        if(messageResult !== this.state.messageResult){
            if(Array.isArray(tmpMessageResult))
                this.setState({
                    messageData : CardMessageAnalysis(tmpMessageResult.length > 0 ? tmpMessageResult[0] : null)
                });
        }
    }

    handleClickTab = (idx) => {
        this.setState({
            activeTab : idx
        });
    }

    handleClickPapagoTranslate = (japMessage) => {
        window.open(`https://papago.naver.com/?sk=ja&tk=ko&st=${japMessage}`);
    }

    render(){
        const { messageData, messageError, activeTab } = this.state;
        const messageKeys = messageData ? Object.keys(messageData) : [];
        let messageViews = null;

        let navItems = messageKeys.map((key, idx) => 
            <NavItem key={`navlink_key_${idx}`}>
                <NavLink
                    className={classnames({ active: activeTab === idx })}
                    onClick={() => this.handleClickTab(idx)}
                    style={{ cursor : 'pointer' }}
                >
                    {tabName[key]}
                </NavLink>
            </NavItem>
        );
        
        if(messageKeys.length > 0) {
            messageViews = messageKeys.map((key, idx) => 
                <TabPane tabId={idx} key={`message_view_${key}_${idx}`}>
                    {
                        key === 'skill' ? 
                            messageData[key].totalMessage !== 'null' ?
                                <div className="d-flex rounded border border-primary" style={{ backgroundColor : 'azure', margin : '10px', padding : '5px' }}>
                                    <div className="p-2 align-self-center" dangerouslySetInnerHTML={{__html: messageData[key].totalMessage }} />
                                    {
                                        !messageData[key].hasKorean ? 
                                            <div className="ml-auto align-self-center">
                                                <Button color="info" onClick={() => this.handleClickPapagoTranslate(messageData[key].jpMessage)}><i className="fas fa-language" /> 번역</Button>
                                            </div>: null
                                    }
                                </div> :
                                <div className="d-flex rounded border border-danger" style={{ backgroundColor : 'lavenderblush', margin : '10px', padding : '5px' }}>
                                    <div className="p-2 align-self-center">
                                        해당하는 보이스 메시지가 없습니다.
                                    </div>
                                    <div className="ml-auto align-self-center">
                                        <h2><i className="fas fa-times-circle" /></h2>
                                    </div>
                                </div> 
                        : 
                            messageData[key].length > 0 ?
                                messageData[key].map((message, idx) => 
                                    <div className="d-flex rounded border border-primary" key={`message_detail_${key}_${idx}`} style={{ backgroundColor : 'azure', margin : '10px', padding : '5px' }}>
                                        <div className="p-2 align-self-center" dangerouslySetInnerHTML={{__html: message.totalMessage }} />
                                        {
                                            !message.hasKorean ? 
                                                <div className="ml-auto align-self-center">
                                                    <Button color="info" onClick={() => this.handleClickPapagoTranslate(message.jpMessage)}><i className="fas fa-language" /> 번역</Button>
                                                </div> : null
                                        }
                                    </div>
                                ) :
                                <div className="d-flex rounded border border-danger" style={{ backgroundColor : 'lavenderblush', margin : '10px', padding : '5px' }}>
                                    <div className="p-2 align-self-center">
                                        해당하는 보이스 메시지가 없습니다.
                                    </div>
                                    <div className="ml-auto align-self-center">
                                        <h2><i className="fas fa-times-circle" /></h2>
                                    </div>
                                </div> 
                    }
                </TabPane>
            )
        }
        return(
            <Fragment>
                <Nav tabs className="justify-content-around">
                    {navItems}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    {messageViews}
                </TabContent>
            </Fragment>
        )
    }
}
export default CardVoiceMessageList;