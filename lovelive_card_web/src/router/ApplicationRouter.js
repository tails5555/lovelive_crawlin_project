import React, { Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import {MenuNavBar} from '../component';
import CardPageListContainer from '../container/CardPageListContainer';
import CharacterCardListContainer from '../container/CharacterCardListContainer';
import CharacterInfoViewContainer from '../container/CharacterInfoViewContainer';
import CardInfoViewContainer from '../container/CardInfoViewContainer';

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
            router = <Route path="*" render={ () => <p>{currentTime.toLocaleTimeString()} Crawling 서버 점검 시간 입니다.</p> } />;
        } else {
            router = (
                <Switch>
                    <Route exact path="/card/list" component={CardPageListContainer} />
                    <Route exact path="/card/info" component={CardInfoViewContainer} />
                    <Route exact path="/character/list" component={CharacterCardListContainer} />
                    <Route exact path="/character/info" component={CharacterInfoViewContainer} />
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