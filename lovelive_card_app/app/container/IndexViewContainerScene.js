import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class IndexViewContainerScene extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>WELCOME HOME</Text>
                <Text>WELCOME HOME</Text>
            </View>
        );
    }
}