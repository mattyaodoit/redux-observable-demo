import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  Provider
} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

// Redux store settings
import configureStore from './store/configureStore';

const storeObject = configureStore();
const store = storeObject.store;
const history = storeObject.history;

ReactDOM.render(
  <Provider store={ store }>
    <App history={ history } />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
