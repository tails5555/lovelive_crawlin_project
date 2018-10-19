import React from 'react';
import { Table } from 'reactstrap';

import './style/card_table.css';
import PopupCharacterInfo from './PopupCharacterInfo';

class CardInfoTable extends React.Component {
    constructor(props){
        super(props);
        this.state = { infoResult : props.infoResult, infoError : props.infoError, hasPopup : props.hasPopup, mouseCharacter : '', mouseX : 0, mouseY : 0 };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { infoResult, infoError, hasPopup } = nextProps;
        if(
            infoResult !== prevState.infoResult ||
            infoError !== prevState.infoError ||
            hasPopup !== prevState.hasPopup
        ) {
            return {
                infoResult : infoResult,
                infoError : infoError,
                hasPopup : hasPopup
            }
        }
        return null;
    }
    
    handleMouseEnter = (mouseCharacter) => {
        this.setState({
            mouseCharacter : mouseCharacter
        });
    }
    
    handleMouseLeave = () => {
        this.setState({
            mouseCharacter : ''
        });
    }

    handleMouseMove = (event) => {
        this.setState({ 
            mouseX : event.clientX, 
            mouseY : event.clientY 
        });
    }

    render(){
        const { infoResult, hasPopup, mouseCharacter, mouseX, mouseY } = this.state;
        var regExp = /[[|\]]/gi;
            const property_color = 
                infoResult && infoResult.property === '스마일' ? 'deeppink' :
                    infoResult && infoResult.property === '퓨어' ? 'limegreen' : 
                        infoResult && infoResult.property === '쿨' ? 'slateblue' : 'black';
        
        let characterPopup = (hasPopup && mouseCharacter !== '') ? <PopupCharacterInfo korName={mouseCharacter} mouseX={mouseX} mouseY={mouseY} /> : null;
        
        return (
            <Table size="sm" bordered>
                <tbody style={{ textAlign : 'center' }}>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white', width : '90px' }}>캐릭터</th>
                        <td className="align-middle">
                            {
                                hasPopup ?
                                    <div id={ hasPopup ? 'info_box' : '' } onMouseEnter={() => this.handleMouseEnter(infoResult && (infoResult.character_name || ''))} onMouseMove={this.handleMouseMove.bind(this)} onMouseLeave={() => this.handleMouseLeave()}>
                                        { infoResult && infoResult.character_name }<br/>
                                        { infoResult && infoResult.japanese_name }
                                        { characterPopup }
                                    </div> :
                                    <div>
                                        { infoResult && infoResult.character_name }<br/>
                                        { infoResult && infoResult.japanese_name }
                                    </div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>특기 이름</th>
                        <td className="align-middle">
                            { infoResult && infoResult.card_title !== '' ? infoResult.card_title.replace(regExp, "") : '미상' }
                        </td>
                    </tr>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>주요 특성</th>
                        <td className="align-middle">
                            <span style={{ color : property_color }}>{ infoResult && infoResult.property }</span>
                        </td>
                    </tr>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>센터 효과</th>
                        <td className="align-middle">
                            { infoResult && infoResult.center_effect }
                        </td>
                    </tr>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>발동 조건</th>
                        <td className="align-middle">
                            { infoResult && infoResult.active_condition }
                        </td>
                    </tr>
                    <tr>
                        <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>특기 종류</th>
                        <td className="align-middle">
                            { infoResult && infoResult.active_skill !== '' ? infoResult.active_skill : '없음' }
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default CardInfoTable;