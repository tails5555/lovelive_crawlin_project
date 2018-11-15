import React from 'react';
import CountUp from 'react-countup';

const NumericCountingView = (props) => {
    const { iconName, numericValue, color, unit } = props;
    return(
        <div className="text-center" style={{ color : color, textShadow : '1px 1px 1px #000000' }}>
            <h1><i className={iconName} /></h1>
            <h2><CountUp end={ numericValue } duration={5} suffix={unit !== undefined ? unit : ''}/></h2>
        </div>
    )
};

export default NumericCountingView;