import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import Dashboard from './components/dashboard'
import { IconSettings } from '@salesforce/design-system-react';

function App() {
  return (
    <div className="App">
      <IconSettings iconPath="/assets/icons" >
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </IconSettings>
    </div>
  );
}

export default App;