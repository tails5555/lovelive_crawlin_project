import React, { Fragment } from 'react';
import { Row, Col, Button, Alert } from 'reactstrap'; 
import { NumericCountingView, RadialBarChartView, BarChartView } from './graph';

const noteFillColor = [
    '#AED6F1', '#85C1E9', '#5DADE2', '#3498DB', '#2E86C1'
];

const destinyFillColor = [
    '#EBDEF0', '#D7BDE2', '#C39BD3', '#AF7AC5', '#9B59B6'
];

class SongDetailGraphView extends React.Component {
    constructor(props){
        super(props);
        this.state = { detailResult : props.detailResult, detailError : props.detailError, difficultyPivot : '이지' };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { detailResult, detailError } = nextProps;
        if(detailResult !== prevState.detailResult ||
            detailError !== prevState.detailError){
            return {
                detailResult : detailResult,
                detailError : detailError
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

    handleClickChangeDifficultyPivot = (difficulty) => {
        this.setState({
            difficultyPivot : difficulty
        })
    }

    render(){
        const { detailResult, detailError, difficultyPivot } = this.state;
        const noteData = detailResult.map((detail, idx) => ({ name : detail.difficulty, value : detail.note_count, fill : noteFillColor[idx] }));
        const destinyData = detailResult.map((detail, idx) => ({ name : detail.difficulty, value : detail.destiny_count, fill : destinyFillColor[idx] })); 
        const difficultyPivotButton = 
            detailResult.map((detail, idx) => 
                <Button color={difficultyPivot === detail.difficulty ? 'primary' : 'secondary'} key={`difficulty_pivot_button_${idx}`} style={{ marginTop : '10px', marginBottom : '10px' }} onClick={() => this.handleClickChangeDifficultyPivot(detail && detail.difficulty)}><i className={difficultyPivot === detail.difficulty ? 'far fa-check-square' : 'far fa-square'} /> {detail && detail.difficulty}</Button>
            );
        const pivotDetail = detailResult.length > 0 ? detailResult.find((detail) => detail.difficulty === difficultyPivot) : null;
        const scoreGraphData = pivotDetail !== null ? 
            [ 
                { name : 'C랭크', score : pivotDetail.c_rank_score },
                { name : 'B랭크', score : pivotDetail.b_rank_score },
                { name : 'A랭크', score : pivotDetail.a_rank_score },
                { name : 'S랭크', score : pivotDetail.s_rank_score }
            ] 
            : []
        const levelDisplayed = pivotDetail && pivotDetail.level_value > 0;
        const expDisplayes = pivotDetail && pivotDetail.exp_value > 0;
        return(
            Array.isArray(detailError) ? 
                <Fragment>
                    <Row>
                        <Col sm={6}>
                            <RadialBarChartView data={noteData} />
                        </Col>
                        <Col sm={6}>
                            <RadialBarChartView data={destinyData}/>
                        </Col>
                    </Row>
                    <div className="d-flex flex-wrap justify-content-around" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        {difficultyPivotButton}
                    </div>
                    <Row className="d-flex flex-wrap justify-content-around" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <Col xs={4}>
                            <NumericCountingView iconName={'fas fa-star'} numericValue={pivotDetail ? pivotDetail.star_count : 0} color="#F5B041" />
                        </Col>
                        {
                            levelDisplayed ? 
                                <Col xs={4}>
                                    <NumericCountingView iconName={'fas fa-heart'} numericValue={pivotDetail ? pivotDetail.level_value : 0} color="#FF00FF" />
                                </Col> : null
                        }
                        {
                            expDisplayes ?
                                <Col xs={4}>
                                    <NumericCountingView iconName={'fas fa-chart-area'} numericValue={pivotDetail ? pivotDetail.exp_value : 0} color="#45B39D" />
                                </Col> : null
                        }
                    </Row>
                    <div id="level_score_bar_chart" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <BarChartView data={scoreGraphData} />
                    </div>
                </Fragment> :
                <Alert color="danger">
                    <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                    <p className="text-center">노래 세부 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                    <p className="text-center">내용은 다음과 같습니다.</p>
                    <hr/>
                    <p className="text-center">{detailError}</p>
                </Alert>
        )
    }
}

export default SongDetailGraphView;