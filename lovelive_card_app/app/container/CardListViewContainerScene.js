import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';

import { fetchCardInfosByQuery, fetchCardInfosByQuerySuccess, fetchCardInfosByQueryFailure, resetFetchCardInfosByQuery } from '../action/action_card_info';

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
    }
    componentDidMount(){
        console.log(this.props.history);
    }
    render(){
        return (
            <Container>
                <Text>WELCOME TO Card List</Text>
                <Text>WELCOME TO Card List</Text>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardListViewContainerScene));