import React from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import CardTableContainer from '../container/CardTableContainer';

const ApplicationRouter = () => (
    <Router>
        <Route exact path="/" render={() => <CardTableContainer />} />
    </Router>
);

export default ApplicationRouter;