import React, {Component} from 'react';

import { Actions, Router, Scene } from 'react-native-router-flux';

import { IndexView, RegisterView } from '../component/index_scene';

const MainRootFlux = () => (
    <Router>
        <Scene key="home">
            <Scene key="index" component={IndexView} title="HOME" />
            <Scene key="register" component={RegisterView} title="REGISTER" />
        </Scene>
    </Router>
);

export default MainRootFlux;