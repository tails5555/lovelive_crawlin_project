import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Input, FormGroup, Form, ListGroup, ListGroupItem } from 'reactstrap';

import ParallaxStructureView from './ParallaxStructureView';

const CHARACTER_LIST_URL = 'http://127.0.0.1:8000/character_main_infos';

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
                            }
                        })
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
        })
    }

    handleClickPushToInfoDirect = (character) => {
        this.props.history.push(`/character/info?id=${character.id}&pg=1&st=${character.name}`);
    }

    render(){
        const { value, characters } = this.state;
        const { handleClickLeft, handleClickRight } = this.props;
        const characterResult = characters.map((character, idx) => <ListGroupItem key={`search_result_${idx}`} onClick={() => this.handleClickPushToInfoDirect(character)} style={{ cursor : 'pointer',  }}>{character.name}</ListGroupItem>);

        return(
            <ParallaxStructureView handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>캐릭터 이름 검색</h3>
                    <hr/>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup>
                            <Input type="text" id="search_keyword" value={value} onChange={this.handleChange.bind(this)}></Input>
                        </FormGroup>
                        <ListGroup id="character_name_result">
                            {characterResult}
                        </ListGroup>
                        <div id="button_group" style={{ margin : '10px' }}>
                            <Button color="primary" type="submit"><i className="fas fa-search"/> 검색</Button>
                        </div>
                    </Form>
                </div>
            </ParallaxStructureView>
        )
    }
}
 
export default withRouter(CharacterSearchView);