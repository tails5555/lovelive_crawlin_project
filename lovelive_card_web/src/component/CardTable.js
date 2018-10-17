import React, {Component} from 'react';
import { Table } from 'reactstrap';
import CardBriefInfo from './CardBriefInfo';

class CardTable extends Component {
    constructor(props){
        super(props);
        this.state = { infos : props.infos };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        const { infos } = nextProps;
        if(infos !== prevState.infos){
            return {
                infos : infos
            };
        }
        return null;
    }

    render(){
        let cardTr;
        const { infos } = this.state;
        if(infos.length > 0)
            cardTr = infos.map(info => <CardBriefInfo info={info} key={`brief_${info.no}`} />);
        else cardTr = null;
        
        return(
            <Table>
                <thead style={{ textAlign : 'center' }}>
                <tr>
                    <th style={{ width : '5%' }}>#</th>
                    <th style={{ width : '5%' }}>등급</th>
                    <th style={{ width : '12%' }}>아이콘</th>
                    <th style={{ width : '23%' }}>정보</th>
                    <th style={{ width : '10%' }}>특성</th>
                    <th style={{ width : '10%' }}>센터 효과</th>
                    <th style={{ width : '20%' }}>
                        <div className="d-flex justify-content-around">
                            <span style={{color : 'deeppink'}}>Smile&nbsp;</span>
                            <span style={{color : 'limegreen'}}>Pure&nbsp;</span>
                            <span style={{color : 'slateblue'}}>Cool</span>
                        </div>
                    </th>
                    <th style={{ width : '15%' }}>발동 스킬</th>
                </tr>
                </thead>
                <tbody
                    style={{ 
                        textAlign : 'center',
                        verticalAlign : 'center' 
                    }}
                >
                    {cardTr}
                </tbody>
            </Table>
        )
    }
}

export default CardTable;