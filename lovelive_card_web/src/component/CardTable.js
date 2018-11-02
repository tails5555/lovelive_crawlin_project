import React, {Component} from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'; 
import { Table, Button } from 'reactstrap';
import CardBriefInfo from './CardBriefInfo';

class CardTable extends Component {
    constructor(props){
        super(props);
        this.state = { infos : props.infos, sortKey : '' };
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

    handleClickSortPush = (key) => {
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        clientQueryModel['pg'] = 1;
        if(clientQueryModel['ordering'] === key) {
            clientQueryModel['ordering'] = `-${key}`;
        } else {
            clientQueryModel['ordering'] = key;
        }
        this.props.history.push(`/card/list/_page?${queryString.stringify(clientQueryModel)}`);
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        let clientQueryModel = queryString.parse(search);
        this.setState({
            sortKey : clientQueryModel['ordering']
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

    render(){
        let cardTr, noIcon, smileIcon, pureIcon, coolIcon;
        const { infos, sortKey } = this.state;
        
        noIcon = (sortKey === 'no') ? 'fas fa-sort-up' : ((sortKey === '-no') ? 'fas fa-sort-down' : 'fas fa-sort');
        smileIcon = (sortKey === 'smile') ? 'fas fa-sort-up' : ((sortKey === '-smile') ? 'fas fa-sort-down' : 'fas fa-sort');
        pureIcon = (sortKey === 'pure') ? 'fas fa-sort-up' : ((sortKey === '-pure') ? 'fas fa-sort-down' : 'fas fa-sort');
        coolIcon = (sortKey === 'cool') ? 'fas fa-sort-up' : ((sortKey === '-cool') ? 'fas fa-sort-down' : 'fas fa-sort');

        if(infos.length > 0)
            cardTr = infos.map(info => <CardBriefInfo info={info} key={`brief_${info.no}`} />);
        else cardTr = (
            <tr>
                <td className="align-middle" colSpan={8}>
                    <h3>해당 정보에 해당하는 카드가 없습니다. 다시 시도 바랍니다.</h3>
                </td>
            </tr>
        );
        
        return(
            <Table responsive>
                <thead style={{ textAlign : 'center' }}>
                <tr>
                    <th className="align-middle" style={{ width : '5%' }}><Button color="info" onClick={() => this.handleClickSortPush('no')}>NO <i className={noIcon} /></Button></th>
                    <th className="align-middle" style={{ width : '5%' }}>등급</th>
                    <th className="align-middle" style={{ width : '12%' }}>아이콘</th>
                    <th className="align-middle" style={{ width : '23%' }}>정보</th>
                    <th className="align-middle" style={{ width : '10%' }}>특성</th>
                    <th className="align-middle" style={{ width : '10%' }}>센터 효과</th>
                    <th className="align-middle" style={{ width : '20%' }}>
                        <div className="d-flex justify-content-around">
                            <Button style={{ backgroundColor : 'deeppink' }} onClick={() => this.handleClickSortPush('smile')}>Smile <i className={smileIcon} /></Button>
                            <Button style={{ backgroundColor : 'limegreen' }} onClick={() => this.handleClickSortPush('pure')}>Pure <i className={pureIcon} /></Button>
                            <Button style={{ backgroundColor : 'slateblue' }} onClick={() => this.handleClickSortPush('cool')}>Cool <i className={coolIcon} /></Button>
                        </div>
                    </th>
                    <th className="align-middle" style={{ width : '15%' }}>발동 스킬</th>
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

export default withRouter(CardTable);