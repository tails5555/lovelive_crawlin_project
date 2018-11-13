import React from 'react';
import { List } from 'native-base';
import CardItemElement from './CardItemElement';

export default class CardListView extends React.Component {
    constructor(props){
        super(props);
        this.state = { cardResults : props.cardResults, cardError : props.cardError };
    }

    componentWillReceiveProps(nextProps, nextState){
        const { cardResults, cardError } = this.state;
        if(nextProps.cardResults !== cardResults || nextProps.cardError !== cardError) {
            this.setState({
                cardResults : nextProps.cardResults,
                cardError : nextProps.cardError
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

    render() {
        const { cardResults, cardError } = this.state;
        const cardItems = 
            cardResults && cardResults.length > 0 ?
                cardResults.map((card, idx) => <CardItemElement key={`card_item_element_${idx}`} cardInfo={card} />) : null;

        return(
            <List>
                {cardItems}
            </List>
        )
    }
}