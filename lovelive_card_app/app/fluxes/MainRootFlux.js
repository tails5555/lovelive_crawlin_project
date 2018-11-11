import React from 'react';

import { Router, Scene } from 'react-native-router-flux';

import CardListViewContainerScene from '../container/CardListViewContainerScene';

const MainRootFlux = () => (
    <Router>
        <Scene key="home">
            <Scene key="card_list" component={CardListViewContainerScene} title="카드 목록 조회" />
        </Scene>
    </Router>
);

export default MainRootFlux;