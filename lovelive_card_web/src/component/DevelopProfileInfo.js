import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import devStructure from '../resource/image/lovelive_crawlin_project.png';

const DevelopProfileInfo = () => (
    <Jumbotron className="text-center" style={{ backgroundColor : 'rgba(255, 255, 255, 0.9)', borderRadius : '15px', padding : '20px' }}>
        <div id="develop_profile_title" style={{ margin : '10px 10px' }}>
            <h1>Lovelive Crawlin' App</h1>
            <h2>With React.js</h2>
        </div>
        <hr className="my-2" />
        <div id="image_box" className="text-center" style={{ margin : '20px 20px', whiteSpace : 'unset' }}>
            <img className="img-fluid rounded-circle" src={devStructure} style={{ width : window.innerWidth <= 768 ? '100%' : '70%' }} />
        </div>
        <div id="develop_context_info" style={{ margin : '10px 10px' }}>
            <p className="lead">
                이 프로젝트는 Web Crawling 을 이용한 데이터 수집을 거치고 난 뒤에 데이터베이스에 저장을 하는 과정을 거치고 나서, 서버(django) 측에서 받아오는 요청들을 직접 분석하고 난 후에 클라이언트(Web)에 보여주는 과정을 진행하고자 만든 토이 프로젝트 입니다.
            </p>
            <p className="lead">
                Inven 에서 러브라이브 카드 정보와 노래 정보, 이벤트 정보 등을 눈에 더욱 보기 좋게 구성하였습니다.
            </p>
            <p className="lead">
                특히 이전에 이용했던 검색 기능에 대하여 디테일하게 설정하는 과정을 더했습니다.
            </p>
            <p className="lead">
                그리고 카드 속성에 따른 확률, 노래에 따른 게임 점수, 이벤트 정보에 따른 수치 등을 그래프를 사용하여 시각화를 더했습니다.
            </p>
            <p className="lead">
                프로젝트 경과에 대하여 참고하실 사항이 있으시면 아래 GitHub 을 사용하여 주세요.
            </p>
        </div>
        <hr className="my-2" />
        <div id="developer_info" style={{ margin : '10px 10px' }}>
            <p className="lead">
                프로젝트 Repository 는 GitHub 로 연동 됩니다. 오류가 발생하면 Issues 에 올려주시면 참고하겠습니다.
            </p>
            <p className="lead">
                E-Mail 로도 연락 주셔도 상관 없습니다.
            </p>
            <div id="button_list">
                <Button color="primary" style={{ margin : '5px' }} onClick={() => { window.location.href = 'https://github.com/tails5555/lovelive_crawlin_project' }}>
                    <i className="fab fa-github"/> 프로젝트 Repository 로 이동
                </Button>
                <Button color="secondary" style={{ margin : '5px' }} onClick={() => { window.location.href = 'mailto:hogu9401@gmail.com' }}><i className="fas fa-headset" /> E-Mail 보고</Button>
            </div>
        </div>
    </Jumbotron>    
)

export default DevelopProfileInfo;