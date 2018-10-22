import React from 'react';
import { Button, Input, FormGroup, Form } from 'reactstrap';
import ParallaxStructureView from './ParallaxStructureView';
class CharacterSearchView extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { handleClickLeft, handleClickRight } = this.props;
        return(
            <ParallaxStructureView handleClickLeft={handleClickLeft} handleClickRight={handleClickRight}>
                <div className="parallax_box">
                    <h3>캐릭터 이름 검색</h3>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Input></Input>
                        </FormGroup>
                        <Button color="primary"><i className="fas fa-search"/> 검색</Button>
                    </Form>
                </div>
            </ParallaxStructureView>
        )
    }
}
 
export default CharacterSearchView;