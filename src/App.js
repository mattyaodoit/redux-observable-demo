import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import {
  Provider
} from 'react-redux';
import './App.css';
import ReduxObservable from './containers/github-user-fetch/redux-observable';
import ReduxThunk from './containers/github-user-fetch/redux-thunk';
// Components
import Header from './components/common/header';

class App extends Component {
  render() {
    const { store, history } = this.props;
    if (!this.props) {
      return null;
    }

    return (
      <Provider store={ store }>
        <Router history={ history }>
          <div className="wrapper">
            <Header title="redux middlewares demo"/>
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + '/'} component={ ReduxObservable }/>
              <Route path={process.env.PUBLIC_URL + '/redux-thunk'} component={ ReduxThunk }/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
