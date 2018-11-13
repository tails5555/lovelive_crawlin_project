import React from 'react';
import queryString from 'query-string';
import { Container, Header, Title, Content, Body, Button, Text } from 'native-base';
import { View } from 'react-native';
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

class CardListViewContainerScene extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : '', page : 1 };
    }

    componentDidMount(){
        const { query } = this.state;
        this.props.fetchCardList(query);
    }

    componentWillReceiveProps(nextProps, nextState){
        const { search } = nextProps.location;
        if(search !== ''){
            const queryModel = queryString.parse(search);
            this.setState({
                query : search,
                page : queryModel && (queryModel.pg * 1 || 1)
            });
        }
    }

    componentWillUnmount(){
        this.props.resetFetchCardList();
    }

    handlePressMovePage = (page) => {
        const { history, location } = this.props;
        let queryModel = queryString.parse(location.search);
        queryModel['pg'] = page;
        history.push(`/card/list/_page?${queryString.stringify(queryModel)}`);
    }

    render(){
        const { page } = this.state;
        const { results, count, error } = this.props.cardList;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Love Live Cards</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={{ flexDirection : 'row', justifyContent : 'center' }}>
                    {
                        page !== 1 ?
                            <Button info onPress={() => this.handlePressMovePage(page - 1)}>
                                <Text>이전 페이지로</Text>
                            </Button>
                            : null
                    }
                    </View>
                    <CardListView cardResults={results} cardError={error} />
                    <View style={{ flexDirection : 'row', justifyContent : 'center' }}>
                    {
                        page !== Math.ceil(count / 20) ?
                            <Button info onPress={() => this.handlePressMovePage(page + 1)}>
                                <Text>다음 페이지로</Text>
                            </Button>
                        : null
                    }
                    </View>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CardListViewContainerScene));