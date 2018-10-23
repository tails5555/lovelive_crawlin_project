import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon, Badge, Form, ListGroup, ListGroupItem } from 'reactstrap';

import ParallaxStructureView from './ParallaxStructureView';

const CHARACTER_LIST_URL = 'http://127.0.0.1:8000/character_main_infos';

function nGram(s, num){
    let res = []
    let len = s.length - num + 1;
    for(var k=0;k<len;k++){
        let tmp = s.substr(k, num);
        res.push(tmp);
    }
    return res
}

function diffNGram(search, target, num) {
    let searchNGram = nGram(search, num);
    let targetNGram = nGram(target, num);
    let cnt = 0;
    for(var k=0;k<searchNGram.length;k++){
        for(var l=0;l<targetNGram.length;l++){
            if(searchNGram[k] === targetNGram[l])
                cnt += 1;
        }
    }
    return Math.floor((cnt / targetNGram.length) * 100);
}

class CharacterSearchView extends React.Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { characters : [], search_keyword : '' };
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        const { search_keyword } = this.state;
        if(search_keyword !== prevState.search_keyword){
            this._isMounted = true;
            this.characterNameSearching(search_keyword);
        }
    }

    async characterNameSearching(searchKeyword){
        if(searchKeyword.trim() !== '') {
            axios.get(`${CHARACTER_LIST_URL}?search=${searchKeyword}`).then(response => {
                if(this._isMounted){
                    const { results } = response.data;
                    this.setState({
                        characters : results.map(character => {
                            return {
                                id : character.id,
                                name : character.kor_name,
                                similarity : diffNGram(searchKeyword, character.kor_name, 1)
                            }
                        }).sort((character1, character2) => character1.similarity < character2.similarity).slice(0, 5)
                    });
                }
            });
        }
        else {
            this.setState({
                characters : []
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { search_keyword } = this.state;
        if(search_keyword.trim() !== ''){
            this.props.history.push(`/character/list?pg=1&st=${search_keyword}`);
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    handleClickPushToInfoDirect = (character) => {
        this.props.history.push(`/character/info?id=${character.id}&pg=1&st=${character.name}`);
    }

    handleClickSetSearchKeyword = (keyword, event) => {
        this.setState({
            search_keyword : keyword
        });
        document.getElementById("search_keyword").value = keyword;
    }

    render(){
        const { value, characters } = this.state;
        const { handleClickLeft, handleClickRight } = this.props;
        const characterResult = characters.map((character, idx) => { 
            let color = '';
            if(character.similarity >= 80) color = 'success';
            else if(character.similarity >= 60) color = 'primary';
            else if(character.similarity >= 40) color = 'warning';
            else if(character.similarity >= 20) color = 'info';
            else color = '';

            return (
                <ListGroupItem key={`search_result_${idx}`} color={color} onClick={() => this.handleClickSetSearchKeyword(character.name)}>
                    {character.name}
                    <div className="float-right">
                        <Badge pill style={{ cursor : 'pointer' }} onClick={() => this.handleClickPushToInfoDirect(character)}><i className="fas fa-external-link-alt" /></Badge>
                    </div>
                </ListGroupItem>
            );
        });

        return(
            <ParallaxStructureView viewId="character_search_view" handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>캐릭터 이름 검색</h3>
                    <hr/>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <InputGroup>
                            <Input type="text" id="search_keyword" value={value} onChange={this.handleChange.bind(this)} placeholder="캐릭터 이름" autoComplete="off" />
                            <ListGroup 
                                id="character_name_result" 
                                style={
                                    {
                                        position : 'absolute',
                                        width : '100%',
                                        top : '40px'
                                    }
                                }
                            >   
                                {characterResult}
                            </ListGroup>
                            <InputGroupAddon addonType="append">
                                <Button color="primary" type="submit"><i className="fas fa-search" /></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </div>
            </ParallaxStructureView>
        )
    }
}
 
export default withRouter(CharacterSearchView);