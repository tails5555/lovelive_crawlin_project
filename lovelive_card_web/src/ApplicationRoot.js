import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApplicationRouter} from "./router";
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const ApplicationRoot = () => (
    <Provider store={store}>
        <Router>
            <ApplicationRouter />
        </Router>
    </Provider>
);

export default ApplicationRoot;