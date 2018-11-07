import React from 'react';
import CountUp from 'react-countup';

const NumericCountingView = (props) => {
    const { iconName, numericValue, color } = props;
    return(
        <div className="text-center" style={{ color : color }}>
            <h1><i className={iconName} /></h1>
            <h2><CountUp end={ numericValue } duration={5} /></h2>
        </div>
    )
};

export default NumericCountingView;