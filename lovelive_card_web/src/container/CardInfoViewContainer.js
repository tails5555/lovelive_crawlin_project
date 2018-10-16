import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

class CardInfoViewContainer extends React.Component {
    render(){
        return(
            <div>
                <div id="card_image_view">
                    카드 이미지 조회
                </div>
                <div id="card_detail_info">
                    카드 세부 정보 출력
                </div>
                <div id="card_effect_info">
                    카드 효과 정보 출력
                </div>
                <div id="card_message_info">
                    카드 메시지 정보 출력
                </div>
                <div id="card_pair_info">
                    카드 세트 정보 출력
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardInfoViewContainer);