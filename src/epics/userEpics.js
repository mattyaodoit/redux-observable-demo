import { of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import userConstants from './../constants/userConstants';

const BASE_URL = 'https://api.github.com/users/';
const userEpics = {
  fetchUser: username => ({
    type: userConstants.FETCH_USER,
    payload: username
  }),

  fetchUserFulfilled: payload => ({
    type: userConstants.FETCH_USER_FULFILLED,
    payload
  }),

  cancelFetchUser: () => ({
    type: userConstants.FETCH_USER_CANCELLED
  }),

  fetchUserError: (error) => ({
    type: userConstants.FETCH_USER_REJECTED,
    payload: error.xhr.response
  }),

  fetchUserEpic: (action$) => action$.pipe(
    ofType(userConstants.FETCH_USER),
    filter(action => action.payload !== undefined),
    mergeMap(action => ajax.getJSON(`${BASE_URL}${action.payload}`).pipe(
      map(userResponse => this.a.fetchUserFulfilled(userResponse)),
      takeUntil(action$.pipe(
        ofType(userConstants.FETCH_USER_CANCELLED)
      )),
      catchError(error => of(this.a.fetchUserError(error)))
    ))
  ),
};

export default userEpics;