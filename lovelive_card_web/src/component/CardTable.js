import React, {Component} from 'react';
import { Table } from 'reactstrap';

class CardTable extends Component {
    componentDidMount(){
        this.props.fetchCardList(234);
    }
    render(){
        return(
            <Table bordered>
                <thead>
                <tr>
                    <th>카드 NO.</th>
                    <th>카드 등급</th>
                    <th>카드 아이콘</th>
                    <th>카드 정보</th>
                    <th>주 특성</th>
                    <th>센터 효과</th>
                    <th>스마일 / 퓨어 / 쿨</th>
                    <th>발동 스킬</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        )
    }
}

export default CardTable;