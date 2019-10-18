import React from 'react';
import { action } from '@storybook/addon-actions';
import Dashboard from '../components/dashboard'
import Bootstrap from '../components/bootstrap'
import { IconSettings } from '@salesforce/design-system-react';
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

export default {
  title: 'Dashboard',
};

export const instances = () => (

  <div className="App">
    <IconSettings iconPath="/assets/icons" >
      <Provider store={store}>
        <Bootstrap>
          <Dashboard onClick={action('clicked')}/>
        </Bootstrap>
      </Provider>
    </IconSettings>
  </div>

)