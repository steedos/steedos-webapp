import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from './stores/configureStore'
import Dashboard from './components/dashboard'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </div>
  );
}

export default App;