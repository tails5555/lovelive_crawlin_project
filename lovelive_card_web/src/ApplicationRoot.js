import React from 'react';
import {ApplicationRouter} from "./router";
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const ApplicationRoot = () => (
    <Provider store={store}>
        <ApplicationRouter />
    </Provider>
);

export default ApplicationRoot;