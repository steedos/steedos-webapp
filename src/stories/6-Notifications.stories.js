import React from 'react';
import Bootstrap from '../components/bootstrap';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore';
import Notifications from '../components/notifications';

export default {
  title: 'Notifications',
};

export const notifications = () => (
  <Provider store={store}>
    <Bootstrap>
      <Notifications />
    </Bootstrap>
  </Provider>
);
