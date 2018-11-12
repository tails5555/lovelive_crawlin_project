import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';

import { RadioButtonFormRender, TextFormRender } from './form';

const regionChildren = [
    { value : 'KOR', label : '한국 서버' }, { value : 'JAP', label : '일본 서버' }
];

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.keyword || values.keyword.trim() === ''){
        if(values.region) {
            hasErrors = false;
        } else {
            errors.keyword = '노래 제목을 입력 바랍니다. 혹은 해당 라디오 버튼을 선택하시길 바랍니다.';
            hasErrors = true;
        }
    } 

    return hasErrors && errors;
}

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.keyword.trim() === '' ? undefined : values.keyword.trim(),
        reg : values && values.region === '' ? undefined : values.region,
        pg : 1
    }
    const clientQS = queryString.stringify(clientQueryModel);
    window.location.href = `/event/list?${clientQS}`
}

class EventSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isSearch : false };
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        const clientQueryModel = queryString.parse(search);
        const formInitialValues = {
            keyword : clientQueryModel.st ? clientQueryModel.st : '',
            region : clientQueryModel.reg ? clientQueryModel.reg : '',
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
        this.props.history.push('/event/list/_page?pg=1');
    }

    render(){
        const { isSearch } = this.state;
        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="keyword" component={TextFormRender} placeholder="이벤트 제목을 입력하세요." label="키워드 검색" />
                <Field name="region" component={RadioButtonFormRender} label="서버 국가" children={regionChildren} />
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
    form : 'eventSearchForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(EventSearchForm))