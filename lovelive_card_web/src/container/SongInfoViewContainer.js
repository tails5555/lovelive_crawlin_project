import React from 'react';
import { Container } from 'reactstrap';
import {SongDetailGraphView} from '../component';

import './style/background_view.css';

class SongInfoViewContainer extends React.Component {
    render(){
        return(
            <div className="background_view" id="song_info">
                <Container style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
                    <div id="song_detail_graph_view" style={{ marginTop : '10px', marginBottom : '10px' }}>
                        <SongDetailGraphView />
                    </div>
                </Container>
            </div>
        );
    }
}

export default SongInfoViewContainer;