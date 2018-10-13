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

    render(){
        const { characters } = this.state;
        let characterCards = null;
        if(characters.length > 0){
            characterCards = characters.map(character => (
                <Col sm="4" key={`character_card_${character.id}`} style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <CharacterSmallCard character={character} />
                </Col>
            ))
        }

        return(
            <Row>
                {characterCards}
            </Row>
        )
    }
}

export default CharacterCardList;