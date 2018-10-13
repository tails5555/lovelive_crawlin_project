import React from 'react';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import './style/image_animate.css';

class CharacterProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = { character : props.character };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { character } = nextProps;
        if(character !== prevState.character){
            return {
                character : character
            };
        }
        return null;
    }

    render(){
        const { character } = this.state;
        return(
            <Table bordered className="fade-in">
                <tbody style={{ 
                    textAlign : 'center',
                    verticalAlign : 'center' 
                }}>
                    <tr>
                        <th style={{ width : '120px', backgroundColor : 'skyblue' }}>한국 이름</th>
                        <td>{character && character.kor_name}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>일본 이름</th>
                        <td>{character && character.jap_name}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>생일</th>
                        <td>{character && character.birthday}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>학년</th>
                        <td>{character && character.grade === 0 ? '해당 없음' : `${character.grade} 학년`}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>쓰리 사이즈</th>
                        <td>{character && character.three_size}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>신장</th>
                        <td>{character && character.height === 0 ? '미상' : `${character.height} cm`}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>혈액형</th>
                        <td>{character && character.blood_type} 형</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>취미</th>
                        <td>{character && character.hobbies}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor : 'skyblue' }}>성우</th>
                        <td>{character && character.voice_actor}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default withRouter(CharacterProfile);