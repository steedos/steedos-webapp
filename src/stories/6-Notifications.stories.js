import React from 'react';
import styled from 'styled-components';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Notifications from '../components/notifications';

export default {
  title: 'Notifications',
};

const Container = styled.div`
  float: right;
  margin: 2rem;
  clear: both;
`;

export const notifications = () => (
  <Provider store={store}>
    <Bootstrap>
      <Container>
        <Notifications />
      </Container>
    </Bootstrap>
  </Provider>
);
