import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import './App.css';
import ReduxObservable from './containers/github-fetch/redux-observable';
import ReduxThunk from './containers/github-fetch/redux-thunk';
// Components
import Header from './components/common/header';

class App extends Component {
  render() {
    const { history } = this.props;
    if (!this.props) {
      return null;
    }

    return (
      <Router history={ history }>
        <div className="wrapper">
          <Header title="redux middlewares demo"/>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={ ReduxObservable }/>
            <Route path={process.env.PUBLIC_URL + '/redux-thunk'} component={ ReduxThunk }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
