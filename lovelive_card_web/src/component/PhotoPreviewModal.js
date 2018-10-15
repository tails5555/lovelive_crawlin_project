import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const MEDIA_URL = 'http://localhost:8000/media';

class PhotoPreviewModal extends React.Component {
    constructor(props){
        super(props);
        this.state = { info : props.info, showModal : props.showModal, photoURI : props.photoURI }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { info, showModal, photoURI } = nextProps;
        if(
            info !== prevState.info ||
            showModal !== prevState.showModal ||
            photoURI !== prevState.photoURI
        ){    
            return {
                info : info,
                showModal : showModal,
                photoURI : photoURI
            }
        }
        return null;
    }

    componentDidMount(){
        const { info, showModal } = this.state;
        if(showModal && info !== 0)
            console.log(info);
    }

    render(){
        const { handleToggle } = this.props;
        const { info, showModal, photoURI } = this.state;
        return(
            <Fragment>
                <Modal isOpen={showModal} toggle={handleToggle} className={this.props.className}>
                    <ModalHeader toggle={handleToggle}>{info}</ModalHeader>
                    <ModalBody>
                        { photoURI !== null ? <img src={`${MEDIA_URL}/${photoURI}`} className="img-fluid" /> : null }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleToggle}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default PhotoPreviewModal;