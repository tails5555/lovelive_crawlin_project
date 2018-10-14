import React from 'react';
import { Form, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextFormRender, SelectFormRender } from './form';
import queryString from 'query-string';

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.character,
        gr : values && values.grade,
        pg : 1
    }
    const clientQS = queryString.stringify(clientQueryModel);
    window.location.href = `/character/list?${clientQS}`
}

class CharacterSearchForm extends React.Component {
    componentDidMount(){
        const { search } = this.props.history.location;
        const clientQueryModel = queryString.parse(search);
        const formInitialValues = {
            character: clientQueryModel.st && (clientQueryModel.st || ''),
            grade : clientQueryModel.gr && (clientQueryModel.gr || '')
        };
        this.props.initialize(formInitialValues);
    }

    render(){
        const { handleSubmit } = this.props;
        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="character" component={TextFormRender} placeholder="캐릭터 이름을 입력하세요." label="캐릭터 검색" />
                <Field name="grade" component={SelectFormRender} label="학년 검색" children={ [1, 2, 3, 0].map(grade => <option key={`select_${grade}`} value={grade}>{grade === 0 ? '기타 캐릭터' : `${grade} 학년`}</option>)}/>
                <div className="text-center">
                    <Button color="primary" type="submit">
                        <i className="fas fa-search"></i> 검색
                    </Button>
                </div>
            </Form>
        )
    }
}

export default reduxForm({
    form : 'characterSearchForm',
    enableReinitialize : true,
    keepDirtyOnReinitialize : true
})(withRouter(CharacterSearchForm));