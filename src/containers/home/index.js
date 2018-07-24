import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import SimpleExample from './../../components/examples/simple';
import userEpics from './../../epics/userEpics';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleCard: false
        }

        this.sendRequest = this.sendRequest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
    }

    sendRequest(username) {
        console.log('username: ', username);
        this.props.fetchUser(username);
    }

    cancelRequest() {
        console.log('cancel');
        this.props.cancelRequest();
    }

    render() {
        if (!this.props) {
            return null;
        } else {
            return (
                <div className="page home">
                    <div className="container">
                        <SimpleExample 
                            user={this.props.user}
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
    fetchUser: (username) => {
      dispatch(userEpics.fetchUser(username));
    },
    cancelRequest: () => {
      dispatch(userEpics.cancelFetchUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);