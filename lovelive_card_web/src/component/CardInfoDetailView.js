import React from 'react';
import { Row, Col, Alert } from 'reactstrap';
import CardInfoTable from './CardInfoTable';
import CardDetailTable from './CardDetailTable';

class CardInfoDetailView extends React.Component {
    constructor(props){
        super(props);
        this.state = { infoResult : props.infoResult, infoError : props.infoError, detailResult : props.detailResult, detailError : props.detailError };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { infoResult, infoError, detailResult, detailError } = nextProps;
        if(
            infoResult !== prevState.infoResult ||
            infoError !== prevState.infoError ||
            detailResult !== prevState.detailResult ||
            detailError !== prevState.detailError
        ) {
            return {
                infoResult : infoResult,
                infoError : infoError,
                detailResult : detailResult,
                detailError : detailError
            };
        }
        return null;
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

    render(){
        const { infoResult, infoError, detailResult, detailError } = this.state;
        return(
            <Row>
                <Col sm={6} className="align-self-center">
                    <CardInfoTable infoResult={infoResult} infoError={infoError} hasPopup={true} />
                </Col>
                <Col sm={6}>
                {
                    Array.isArray(detailError) ? 
                        <CardDetailTable detailResult={detailResult} /> :
                        <Alert color="danger">
                            <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                            <p className="text-center">카드 세부 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                            <p className="text-center">내용은 다음과 같습니다.</p>
                            <hr/>
                            <p className="text-center">{detailError}</p>
                        </Alert>
                }
                </Col>
            </Row>
        )
    }
}

export default CardInfoDetailView;