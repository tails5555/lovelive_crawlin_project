import React, { Fragment } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {MenuNavBar} from '../component';
import {
    CardPageListContainer, CardInfoViewContainer, CharacterCardListContainer, CharacterInfoViewContainer,
    NotFoundContainer, ServiceCheckingContainer, DevelopInfoViewContainer, IndexViewContainer,
    SongCardListContainer, SongInfoViewContainer, EventPageListContainer, EventInfoViewContainer
} from '../container';

import SlideAnotherView from './SlideAnotherView';

class ApplicationRouter extends React.Component {
    constructor(props){
        super(props);
        this.state = { currentTime : new Date() }
    }

    componentDidMount(){
        this.interval = setInterval(() => this.setState({ currentTime : new Date() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const { currentTime } = this.state;
        const hour = currentTime.getHours();
        
        let router = null;
        if(hour >= 1 && hour < 3){
            router = <Route component={ServiceCheckingContainer} />;
        } else {
            router = (
                <Switch>
                    <Route exact path="/" component={IndexViewContainer} />
                    <Route exact path="/card/list" component={CardPageListContainer} />
                    <Route exact path="/card/list/_page" render={({ location }) => <Redirect to={`/card/list${location.search}`} />} />
                    <Route exact path="/card/info" component={CardInfoViewContainer} />
                    <Route exact path="/character/list" component={CharacterCardListContainer} />
                    <Route exact path="/character/list/_page" render={({ location }) => <Redirect to={`/character/list${location.search}`} />} />
                    <Route exact path="/character/info" component={CharacterInfoViewContainer} />
                    <Route exact path="/song/list" component={SongCardListContainer} />
                    <Route exact path="/song/list/_page" render={({ location }) => <Redirect to={`/song/list${location.search}`} />} />
                    <Route exact path="/song/info" component={SongInfoViewContainer} />
                    <Route exact path="/event/list" component={EventPageListContainer} />
                    <Route exact path="/event/list/_page" render={({ location }) => <Redirect to={`/event/list${location.search}`} />} />
                    <Route exact path="/event/info" component={EventInfoViewContainer} />
                    <Route exact path="/develop/info" component={DevelopInfoViewContainer} />
                    <Route component={NotFoundContainer} />
                </Switch>
            );
        }
        
        return (
            <Fragment>
                <SlideAnotherView>
                    <MenuNavBar />
                    {router}
                </SlideAnotherView>
            </Fragment>
        )
    }
}

export default ApplicationRouter;