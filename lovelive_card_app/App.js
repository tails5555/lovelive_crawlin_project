import React from 'react';
import { NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import MainRootFlux from './app/fluxes/MainRootFlux';
import configureStore from './app/store/configureStore';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <MainRootFlux />
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
