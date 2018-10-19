import React, { Fragment } from 'react';
import { Media } from 'reactstrap';
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

    render(){
        const { effectResult, effectError } = this.state;
        let effectView =
            effectResult.length > 0 ?
                effectResult.map(effect => (
                    <Media key={`effect_view_${effect.id}`}>
                        <Media left>
                            <div className="circle" id={effect.active_level}><h1>{effect.active_level}</h1></div>
                        </Media>
                        <Media body>
                            <Media heading>
                                <p><b>{effect.active_level} 레벨</b></p>
                            </Media>
                            <p style={{ wordBreak : 'keep-all' }}>{effect.active_context}</p>
                        </Media>
                    </Media>
                )) : null

        return(
            <Fragment>
                {effectView}
            </Fragment>
        ) 
    }
}

export default CardLevelEffects;