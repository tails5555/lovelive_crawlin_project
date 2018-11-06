import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';

import { RadioButtonFormRender, TextFormRender } from './form';

const propertyChildren = [
    { value : '스마일', label : '스마일' }, { value : '퓨어', label : '퓨어' }, { value : '쿨', label : '쿨' }
];

const songTypeChildren = [        
    { value : '일일곡', label : '일일한정곡' }, { value : '일반곡', label : '일반곡' }
]

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.keyword || values.keyword.trim() === ''){
        if(values.property || values.type) {
            hasErrors = false;
        } else {
            errors.keyword = '노래 제목을 입력 바랍니다. 혹은 해당 체크박스를 선택하시길 바랍니다.';
            hasErrors = true;
        }
    } 

    return hasErrors && errors;
}

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.keyword.trim() === '' ? undefined : values.keyword.trim(),
        property : values && values.property === '' ? undefined : values.property,
        type : values && values.type === '' ? undefined : values.type,
        pg : 1
    }
    const clientQS = queryString.stringify(clientQueryModel);
    window.location.href = `/song/list?${clientQS}`
}

class SongSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isSearch : false };
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        const clientQueryModel = queryString.parse(search);
        const formInitialValues = {
            keyword : clientQueryModel.st ? clientQueryModel.st : '',
            property : clientQueryModel.property ? clientQueryModel.property : '',
            type : clientQueryModel.type ? clientQueryModel.type : '',
            ordering : clientQueryModel.ordering ? clientQueryModel.ordering : ''
        };
        this.props.initialize(formInitialValues);
        
        let searched = false;
        for(var key in formInitialValues){
            if(formInitialValues[key] !== '') {
                searched = true;
                break;
            }
        }

        this.setState({
            isSearch : searched
        });
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

    handleClickFormInitialize(){
        this.setState({
            isSearch : false
        });
        this.props.history.push('/song/list/_page?pg=1');
    }

    render(){
        const { isSearch } = this.state;
        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="keyword" component={TextFormRender} placeholder="캐릭터 이름, 카드 제목을 입력하세요." label="키워드 검색" />
                <Field name="property" component={RadioButtonFormRender} label="특성" children={propertyChildren} />
                <Field name="type" component={RadioButtonFormRender} label="종류" children={songTypeChildren} />
                <div className="text-center" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button color="primary" type="submit" style={{ marginLeft : '5px', marginRight : '5px' }}>
                        <i className="fas fa-search" /> 검색
                    </Button>
                    {
                        isSearch ? 
                            <Button color="danger" type="button" style={{ marginLeft : '5px', marginRight : '5px' }}  onClick={() => this.handleClickFormInitialize()}>
                                <i className="fas fa-undo-alt" /> 초기화
                            </Button> : null
                    }
                </div>
            </Form>
        )
    }
}

export default reduxForm({
    form : 'songSearchForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(SongSearchForm))