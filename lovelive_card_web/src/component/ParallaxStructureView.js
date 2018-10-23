import React from 'react';
import { Button } from 'reactstrap';
import './style/parallax_view.css';

const leftButtonStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'left'
};

const rightButtonStyle = {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'right'
};

const ParallaxStructureView = (props) => {
    const { viewId, handleClickLeft, handleClickRight } = props;
    return (
        <div className="background_view" id={viewId}>
            <div style={leftButtonStyle}>
                <Button color="info" onClick={() => handleClickLeft()}><i className="fas fa-chevron-left" /></Button>
            </div>
            <div className="parallax_middle_box">
                {props.children}
            </div>
            <div style={rightButtonStyle}>
                <Button color="info" onClick={() => handleClickRight()}><i className="fas fa-chevron-right" /></Button>
            </div>
        </div>
    );
}

export default ParallaxStructureView;