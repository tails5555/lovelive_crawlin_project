import React from 'react';

import { Container } from 'reactstrap';
import { DevelopProfileInfo } from '../component';

const DevelopInfoViewContainer = () => (
    <div id="develop_info" style={{ padding : '20px' }}>
        <Container>
            <div className="d-flex align-items-center">
                <DevelopProfileInfo />
            </div>
        </Container>
    </div>
);

export default DevelopInfoViewContainer;