import React, { Fragment } from 'react';
import { Row, Col, Alert } from 'reactstrap'; 
import { NumericCountingView, BarChartView } from './graph';

class EventScoreChartView extends React.Component {
    constructor(props){
        super(props);
        this.state = { infoResult : props.infoResult, infoError : props.infoError };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { infoResult, infoError } = nextProps;
        if(infoResult !== prevState.infoResult ||
            infoError !== prevState.infoError){
            return {
                infoResult : infoResult,
                infoError : infoError
            };
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

    render(){
        const { infoResult, infoError } = this.state;
    
        const scoreGraphData = [ 
            { name : '앨범 컷', score : infoResult && infoResult.album_cut_score },
            { name : '각성 컷', score : infoResult && infoResult.wake_up_cut_score },
            { name : '스킬 컷', score : infoResult && infoResult.skill_cut_score }
        ].filter((data) => data.score !== 0);
        
        return(
            !infoError ? 
                <Fragment>
                    <Row className="d-flex flex-wrap justify-content-around" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <Col xs={12} sm={4}>
                            <NumericCountingView iconName={'fas fa-award'} numericValue={infoResult ? infoResult.first_cut_score : 0} color="#F4D03F" unit="pt" />
                        </Col>
                        <Col xs={6} sm={4}>
                            <NumericCountingView iconName={'fas fa-leaf'} numericValue={infoResult ? infoResult.wake_up_pivot_rank : 0} color="#58D68D" unit="위" />
                        </Col>
                        <Col xs={6} sm={4}>
                            <NumericCountingView iconName={'fas fa-spa'} numericValue={infoResult ? infoResult.skill_pivot_rank : 0} color="#F1948A" unit="위" />
                        </Col>
                    </Row>
                    <div id="level_score_bar_chart" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <BarChartView data={scoreGraphData} />
                    </div>
                </Fragment> :
                <Alert color="danger">
                    <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                    <p className="text-center">이벤트 세부 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                    <p className="text-center">내용은 다음과 같습니다.</p>
                    <hr/>
                    <p className="text-center">{infoError}</p>
                </Alert>
        )
    }
}

export default EventScoreChartView;