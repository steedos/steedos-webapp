import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import Dashboard from './components/dashboard'

function App() {
  let appStore = store({ settings: { services: { odata: 'http://192.168.0.195:3195'}}})
  return (
    <div className="App">
      <Provider store={appStore}>
        <Dashboard />
      </Provider>
    </div>
  );
}

export default App;