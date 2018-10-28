import React from 'react';

import {NotFoundInfo} from '../component';

import './style/background_view.css';

const NotFoundContainer = () => (
    <div className="background_view" id="error_check">
        <div className="d-flex justify-content-center" style={{ height : window.innerHeight }}>
            <NotFoundInfo />
        </div>
    </div>
);

export default NotFoundContainer;