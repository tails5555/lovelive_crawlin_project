import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';
import { TextFormRender, SelectFormRender } from './form';

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.keyword || values.keyword.trim() === ''){
        errors.keyword = '캐릭터 이름이나 카드 제목을 입력 바랍니다.';
        hasErrors = true;
    } 

    return hasErrors && errors;
}

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.keyword.trim() === '' ? undefined : values.keyword.trim(),
        pg : 1
    }
    const clientQS = queryString.stringify(clientQueryModel);
    window.location.href = `/card/list?${clientQS}`
}

class CardSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isSearch : false };
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        const clientQueryModel = queryString.parse(search);
        const formInitialValues = {
            keyword : clientQueryModel.st ? clientQueryModel.st : ''
        };
        this.props.initialize(formInitialValues);
        this.setState({
            isSearch : formInitialValues.keyword === '' ? false : true
        });
    }

    handleClickFormInitialize(){
        this.setState({
            isSearch : false
        });
        this.props.history.push('/card/list/_page?pg=1');
    }

    render(){
        const { handleSubmit } = this.props;
        const { isSearch } = this.state;
        
        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="keyword" component={TextFormRender} placeholder="캐릭터 이름, 카드 제목을 입력하세요." label="키워드 검색" />
                <div className="text-center">
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
    form : 'cardSearchForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(CardSearchForm));