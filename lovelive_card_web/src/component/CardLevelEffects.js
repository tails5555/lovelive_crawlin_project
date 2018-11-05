import React, { Fragment } from 'react';
import CountUp from 'react-countup';
import { ListGroup, ListGroupItem, Badge, Progress, Alert } from 'reactstrap';
import './style/level_effect_circle.css';

class CardLevelEffects extends React.Component {
    constructor(props){
        super(props);
        this.state = { effectResult : props.effectResult, effectError : props.effectError };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { effectResult, effectError } = nextProps;
        if(
            effectResult !== prevState.effectResult ||
            effectError !== prevState.effectError
        ) {
            return {
                effectResult : effectResult,
                effectError : effectError
            }
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
        const { effectResult, effectError } = this.state;
     
        const numList = effectResult.map(effect => effect.active_context.replace(/[^0-9.]/g, ' ').split(/(\s+)/).filter(context => context.trim() !== ''));
        let effectView =
            Array.isArray(effectError) && effectResult.length > 0 ?
                effectResult.map((effect, idx) => (
                    <ListGroupItem key={`effect_view_${effect.id}`} className="justify-content-between">
                        <Badge id={`color_${effect.active_level}`}>{effect.active_level} 레벨</Badge><br/>
                        {effect.active_context}
                        {
                            numList.length === 8 ?
                            <Progress animated color="info" bar value={ numList[idx].length > 2 ? numList[idx][1] : 0 } max={100}><CountUp end={ numList[idx].length > 2 ? numList[idx][1] * 1 : 0 } duration={10} suffix="%" /></Progress>
                                : null
                        }
                    </ListGroupItem>
                )) : 
                (
                    <Alert color="danger">
                        <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                        <p className="text-center">카드 효과 수치를 불러오는 도중 에러가 발생 했습니다.</p>
                        <p className="text-center">내용은 다음과 같습니다.</p>
                        <hr/>
                        <p className="text-center">{effectError}</p>
                    </Alert>
                )

        return(
            <Fragment>
                <ListGroup>
                    {effectView}
                </ListGroup>
            </Fragment>
        ) 
    }
}

export default CardLevelEffects;