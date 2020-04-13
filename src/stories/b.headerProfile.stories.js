import React from 'react';
import styled from 'styled-components'
import { Provider } from 'react-redux';
import store from '../stores/configureStore';
import Bootstrap from '../components/bootstrap'
import { HeaderProfile } from '../components';

export default {
    title: 'HeaderProfile',
};
const Container = styled.div`
  float: right;
  margin: 2rem;
  margin-right: 200px;
  clear: both;
`;

const avatarURL = "http://192.168.3.2:5000/packages/steedos_lightning-design-system/client/images/themes/oneSalesforce/lightning_lite_profile_avatar_96.png";
const logoutAccountClick = ()=>{
    console.log('logoutAccount click...');
}
const settingsAccountClick= ()=>{
    console.log('settingsAccount click...');
}

export const MyHeaderProfile = () => (
    <Provider store={store}>
        <Bootstrap>
            <Container>
                <HeaderProfile avatarURL={avatarURL} logoutAccountClick={logoutAccountClick} settingsAccountClick={settingsAccountClick}/>
            </Container>
        </Bootstrap>
    </Provider>
);