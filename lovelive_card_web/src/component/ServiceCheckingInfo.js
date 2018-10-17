import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const ServiceCheckingInfo = () => (
    <Jumbotron className="p-2 border align-self-center text-center">
        <h1 className="display-3">서비스 점검 중입니다...</h1>
        <p className="lead">서비스 점검은 매일 새벽 1시부터 3시까지 이뤄집니다.</p>
        <p className="lead">이외에 관련된 문제는 개발자에게 연락을 취하여 조치하시길 바랍니다.</p>
        <hr className="my-2" />
        <p>오류 보고는 점검 시간 중에도 진행이 가능합니다.</p>
        <div id="button_list">
            <Button color="primary" style={{ marginLeft : '5px', marginRight : '5px' }}><i className="fas fa-home"/> Inven 럽라 커뮤니티로</Button>
            <Button color="secondary" style={{ marginLeft : '5px', marginRight : '5px' }}><i className="fas fa-headset" /> 오류 보고</Button>
        </div>
    </Jumbotron>    
)

export default ServiceCheckingInfo;