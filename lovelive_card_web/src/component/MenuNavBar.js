import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import BrandImage from '../resource/image/lovelive_brand.png';
import './style/brand_image.css';

class MenuNavBar extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
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
        const { isOpen } = this.state;
        const { location } = this.props.history;
        const { pathname } = location;
        const activeStyle = {
            backgroundColor : 'deepskyblue',
            color : 'black',
            borderRadius : '5px',
            border : '2px solid lightskyblue'
        }
        return(
            <Navbar color="primary" dark expand="md" className="sticky-top">
                <NavbarBrand tag={Link} to="/">
                    <div className="brandImage">
                        <img src={BrandImage} alt={'brand_image'}/>
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.toggle()} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink style={ pathname === '/' ? activeStyle : null } tag={Link} to="/"><i className="fas fa-home" /> 홈</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname.startsWith('/card') ? activeStyle : null } tag={Link} to="/card/list/_page?pg=1"><i className="fas fa-id-card" /> 카드</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname.startsWith('/character') ? activeStyle : null } tag={Link} to="/character/list/_page?pg=1"><i className="fas fa-users" /> 캐릭터</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname.startsWith('/song') ? activeStyle : null } tag={Link} to="/song/list/_page?pg=1"><i className="fas fa-drum" /> 음악</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname.startsWith('/event') ? activeStyle : null } tag={Link} to="/event/list/_page?pg=1"><i className="fas fa-calendar" /> 이벤트</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname === '/develop/info' ? activeStyle : null } tag={Link} to="/develop/info"><i className="fab fa-react" /> 개발 정보</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="http://lovelive.inven.co.kr/"><i className="fas fa-external-link-square-alt" /> Inven Lovelive 이동</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(MenuNavBar);