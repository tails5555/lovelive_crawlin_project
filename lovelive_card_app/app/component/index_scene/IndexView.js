import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class IndexView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WELCOME TO MY HOME</Text>
        <Button large title="MOVING TO REGISTER" color="#000" onPress={() => Actions.push("register")} />
      </View>
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
