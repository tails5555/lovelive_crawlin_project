import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFoundInfo = () => (
    <Jumbotron className="p-2 border align-self-center text-center" style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px' }}>
        <h1 className="display-3">404 Error!</h1>
        <p className="lead">현재 접속하신 URL로 제공하는 서비스가 없습니다.</p>
        <p className="lead">이와 같은 오류가 반복하여 발생하면 개발자에게 연락을 취하여 조치하시길 바랍니다.</p>
        <hr className="my-2" />
        <p>아래 버튼을 클릭하면 홈으로 이동하실 수 있습니다.</p>
        <div id="button_list">
            <Button color="primary" style={{ margin : '5px' }} tag={Link} to="/"><i className="fas fa-home"/> 홈으로</Button>
            <Button color="success" style={{ margin : '5px' }} onClick={() => { window.location.href = 'http://lovelive.inven.co.kr/' }}><i className="fas fa-home"/> Inven 럽라 커뮤니티로</Button>
            <Button color="secondary" style={{ margin : '5px' }} onClick={() => { window.location.href = 'mailto:hogu9401@gmail.com' }}><i className="fas fa-headset" /> E-Mail 보고</Button>
        </div>
    </Jumbotron>    
)

export default NotFoundInfo;