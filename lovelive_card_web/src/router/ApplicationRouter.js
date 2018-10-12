import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuNavBar} from '../component';
import CardPageListContainer from '../container/CardPageListContainer';
import CharacterCardListContainer from '../container/CharacterCardListContainer';

const ApplicationRouter = () => (
    <div>
        <MenuNavBar />
        <Switch>
            <Route exact path="/card/list" component={CardPageListContainer} />
            <Route exact path="/character/list" component={CharacterCardListContainer} />
        </Switch>
    </div>
);

export default ApplicationRouter;