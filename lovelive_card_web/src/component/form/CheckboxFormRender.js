import React from 'react';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';

const CheckboxFormRender = ({ input, label, children }) => (
    <Row>
        <Label for={input.name} sm={2}>{label}</Label>
        <Col sm={10}>
        {
            children.map((obj, idx) => 
                <FormGroup check inline key={`${input.name}_checkbox_${idx}`} style={{ paddingTop : '9px'}}>
                    <Label check style={{ marginRight : '5px' }}>
                        <Input 
                            type="checkbox" 
                            name={input.name} 
                            value={obj.value}
                            checked={input.value.indexOf(obj.value) !== -1}
                            onChange={event => {
                                const newValue = [...input.value];
                                if(event.target.checked) {
                                    newValue.push(obj.value);
                                } else {
                                    newValue.splice(newValue.indexOf(obj.value), 1);
                                }
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


export default CheckboxFormRender;