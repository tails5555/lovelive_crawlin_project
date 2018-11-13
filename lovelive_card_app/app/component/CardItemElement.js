import React, { Fragment } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Separator, Icon } from 'native-base';

const IMAGE_ICON_URL = 'http://10.0.2.2:8000/card_icons/';

const style = {
    info_detail : {
        margin : 3,
        justifyContent : 'space-around',
        flexDirection : 'row'
    },
    info_text : {
        margin : 3,
        justifyContent : 'center',
        flexDirection : 'column'
    }
}

export default class CardItemElement extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { cardInfo : props.cardInfo, cardIcons : [], iconError : null };
    }

    componentDidMount(){
        const { cardInfo } = this.state;
        const infoNo = cardInfo && (cardInfo.no || 0);
        this._isMounted = true;
        if(this._isMounted && infoNo !== 0){
            this.getIconImages(infoNo);
        }
    }

    async getIconImages(infoNo) {
        axios({
            url : `${IMAGE_ICON_URL}?info=${infoNo}`,
            method : 'get'
        }).then(response => {
            const { data } = response;
            const images = data.map(d => d.img_file);
            if(this._isMounted)
                this.setState({
                    cardIcons : images
                });
        }).catch(error => this.setState({ iconError : '서버에서 아이콘 호출 중 오류가 발생했습니다.' }));
    }

    componentWillReceiveProps(nextProps, nextState){
        const { cardInfo } = this.state;
        if(nextProps.cardInfo !== cardInfo){
            this.setState({
                cardInfo : nextProps.cardInfo
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
        this._isMounted = false;
    }

    render(){
        const { cardInfo, cardIcons } = this.state;

        return(
            <Fragment>
                <Separator style={{ flexDirection : 'row', alignItems : 'center' }}>
                    <Icon style={{ fontSize : 15 }} type="FontAwesome" name="level-down" />    
                    <Text style={{ fontSize : 15 }}> {cardInfo && (cardInfo.card_title || '-')}</Text>
                </Separator>
                <ListItem thumbnail last>
                    <Left>
                        {
                            cardIcons.length > 0 ?
                                cardIcons.map((icon, idx) => <Thumbnail square key={`card_icon_${cardInfo && (cardInfo.no || 0)}_${idx}`} source={{ 'uri' : icon }} />) : null
                        }
                    </Left>
                    <Body>
                        <View>
                            <Text>{cardInfo && cardInfo.character_name} / { cardInfo && cardInfo.rank }</Text>
                            <Text note>{cardInfo && cardInfo.japanese_name}</Text>
                            <Text note>{ cardInfo && cardInfo.property } / { cardInfo && cardInfo.active_condition } / { cardInfo && cardInfo.active_skill }</Text>
                        </View>
                        <View style={ style.info_detail }>
                            <Badge style={{ backgroundColor: 'deeppink' }}>
                                <Text style={{ color: 'white' }}>{ cardInfo && cardInfo.smile }</Text>
                            </Badge>
                            <Badge style={{ backgroundColor: 'limegreen' }}>
                                <Text style={{ color: 'white' }}>{ cardInfo && cardInfo.pure }</Text>
                            </Badge>
                            <Badge style={{ backgroundColor: 'slateblue' }}>
                                <Text style={{ color: 'white' }}>{ cardInfo && cardInfo.cool }</Text>
                            </Badge>
                        </View>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text>View</Text>
                        </Button>
                    </Right>
                </ListItem>
            </Fragment>
        )
    }
}