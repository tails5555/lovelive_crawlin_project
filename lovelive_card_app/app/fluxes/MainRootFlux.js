import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { Route, Switch, Redirect } from 'react-router-native';
import Expo from 'expo'

import IndexViewContainerScene from '../container/IndexViewContainerScene';
import CardListViewContainerScene from '../container/CardListViewContainerScene';
import { BottomNavbarMenu } from '../component';

export default class MainRootFlux extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.setState({ loading: false });
    }

    render(){
        const { loading } = this.state;
        if (loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Container>
                <Switch>
                    <Route exact path="/" component={IndexViewContainerScene} />
                    <Route exact path="/card/list" component={CardListViewContainerScene} />
                    <Route exact path="/card/list/_page" render={({ location }) => <Redirect to={`/card/list${location.search}`} />} />
                </Switch>
                <BottomNavbarMenu />
            </Container>
        );
    }
}