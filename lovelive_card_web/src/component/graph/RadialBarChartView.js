import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const TooltipCustom = (props) => {
    const { payload } = props;
    if(payload.length > 0){
        const { name, value, fill } = payload[0].payload;
        return(
            <div style={{ backgroundColor : 'white', border : '1px solid #666', padding : '10px' }}>
                <span style={{color : fill}}>{name}</span> / <span>{value}</span>
            </div>
        );
    } else {
        return null;
    }
}
const RadialBarChartView = (props) => {
    const { data } = props;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={data} startAngle={0} endAngle={270}>
                <RadialBar minAngle={20} label={{ fill: '#666', position: 'insideStart' }} clockWise={true} background dataKey="value" />
                <Legend iconSize={10} layout='horizontal' iconType="star" verticalAlign='bottom' align="center" />
                <Tooltip content={<TooltipCustom />} />
            </RadialBarChart>
        </ResponsiveContainer>
    );
}

export default RadialBarChartView;