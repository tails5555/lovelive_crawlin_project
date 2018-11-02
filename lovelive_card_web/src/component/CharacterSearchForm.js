import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';
import { TextFormRender, SelectFormRender } from './form';

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.character || values.character.trim() === ''){
        if(!values.grade) {
            errors.character = '캐릭터 이름을 입력하시길 바랍니다.';
            hasErrors = true;
        }
    } 
    
    if(!values.grade){
        if(!values.character || values.character.trim() === '') {
            errors.grade = '학년을 선택하시길 바랍니다.';
            hasErrors = true;
        }
    } 

    return hasErrors && errors;
}

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.character.trim() === '' ? undefined : values.character.trim(),
        gr : values && values.grade === '' ? undefined : values.grade,
        pg : 1
    }
    const clientQS = queryString.stringify(clientQueryModel);
    window.location.href = `/character/list?${clientQS}`
}

class CharacterSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { isSearch : false };
    }

    componentDidMount(){
        const { search } = this.props.history.location;
        const clientQueryModel = queryString.parse(search);
        const formInitialValues = {
            character: clientQueryModel.st ? clientQueryModel.st : '',
            grade : clientQueryModel.gr ? clientQueryModel.gr : ''
        };
        this.props.initialize(formInitialValues);
        this.setState({
            isSearch : formInitialValues.character === '' ? formInitialValues.grade !== '' : true
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
        this.props.history.push('/character/list/_page?pg=1');
    }

    render(){
        const { handleSubmit } = this.props;
        const { isSearch } = this.state;

        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="character" component={TextFormRender} placeholder="캐릭터 이름을 입력하세요." label="캐릭터 검색" />
                <Field name="grade" component={SelectFormRender} label="학년 검색" children={ [1, 2, 3, 0].map(grade => <option key={`select_${grade}`} value={grade}>{grade === 0 ? '기타 캐릭터' : `${grade} 학년`}</option>)}/>
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
    form : 'characterSearchForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(CharacterSearchForm));