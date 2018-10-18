import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Table } from 'reactstrap';
import {
    fetchCardDetailByInfoNo, fetchCardDetailByInfoNoSuccess, fetchCardDetailByInfoNoFailure, resetFetchCardDetailByInfoNo
} from '../action/action_detail';

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
        const { detailElement, info } = this.props;
        const infoResult = info !== nextProps.info || info !== nextState.info;
        const detailResult = detailElement !== nextProps.detailElement || detailElement.result !== nextState.detailResult || detailElement.error !== nextState.detailError;
        return infoResult || detailResult;
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

        return(
            <Fragment>
                <Modal isOpen={showModal} toggle={handleToggle} className={this.props.className + " modal-lg"}>
                    <ModalHeader toggle={handleToggle}>Card #{info}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm={6}>
                                { photoURI !== null ? <img src={`${MEDIA_URL}/${photoURI}`} className="img-fluid" alt={`modal_img_${info}}`} /> : null }
                            </Col>
                            <Col sm={6}>
                                <Table bordered size="sm">
                                    <tbody style={{ 
                                        textAlign : 'center'
                                    }}>
                                        <tr>
                                            <th className="align-middle" style={{ width : '100px', backgroundColor : 'deeppink', color : 'white' }}>센터 효과</th>
                                            <td className="align-middle" colSpan={4}>{detailResult && detailResult.main_effect}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ width : '100px', backgroundColor : 'deeppink', color : 'white' }}>추가 효과</th>
                                            <td className="align-middle" colSpan={4} style={{ wordBreak : 'keep-all' }}>{detailResult && detailResult.plus_effect}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }} colSpan={5}>능력치 효과</th>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ width : '30px', backgroundColor : 'deeppink' }}></th>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>스마일</th>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>퓨어</th>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>쿨</th>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>HP</th>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>기본</th>
                                            <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.basic_smile}</span></td>
                                            <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.basic_pure}</span></td>
                                            <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.basic_cool}</span></td>
                                            <td className="align-middle">{detailResult && detailResult.basic_hp}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>만렙</th>
                                            <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.full_smile}</span></td>
                                            <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.full_pure}</span></td>
                                            <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.full_cool}</span></td>
                                            <td className="align-middle">{detailResult && detailResult.full_hp}</td>
                                        </tr>
                                        <tr>
                                            <th className="align-middle" style={{ backgroundColor : 'deeppink', color : 'white' }}>각성</th>
                                            <td className="align-middle"><span style={{ color : 'deeppink' }}>{detailResult && detailResult.wake_up_smile}</span></td>
                                            <td className="align-middle"><span style={{ color : 'limegreen' }}>{detailResult && detailResult.wake_up_pure}</span></td>
                                            <td className="align-middle"><span style={{ color : 'slateblue' }}>{detailResult && detailResult.wake_up_cool}</span></td>
                                            <td className="align-middle">{detailResult && detailResult.wake_up_hp}</td>
                                        </tr>
                                    </tbody>
                                </Table>
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