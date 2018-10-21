import React, { Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuNavBar} from '../component';
import CardPageListContainer from '../container/CardPageListContainer';
import CharacterCardListContainer from '../container/CharacterCardListContainer';
import CharacterInfoViewContainer from '../container/CharacterInfoViewContainer';
import CardInfoViewContainer from '../container/CardInfoViewContainer';
import NotFoundContainer from '../container/NotFoundContainer';
import ServiceCheckingContainer from '../container/ServiceCheckingContainer';
import IndexViewContainer from '../container/IndexViewContainer';

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
                    <Route exact path="/card/info" component={CardInfoViewContainer} />
                    <Route exact path="/character/list" component={CharacterCardListContainer} />
                    <Route exact path="/character/info" component={CharacterInfoViewContainer} />
                    <Route component={NotFoundContainer} />
                </Switch>
            );
        }
        
        return (
            <Fragment>
                <MenuNavBar />
                {router}
            </Fragment>
        )
    }
}

export default ApplicationRouter;