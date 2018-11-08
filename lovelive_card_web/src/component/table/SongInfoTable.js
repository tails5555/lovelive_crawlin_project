import React from 'react';
import { Table } from 'reactstrap';
const SongInfoTable = (props) => {
    const { infoResult } = props;
    const property_color = 
            infoResult && infoResult.property === '스마일' ? 'deeppink' :
                infoResult && infoResult.property === '퓨어' ? 'limegreen' : 
                    infoResult && infoResult.property === '쿨' ? 'slateblue' : 'black';

    return (
        <Table bordered size="sm">
            <tbody style={{ 
                textAlign : 'center'
            }}>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>한국어 제목</th>
                    <td className="align-middle">{infoResult && infoResult.kor_title}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>일본어 제목</th>
                    <td className="align-middle">{infoResult && infoResult.jap_title}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>노래 종류</th>
                    <td className="align-middle">{infoResult && infoResult.type}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>특성</th>
                    <td className="align-middle" style={{ color : property_color }}>{infoResult && infoResult.property}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>Unlock 레벨</th>
                    <td className="align-middle">{infoResult && infoResult.unlock_level !== 0 ? 'Lv.' + infoResult.unlock_level : '해당 없음'}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'springgreen' }}>Unlock 조건</th>
                    <td className="align-middle">{infoResult && infoResult.unlock_condition !== '' ? infoResult.unlock_condition : '미상'}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default SongInfoTable;