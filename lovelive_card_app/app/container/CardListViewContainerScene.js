import React from 'react';
import queryString from 'query-string';
import { Container, Header, Title, Content, Body, Button, Text, Item, Picker } from 'native-base';
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
        const { search } = props.location;
        this.state = { query : search, page : 1 };
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

    shouldComponentUpdate(nextProps, nextState){
        for (let stateKey in this.state) {
            if(this.state[stateKey] !== nextState[stateKey]){
                return true;
            }
        }
        for (let propsKey in this.props) {
            if(this.props[propsKey] !== nextProps[propsKey]) {
                return true;
            }
        }
        return false;
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

    handleChangePage = (tmpPage) => {
        const { history, location } = this.props;
        const { page } = this.state;
        if(tmpPage !== page){
            let queryModel = queryString.parse(location.search);
            queryModel['pg'] = tmpPage;
            history.push(`/card/list/_page?${queryString.stringify(queryModel)}`);
        }
    }

    render(){
        const { page } = this.state;
        const { results, count, error } = this.props.cardList;
        const pageCount = count !== 0 ? Math.ceil(count / 20) : 1;
        let pageNumbers = Array.from({length: pageCount}, (v, idx) => idx + 1);

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Love Live Cards</Title>
                    </Body>
                </Header>
                <Content>
                    <CardListView cardResults={results} cardError={error} />
                    <View style={{ flexDirection : 'row', justifyContent : 'space-around', margin : 5 }}>
                        {
                            page !== 1 ?
                                <Button info onPress={() => this.handlePressMovePage(page - 1)}>
                                    <Text>이전 페이지로</Text>
                                </Button>
                                : null
                        }
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                style={{ width : 150 }}
                                placeholder="Page"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={page}
                                onValueChange={(value) => this.handleChangePage(value)}
                            >
                                {
                                    pageNumbers.map(value => <Picker.Item label={`${value} 페이지`} value={value} />)
                                }
                            </Picker>
                        </Item>
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