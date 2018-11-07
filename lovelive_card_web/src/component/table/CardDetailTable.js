import React from 'react';
import { Table } from 'reactstrap';

const CardDetailTable = (props) => {
    const { detailResult } = props;
    return (
        <Table bordered size="sm">
            <tbody style={{ 
                textAlign : 'center'
            }}>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'deeppink', color : 'white' }}>센터 효과</th>
                    <td className="align-middle" colSpan={4}>{detailResult && detailResult.main_effect !== '' ? detailResult.main_effect : '미상'}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '100px', backgroundColor : 'deeppink', color : 'white' }}>추가 효과</th>
                    <td className="align-middle" colSpan={4} style={{ wordBreak : 'keep-all' }}>{detailResult && detailResult.plus_effect !== '' ? detailResult.plus_effect : '미상'}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }} colSpan={5}>능력치 효과</th>
                </tr>
                <tr>
                    <th className="align-middle" style={{ width : '30px', backgroundColor : 'deeppink' }}></th>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>스마일</th>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>퓨어</th>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>쿨</th>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>HP</th>
                </tr>
                <tr>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>기본</th>
                    <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.basic_smile}</span></td>
                    <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.basic_pure}</span></td>
                    <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.basic_cool}</span></td>
                    <td className="align-middle">{detailResult && detailResult.basic_hp}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>만렙</th>
                    <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.full_smile}</span></td>
                    <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.full_pure}</span></td>
                    <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.full_cool}</span></td>
                    <td className="align-middle">{detailResult && detailResult.full_hp}</td>
                </tr>
                <tr>
                    <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>각성</th>
                    <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.wake_up_smile}</span></td>
                    <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.wake_up_pure}</span></td>
                    <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.wake_up_cool}</span></td>
                    <td className="align-middle">{detailResult && detailResult.wake_up_hp}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default CardDetailTable;