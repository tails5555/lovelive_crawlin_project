import React from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { SongInfoTable } from './table';
class SongImageAndInfoView extends React.Component {
    constructor(props){
        super(props);
        this.state = { infoResult : props.infoResult, infoError : props.infoError, imageResult : props.imageResult, imageError : props.imageError };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { infoResult, infoError, imageResult, imageError } = nextProps;
        if(infoResult !== prevState.infoResult ||
           infoError !== prevState.infoError ||
           imageResult !== prevState.imageResult ||
           imageError !== prevState.imageError) {
            return {
                infoResult : infoResult,
                infoError : infoError,
                imageResult : imageResult,
                imageError : imageError
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

    render(){
        const { infoResult, infoError, imageResult, imageError } = this.state;
        return(
            <Row>
                <Col sm={3} className="text-center" style={{ marginBottom : '10px' }}>
                    {
                        Array.isArray(imageError) ? 
                            imageResult.map((image, idx) => <img className="" key={`song_cover_image_${idx}`} src={image && image.img_file} alt={`song_cover_image_${image.info}`} />) :
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">노래 커버 이미지를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{imageError}</p>
                            </Alert>
                    }
                </Col>
                <Col sm={9} className="d-flex align-items-center">
                    {
                        infoError === null ? 
                            <SongInfoTable infoResult={infoResult}/> :
                            <Alert color="danger">
                                <h1 className="text-center"><i className="fas fa-exclamation-triangle" /></h1>
                                <p className="text-center">노래 정보를 불러오는 도중 에러가 발생 했습니다.</p>
                                <p className="text-center">내용은 다음과 같습니다.</p>
                                <hr/>
                                <p className="text-center">{infoError}</p>
                            </Alert>
                    }
                </Col>
            </Row>
        )
    }
}

export default SongImageAndInfoView;