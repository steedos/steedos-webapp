import React from 'react';
import { action } from '@storybook/addon-actions';
import Dashboard from '../components/dashboard'
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

export default {
  title: 'Dashboard'
};

export const instances = () => (

  <div className="App">
      <Provider store={store}>
        <Bootstrap>
          <Dashboard onClick={action('clicked')}/>
        </Bootstrap>
      </Provider>
  </div>

)