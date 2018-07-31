import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import SimpleExample from '../../../components/user-profile/index';
import UserActions from '../../../actions/userActions';

class ReduxThunkExample extends Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  sendRequest(username) {
    this.props.fetchUser(username, null);
  }

  cancelRequest() {
    this.props.cancelRequest();
  }

  render() {
    if (!this.props) {
      return null;
    } else {
      return (
        <div className="page home">
          <div className="container">
            <h3>Get Github Users (redux-thunk)</h3>
            <SimpleExample
              user={this.props.user}
              userError={this.props.userError}
              sendRequest={this.sendRequest}
              cancelRequest={this.cancelRequest}
              isFetching={this.props.isFetchingUser}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isFetchingUser: state.UserReducer.isFetchingUser,
    user: state.UserReducer.user,
    userError: state.UserReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (username, cb) => {
      dispatch(UserActions.fetchUser(username, cb));
    },
    cancelRequest: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxThunkExample);