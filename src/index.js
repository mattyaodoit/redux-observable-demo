import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux store settings
import configureStore from './store/configureStore';

const store = configureStore()['store'];
const history = configureStore()['history'];

ReactDOM.render(
  <App store={ store } history={ history } />,
  document.getElementById('root')
);
registerServiceWorker();
