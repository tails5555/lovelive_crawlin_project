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
                            <NavLink style={ pathname.startsWith('/card') ? activeStyle : null } tag={Link} to="/card/list?pg=1"><i className="fas fa-boxes" /> 카드 목록 조회</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname.startsWith('/character') ? activeStyle : null } tag={Link} to="/character/list?pg=1"><i className="fas fa-users" /> 캐릭터 목록 조회</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname === '/album/list' ? activeStyle : null } tag={Link} to="/album/list?pg=1"><i className="fas fa-compact-disc" /> 앨범 목록 조회</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink style={ pathname === '/app/info' ? activeStyle : null } tag={Link} to="/app/info"><i className="fab fa-react" /> 개발 정보 안내</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="http://lovelive.inven.co.kr/"><i class="fas fa-external-link-square-alt" /> Inven Lovelive 이동</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default withRouter(MenuNavBar);