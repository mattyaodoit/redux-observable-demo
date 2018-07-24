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
import Home from './containers/home';
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
            <Header title="redux-observable demo"/>
            <Switch>
              <Route exact path={process.env.PUBLIC_URL + '/'} component={ Home }/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
