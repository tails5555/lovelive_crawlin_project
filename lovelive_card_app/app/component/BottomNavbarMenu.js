import React from 'react';
import { withRouter, Link } from 'react-router-native';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

const BottomNavbarMenu = ({ history }) => {
    const { location } = history;
    return(
        <Footer>
            <FooterTab>
                <Button vertical active={ location.pathname === '/' ? true : false } onPress={() => history.push('/')}>
                    <Icon type="FontAwesome" name="home" active={ location.pathname === '/' ? true : false } />
                    <Text>홈</Text>
                </Button>
                <Button vertical active={ location.pathname.startsWith('/card') ? true : false } onPress={() => history.push('/card/list/_page?pg=1')}>
                    <Icon type="FontAwesome" name="id-card" active={ location.pathname.startsWith('/card') ? true : false } />
                    <Text>카드</Text>
                </Button>
                <Button vertical active={ location.pathname.startsWith('/character') ? true : false } onPress={() => history.push('/character/list/_page?pg=1')}>
                    <Icon type="FontAwesome" name="users" active={ location.pathname.startsWith('/character') ? true : false } />
                    <Text>캐릭터</Text>
                </Button>
                <Button vertical active={ location.pathname.startsWith('/song') ? true : false } onPress={() => history.push('/song/list/_page?pg=1')}>
                    <Icon type="FontAwesome" name="music" active={ location.pathname.startsWith('/song') ? true : false } />
                    <Text>음악</Text>
                </Button>
                <Button vertical active={ location.pathname.startsWith('/event') ? true : false } onPress={() => history.push('/event/list/_page?pg=1')}>
                    <Icon type="FontAwesome" name="calendar" active={ location.pathname.startsWith('/event') ? true : false } />
                    <Text>이벤트</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
}

export default withRouter(BottomNavbarMenu);