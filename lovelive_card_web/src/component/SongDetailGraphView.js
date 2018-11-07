import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap'; 
import {NumericCountingView, RadialBarChartView} from './graph';

const noteFillColor = [
    '#AED6F1', '#85C1E9', '#5DADE2', '#3498DB', '#2E86C1'
];

const destinyFillColor = [
    '#EBDEF0', '#D7BDE2', '#C39BD3', '#AF7AC5', '#9B59B6'
];

class SongDetailGraphView extends React.Component {
    render(){
        return(
            <Fragment>
                <Row>
                    <Col sm={4}>
                        <NumericCountingView iconName={'fas fa-star'} numericValue={10} color="#F5B041" />
                    </Col>
                    <Col sm={4}>
                        <NumericCountingView iconName={'fas fa-heart'} numericValue={20} color="#FF00FF" />
                    </Col>
                    <Col sm={4}>
                        <NumericCountingView iconName={'fas fa-chart-area'} numericValue={90} color="#45B39D" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <RadialBarChartView data={[
                            {name: '이지', value: 2400, fill: '#AED6F1'},
                            {name: '노멀', value: 4567, fill: '#85C1E9'},
                            {name: '하드', value: 1398, fill: '#5DADE2'},
                            {name: 'EX', value: 9800, fill: '#3498DB'},
                            {name: 'Master', value: 3908, fill: '#2E86C1'}
                        ]} />
                    </Col>
                    <Col sm={6}>
                        <RadialBarChartView data={[
                            {name: '이지', value: 2400, fill: '#AED6F1'},
                            {name: '노멀', value: 4567, fill: '#85C1E9'},
                            {name: '하드', value: 1398, fill: '#5DADE2'},
                            {name: 'EX', value: 9800, fill: '#3498DB'},
                            {name: 'Master', value: 3908, fill: '#2E86C1'}
                        ]}/>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default SongDetailGraphView;