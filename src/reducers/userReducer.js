import userConstants from './../constants/userConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  user: {},
  isFetchingUser: false,
  error: null
});

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.FETCH_USER:
      return Object.assign({}, state, {
        user: {},
        isFetchingUser: true,
        error: null
      });
    case userConstants.FETCH_USER_FULFILLED:
      return Object.assign({}, state, {
        user: action.payload,
        isFetchingUser: false,
        error: null
      });
    case userConstants.FETCH_USER_CANCELLED:
      return Object.assign({}, state, {
        user: {},
        isFetchingUser: false,
        error: null
      });
    default:
      return state;
  }
};
