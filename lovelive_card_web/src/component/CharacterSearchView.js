import React from 'react';
import './style/search_view.css';
import { Button, Input, FormGroup, Form } from 'reactstrap';

class CharacterSearchView extends React.Component {
    render(){
        const { handleClick } = this.props;
        return(
            <div id="character_search_view" className="background_view">
                <div className="search_middle_view">
                    <div className="search_middle_box">
                        <h2>캐릭터 이름 검색</h2>
                        <hr/>
                        <Form>
                            <FormGroup>
                                <Input></Input>
                            </FormGroup>
                            <Button onClick={() => handleClick()} color="info">다음 페이지로</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default CharacterSearchView;