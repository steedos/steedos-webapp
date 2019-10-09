import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import Dashboard from './components/dashboard'
import Bootstrap from './components/bootstrap'
import { IconSettings } from '@salesforce/design-system-react';

function App() {
  return (
    <div className="App">
      <IconSettings iconPath="/assets/icons" >
        <Provider store={store}>
          <Bootstrap>
            <Dashboard />
          </Bootstrap>
        </Provider>
      </IconSettings>
    </div>
  );
}

export default App;