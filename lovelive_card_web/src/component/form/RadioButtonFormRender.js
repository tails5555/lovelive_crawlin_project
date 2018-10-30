import React from 'react';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';

const RadioButtonFormRender = ({ input, label, children }) => (
    <Row>
        <Label for={input.name} sm={2}>{label}</Label>
        <Col sm={10}>
        {
            children.map((obj, idx) => 
                <FormGroup check inline key={`${input.name}_radio_button_${idx}`} style={{ paddingTop : '9px'}}>
                    <Label check style={{ marginRight : '5px' }}>
                        <Input 
                            type="radio" 
                            name={input.name} 
                            value={obj.value}
                            checked={obj.value === input.value}
                            onChange={event => {
                                const newValue = obj.value;
                                if(event.target.checked)
                                    return input.onChange(newValue);
                            }}
                        /> {obj.label}
                    </Label>
                </FormGroup>
            )
        }
        </Col>
    </Row>
);


export default RadioButtonFormRender;