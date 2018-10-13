import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuNavBar} from '../component';
import CardPageListContainer from '../container/CardPageListContainer';
import CharacterCardListContainer from '../container/CharacterCardListContainer';
import CharacterInfoViewContainer from '../container/CharacterInfoViewContainer';

const ApplicationRouter = () => (
    <div>
        <MenuNavBar />
        <Switch>
            <Route exact path="/card/list" component={CardPageListContainer} />
            <Route exact path="/character/list" component={CharacterCardListContainer} />
            <Route exact path="/character/info" component={CharacterInfoViewContainer} />
        </Switch>
    </div>
);

export default ApplicationRouter;