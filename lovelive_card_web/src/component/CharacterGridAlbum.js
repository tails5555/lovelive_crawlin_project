import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import './style/card_animate.css';

const MEDIA_URL = 'http://localhost:8000/media';

function paginate(imageArray, pageSize, pageNo){
    return imageArray.slice((pageNo - 1) * pageSize, pageNo * pageSize);
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
        this.state = { pageNo : 1, pageSize : pageSize, imageResult : [], imageError : null };
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

    handleClickNext(){
        const { pageNo, imageResult, pageSize } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const tmpPageNo = pageNo === pageLength ? 1 : pageNo + 1;
        this.setState({
            pageNo : tmpPageNo
        });
    }

    handleClickPrevious(){
        const { pageNo, imageResult, pageSize } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const tmpPageNo = pageNo === 1 ? pageLength : pageNo - 1;
        this.setState({
            pageNo : tmpPageNo
        });
    }

    render(){
        const { imageResult, imageError, pageNo, pageSize } = this.state;
        const pageLength = Math.ceil(imageResult.length / pageSize);
        const pageArray = imageResult.length > 0 ? paginate(imageResult, pageSize, pageNo) : [];
        const cardView = imageResult.length > 0 ? 
            pageArray.map(image => 
                <Col xs={4} sm={2} key={`image_card_${image.pk}`}>
                    <img className="img-fluid img-thumbnail animationCard" alt={`card_image_${image.pk}`} src={`${MEDIA_URL}/${image.fields && image.fields.img_file}`} />
                </Col>
            ) : 
            null;
        return (
            <React.Fragment>
                <Row>
                    {cardView}
                </Row>
                <div className="text-center" style={{ marginTop : '10px', marginBottom : '10px' }}>
                    <Button onClick={() => this.handleClickPrevious()} color={ pageNo === 1 ? 'info' : 'warning' } style={{ marginLeft : '10px', marginRight : '10px' }}>
                        { pageNo === 1 ? '마지막' : '이전' }
                    </Button>
                    <span style={{ marginLeft : '10px', marginRight : '10px' }}>
                        {pageNo} / {pageLength}
                    </span>
                    <Button onClick={() => this.handleClickNext()} color={ pageNo === pageLength ? 'danger' : 'primary' } style={{ marginLeft : '10px', marginRight : '10px' }}>
                        { pageNo === pageLength ? '처음' : '다음' }
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, null)(CharacterGridAlbum);