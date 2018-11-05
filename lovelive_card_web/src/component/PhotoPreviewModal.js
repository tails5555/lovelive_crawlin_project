import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Alert } from 'reactstrap';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';
import CardDetailTable from './CardDetailTable';

const MEDIA_URL = 'http://localhost:8000/media';

const mapStateToProps = (state) => {
    return {
        detailElement : state.detail.detailElement
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailByCardNo : (cardNo) => dispatch(fetchCardDetailByInfoNo(cardNo)).then(response => {
            if(!response.error)
                dispatch(fetchCardDetailByInfoNoSuccess(response.payload));
            }).catch(error => {
                const { status, data } = error.response;
                if(status !== 200)
                    dispatch(fetchCardDetailByInfoNoFailure(data));
            }),
        resetFetchDetailByCardNo : () => dispatch(resetFetchCardDetailByInfoNo())
    }
}

class PhotoPreviewModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { info : props.info, showModal : props.showModal, photoURI : props.photoURI, detailResult : null, detailError : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { info, showModal, photoURI, detailElement } = nextProps;
        const { result, error } = detailElement;
        if(
            info !== prevState.info ||
            showModal !== prevState.showModal ||
            photoURI !== prevState.photoURI ||
            result !== prevState.detailResult ||
            error !== prevState.detailError
        ){    
            return {
                info : info,
                showModal : showModal,
                photoURI : photoURI,
                detailResult : result.length > 0 ? result[0] : null,
                detailError : error.length > 0 ? error[0] : null
            }
        }
        return null;
    }

    componentDidMount(){
        const { info } = this.state;
        if(info !== 0)
            this.props.fetchDetailByCardNo(info);
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

    componentDidUpdate(prevProps, prevState) {
        const { info, detailResult, detailError } = this.state;
        if(info !== prevState.info && info !== 0)
            this.props.fetchDetailByCardNo(info);
        else if(info !== prevState.info && info === 0)
            this.props.resetFetchDetailByCardNo();
        else if(detailResult !== prevState.detailResult)
            this.setState({
                detailResult : detailResult
            });
        else if(detailError !== prevState.detailError)
            this.setState({
                detailError : detailError
            });
    }

    componentWillUnmount(){
        this.props.resetFetchDetailByCardNo();
    }

    render(){
        const { handleToggle } = this.props;
        const { info, showModal, photoURI, detailResult, detailError } = this.state;
        let detailDisplay = null;

        if(detailResult !== null){
            detailDisplay = (
                <CardDetailTable detailResult={detailResult} />
            );
        } else {
            detailDisplay = (
                <Alert color="danger">
                    <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                    <p className="text-center">카드 세부 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                    <p className="text-center">내용은 다음과 같습니다.</p>
                    <hr/>
                    <p className="text-center">{detailError}</p>
                </Alert>
            );
        }
        
        return(
            <Fragment>
                <Modal isOpen={showModal} toggle={handleToggle} className={this.props.className + " modal-lg"}>
                    <ModalHeader toggle={handleToggle}>Card #{info}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm={6}>
                                { photoURI !== null ? <img src={`${MEDIA_URL}/${photoURI}`} className="img-fluid" alt={`modal_img_${info}}`} /> : null }
                            </Col>
                            <Col sm={6} className="d-flex align-items-center">
                                {detailDisplay}
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleToggle}><i className="fas fa-window-close" /> 닫기</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPreviewModal);