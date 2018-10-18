import React from 'react';
import { Table } from 'reactstrap';

const CardInfoTable = (props) => {
    const { infoResult } = props;
    var regExp = /[[|\]]/gi;
        const property_color = 
            infoResult && infoResult.property === '스마일' ? 'deeppink' :
                infoResult && infoResult.property === '퓨어' ? 'limegreen' : 
                    infoResult && infoResult.property === '쿨' ? 'slateblue' : 'black';
    return (
        <Table size="sm" bordered>
            <tbody style={{ textAlign : 'center' }}>
                <tr>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white', width : '90px' }}>캐릭터</th>
                    <td className="align-middle">
                        { infoResult && infoResult.character_name }<br/>
                        { infoResult && infoResult.japanese_name }
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

export default CardInfoTable;