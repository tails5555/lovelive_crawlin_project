import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuNavBar} from '../component';
import CardPageListContainer from '../container/CardPageListContainer';

const ApplicationRouter = () => (
    <div>
        <MenuNavBar />
        <Switch>
            <Route exact path="/card/list" component={CardPageListContainer} />
        </Switch>
    </div>
);

export default ApplicationRouter;