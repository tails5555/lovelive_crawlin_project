import React from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import CardPageListContainer from '../container/CardPageListContainer';

const ApplicationRouter = () => (
    <Router>
        <Route exact path="/card/list" component={CardPageListContainer} />
    </Router>
);

export default ApplicationRouter;