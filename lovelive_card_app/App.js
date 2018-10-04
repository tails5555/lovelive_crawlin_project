import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainRootFlux from './app/fluxes/MainRootFlux';
export default class App extends React.Component {
  render() {
    return (
      <MainRootFlux />
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
