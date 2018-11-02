import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';
import { TextFormRender, CheckboxFormRender, RadioButtonFormRender } from './form';

const propertyChildren = [
    { value : '스마일', label : '스마일' }, { value : '퓨어', label : '퓨어' }, { value : '쿨', label : '쿨' }
];

const rankChildren = [        
    { value : 'N', label : 'N' }, { value : 'R', label : 'R' }, { value : 'SR', label : 'SR' }, { value : 'SSR', label : 'SSR' }, { value : 'UR', label : 'UR' }
]

const conditionChildren = [
    { value : '토탈', label : '리듬 아이콘' }, { value : '콤보', label : '콤보' }, { value : '퍼펙트', label : '퍼펙트' }, { value : '타이머', label : '타이머' }, { value : '기타', label : '기타' }
];

const skillChildren = [
    { value : '점수', label : '점수' }, { value : '회복', label : '회복' }, { value : '판정', label : '판정' }, { value : '특기발동률', label : '특기발동률' }, { value : '속성P UP', label : '속성P 상승' }, { value : '특기 리피트', label : '특기 반복' }, { value : '속성P 싱크로', label : '속성P 싱크로' }, { value : '특기 체인', label : '특기 체인' }, { value : '특기Lv UP', label : '특기Lv UP' }, { value : '탭스코어UP', label : '탭스코어UP' }
]

function validate(values){
    let errors = {};
    let hasErrors = false;

    if(!values.keyword || values.keyword.trim() === ''){
        if(values.property || (values.rank && values.rank.length > 0) || (values.skill && values.skill.length > 0) || (values.condition && values.condition.length > 0)) {
            hasErrors = false;
        } else {
            errors.keyword = '캐릭터 이름이나 카드 제목을 입력 바랍니다. 혹은 해당 체크박스를 선택하시길 바랍니다.';
            hasErrors = true;
        }
    } 

    return hasErrors && errors;
}

const validateAndSearch = (values, dispatch) => {
    const clientQueryModel = {
        st : values && values.keyword.trim() === '' ? undefined : values.keyword.trim(),
        property : values && values.property === '' ? undefined : values.property,
        rank : values && Array.isArray(values.rank) ? (values.rank.length > 0 ? values.rank.join(',') : undefined) : undefined,
        condition : values && Array.isArray(values.condition) ? (values.condition.length > 0 ? values.condition.join(',') : undefined) : undefined,
        skill : values && Array.isArray(values.skill) ? (values.skill.length > 0 ? values.skill.join(',') : undefined) : undefined,
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
            keyword : clientQueryModel.st ? clientQueryModel.st : '',
            property : clientQueryModel.property ? clientQueryModel.property : '',
            rank : clientQueryModel.rank ? clientQueryModel.rank.split(',') : '',
            condition : clientQueryModel.condition ? clientQueryModel.condition.split(',') : '',
            skill : clientQueryModel.skill ? clientQueryModel.skill.split(',') : '',
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
        this.props.history.push('/card/list/_page?pg=1');
    }

    render(){
        const { handleSubmit } = this.props;
        const { isSearch } = this.state;
        
        return(
            <Form onSubmit={handleSubmit(validateAndSearch)}>
                <Field type="text" name="keyword" component={TextFormRender} placeholder="캐릭터 이름, 카드 제목을 입력하세요." label="키워드 검색" />
                <Field name="property" component={RadioButtonFormRender} label="특성" children={propertyChildren} />
                <Field name="rank" component={CheckboxFormRender} label="랭크" children={rankChildren} />
                <Field name="condition" component={CheckboxFormRender} label="조건" children={conditionChildren} />
                <Field name="skill" component={CheckboxFormRender} label="기술" children={skillChildren} />
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
    form : 'cardSearchForm',
    validate,
    enableReinitialize : true,
    keepDirtyOnReinitialize : true,
})(withRouter(CardSearchForm));