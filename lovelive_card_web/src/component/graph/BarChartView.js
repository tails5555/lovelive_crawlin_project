import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const BarChartView = (props) => {
    const { data } = props;
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="4 4"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip />
                <Legend iconSize={10} layout='horizontal' iconType="square" verticalAlign='bottom' align="center" />
                <Bar dataKey="score" barSize={40} fill="#F06292" label={{ position: 'top' }} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartView;