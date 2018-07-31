import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import UserProfile from '../../../components/user-profile';
import UserRepos from '../../../components/user-repos'
import userEpics from '../../../epics/userEpics';
import repoEpics from '../../../epics/repoEpics';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleCard: false
        }

        this.sendRequest = this.sendRequest.bind(this);
        this.cancelUserRequest = this.cancelUserRequest.bind(this);
        this.cancelRepoRequest = this.cancelRepoRequest.bind(this);
    }

    sendRequest(username) {
        this.props.fetchUser(username);
        this.props.fetchRepo(username);
    }

    cancelUserRequest() {
        this.props.cancelUserRequest();
    }

    cancelRepoRequest() {
      this.props.cancelRepoRequest();
    }

    render() {
        if (!this.props) {
            return null;
        } else {
            return (
                <div className="page home">
                    <div className="container">
                        <div className="user-profile-grid">
                          <h3>Get Github Users (redux-observable)</h3>
                          <UserProfile
                              user={this.props.user}
                              userError={this.props.userError}
                              sendRequest={this.sendRequest}
                              cancelUserRequest={this.cancelUserRequest}
                              cancelRepoRequest={this.cancelRepoRequest}
                              isFetching={this.props.isFetchingUser}
                          />
                        </div>

                        <div className="repos-grid">
                          <UserRepos
                            repos={this.props.repos}
                            repoError={this.props.repoError}
                            isFetching={this.props.isFetchingRepo}
                          />
                        </div>
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
    userError: state.UserReducer.error,

    isFetchingRepo: state.RepoReducer.isFetchingRepo,
    repos: state.RepoReducer.repos,
    repoError: state.RepoReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (username) => {
      dispatch(userEpics.fetchUser(username));
    },
    cancelUserRequest: () => {
      dispatch(userEpics.cancelFetchUser());
    },
    fetchRepo: (username) => {
      dispatch(repoEpics.fetchRepo(username));
    },
    cancelRepoRequest: () => {
      dispatch(repoEpics.cancelFetchRepo());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);