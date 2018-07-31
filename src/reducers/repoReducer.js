import repoConstants from './../constants/repoConstants';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  repos: [],
  isFetchingRepo: false,
  error: null
});

export const RepoReducer = (state = initialState, action) => {
  switch (action.type) {
    case repoConstants.FETCH_REPO:
      return Object.assign({}, state, {
        repos: [],
        isFetchingRepo: true,
        error: null
      });
    case repoConstants.FETCH_REPO_FULFILLED:
      return Object.assign({}, state, {
        repos: action.payload,
        isFetchingRepo: false,
        error: null
      });
    case repoConstants.FETCH_REPO_CANCELLED:
      return Object.assign({}, state, {
        repos: [],
        isFetchingRepo: false,
        error: null
      });
    case repoConstants.FETCH_REPO_REJECTED:
      return Object.assign({}, state, {
        repos: [],
        isFetchingRepo: false,
        error: action.payload
      });
    default:
      return state;
  }
};
