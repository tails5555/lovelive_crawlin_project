import React from 'react';
import { Container, Header, Title, Content, Body } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';

import { fetchCardInfosByQuery, fetchCardInfosByQuerySuccess, fetchCardInfosByQueryFailure, resetFetchCardInfosByQuery } from '../action/action_card_info';

import { CardListView } from '../component';

const mapStateToProps = (state) => {
    return {
        cardList : state.card_info.cardList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCardList : (clientQS) => dispatch(fetchCardInfosByQuery(clientQS)).then(response => {
            if(!response.error)
                dispatch(fetchCardInfosByQuerySuccess(response.payload));
            }).catch(error => {
                if(error && error.response){
                    const { status, data } = error.response;
                    if(status !== 200)
                        dispatch(fetchCardInfosByQueryFailure(data));
                }
            }),
        resetFetchCardList : () => dispatch(resetFetchCardInfosByQuery())
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

class CardListViewContainerScene extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : '' };
    }

    componentDidMount(){
        const { query } = this.state;
        this.props.fetchCardList(query);
    }

    componentWillReceiveProps(nextProps, nextState){
        const { search } = nextProps.history.location;
        if(search !== ''){
            this.setState({
                query : search
            });
        }
    }

    render(){
        const { results, count, error } = this.props.cardList;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Love Live Cards</Title>
                    </Body>
                </Header>
                <Content>
                    <CardListView cardResults={results} cardError={error} />
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardListViewContainerScene));