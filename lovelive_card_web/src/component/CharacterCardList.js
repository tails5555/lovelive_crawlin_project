import React from 'react';
import { Row, Col } from 'reactstrap';
import CharacterSmallCard from './CharacterSmallCard';
class CharacterCardList extends React.Component {
    constructor(props){
        super(props);
        this.state = { characters : props.characters }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { characters } = nextProps;
        if(characters !== prevState.characters){
            return {
                characters : characters
            };
        }
        return null;
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

    render(){
        const { characters } = this.state;
        let characterCards = null;
        if(characters.length > 0){
            characterCards = characters.map(character => (
                <Col sm={6} md={4} key={`character_card_${character.id}`} style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterSmallCard character={character} />
                </Col>
            ))
        }

        return(
            <Row className="justify-content-around">
                {characterCards}
            </Row>
        )
    }
}

export default CharacterCardList;