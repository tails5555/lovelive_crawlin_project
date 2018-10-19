import React from 'react';
import { Row, Col } from 'reactstrap';
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

    render(){
        const { infoResult, infoError, detailResult, detailError } = this.state;
        return(
            <Row>
                <Col sm={6} className="align-self-center">
                    <CardInfoTable infoResult={infoResult} infoError={infoError} hasPopup={true} />
                </Col>
                <Col sm={6}>
                    <CardDetailTable detailResult={detailResult} />
                </Col>
            </Row>
        )
    }
}

export default CardInfoDetailView;