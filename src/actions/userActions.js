import UserConstants from './../constants/userConstants';
import axios from 'axios';

const BASE_URL = 'https://api.github.com/users/';

const UserActions = {
  fetchUserRequest: function() {
    return {
      type: UserConstants.FETCH_USER
    }
  },

  fetchUserError: function(error) {
    return {
      error,
      type: UserConstants.FETCH_USER_REJECTED
    };
  },

  fetchUserFulfilled: function(payload) {
    return {
      payload,
      type: UserConstants.FETCH_USER_FULFILLED
    };
  },

  fetchUser: (username, cb) => {
    const _self = this;

    if(username !== undefined) {
      return (dispatch) => {
        dispatch(_self.a.fetchUserRequest());
        return axios({
          method: 'get',
          url: `${BASE_URL}${username}`
        })
          .then((response) => {
            dispatch(_self.a.fetchUserFulfilled(response.data));

            if (cb !== null) {
              cb();
            }
          })
          .catch((error) => {
            console.log('error: ', error);
            dispatch(_self.a.fetchUserError(error));
          });
      }
    }
  }
};

export default UserActions;