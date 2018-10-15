import React from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, Col } from 'reactstrap';

const TextFormRender = ({ input, label, placeholder, type, meta: { touched, error, warning }, ...custom }) => (
    <FormGroup row>
        <Label for={input.name} sm={2}>{label}</Label>
        <Col sm={10}>
            <Input type={type} {...(touched ? { valid: !error } : {})} {...input} placeholder={placeholder} />
            {error && <FormFeedback>{error}</FormFeedback>}
            {!error && warning && <FormText>{warning}</FormText>}
        </Col>
    </FormGroup>
);

export default TextFormRender;