import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardListViewContainerScene = () => (
    <View style={styles.container}>
        <Text>WELCOME TO Card List</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CardListViewContainerScene;