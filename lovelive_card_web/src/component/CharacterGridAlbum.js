import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, } from 'reactstrap';
import './style/card_animate.css';
import PhotoPreviewModal from './PhotoPreviewModal';

const MEDIA_URL = 'http://localhost:8000/media';

function paginate(imageArray, pageSize, pageNo){
    return imageArray.slice((pageNo - 1) * pageSize, pageNo * pageSize);
}

function numberRange(pageSize) {
    return Array(pageSize).fill(1).map((x, y) => x + y)
}

const mapStateToProps = (state) => {
    return {
        cardImages : state.media.cardImages
    }
}

class CharacterGridAlbum extends React.Component {
    constructor(props){
        super(props);
        let pageSize = (window.innerWidth < 768) ? 3 : 6;
        this.state = { pageNo : 1, pageSize : pageSize, imageResult : [], imageError : null, selectInfo : 0, showModal : false, photoURI : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { results, error } = nextProps.cardImages;
        if(
            results !== prevState.imageResult ||
            error !== prevState.imageError
        ){
            return {
                imageResult : results,
                imageError : error
            }
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

    handleClickNext = () => {
        const { pageNo, imageResult, pageSize } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const tmpPageNo = pageNo * 1 === pageLength ? 1 : pageNo * 1 + 1;
        this.setState({
            pageNo : tmpPageNo
        });
    }

    handleClickPrevious = () => {
        const { pageNo, imageResult, pageSize } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const tmpPageNo = pageNo * 1 === 1 ? pageLength : pageNo - 1;
        this.setState({
            pageNo : tmpPageNo
        });
    }

    handleClickChange = (event) => {
        this.setState({
            pageNo : event.target.value
        })
    }

    handleClickModalToggle = (infoId, photoURI) => {
        const { showModal } = this.state;
        this.setState({
            showModal : !showModal,
            selectInfo : !showModal ? infoId : 0,
            photoURI : !showModal ? photoURI : null
        });
    }

    render(){
        const { imageResult, imageError, pageNo, pageSize, selectInfo, showModal, photoURI } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const pageArray = imageResult.length > 0 ? paginate(imageResult, pageSize, pageNo) : [];
        const cardView = imageResult.length > 0 ? 
            pageArray.map((image, idx) => 
                image.model !== undefined ?
                <Col xs={4} sm={2} key={`image_card_${image.pk}`}>
                    <img 
                        className="img-fluid img-thumbnail smallCard" 
                        alt={`card_image_${idx}`} 
                        src={`${MEDIA_URL}/${image.fields && image.fields.img_file}`} 
                        onClick={() => this.handleClickModalToggle(image.fields && image.fields.info, image.fields && image.fields.img_file)}
                        style={{ cursor : 'pointer' }}
                    />
                </Col> : <Col xs={4} sm={2} key={`image_card_${idx}`}></Col>
            ) : 
            null;
        return (
            <Fragment>
                <Row>
                    {cardView}
                </Row>
                <div id="card_list_pg_button" className="text-center" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button onClick={() => this.handleClickPrevious()} color={ pageNo * 1 === 1 ? 'info' : 'warning' } style={{ marginLeft : '5px', marginRight : '5px' }}>
                        <i className={ pageNo * 1 === 1 ? "fas fa-step-backward" : "fas fa-angle-left"} /> { pageNo * 1 === 1 ? '마지막' : '이전' }
                    </Button>
                    <span style={{ marginRight : '5px' }}>
                        <select value={pageNo} style={{ marginLeft : '5px', marginRight : '5px' }} onChange={this.handleClickChange.bind(this)}>
                            { numberRange(pageLength).map(no => <option key={`select_pg_${no}`} value={no}>{no}</option>) }
                        </select>
                         / {pageLength}
                    </span>
                    <Button onClick={() => this.handleClickNext()} color={ pageNo * 1 === pageLength ? 'danger' : 'primary' } style={{ marginLeft : '5px', marginRight : '5px' }}>
                        { pageNo * 1 === pageLength ? '처음' : '다음' } <i className={ pageNo * 1 === pageLength ? "fas fa-step-forward" : "fas fa-angle-right"} />
                    </Button>
                </div>
                <div id="show_card_modal">
                    <PhotoPreviewModal info={selectInfo} showModal={showModal} photoURI={photoURI} handleToggle={() => this.handleClickModalToggle(selectInfo)} />
                </div>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(CharacterGridAlbum);