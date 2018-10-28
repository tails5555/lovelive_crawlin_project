import React from 'react';

import {ServiceCheckingInfo} from '../component';

import './style/background_view.css';

const ServiceCheckingContainer = () => (
    <div className="background_view" id="error_check">
        <div className="d-flex justify-content-center" style={{ height : window.innerHeight }}>
            <ServiceCheckingInfo />
        </div>
    </div>
)

export default ServiceCheckingContainer;