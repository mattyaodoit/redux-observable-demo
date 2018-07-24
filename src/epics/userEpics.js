import { of } from 'rxjs';
import { mergeMap, map, takeUntil, catchError } from 'rxjs/operators';
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

  fetchUserError: () => ({
    type: userConstants.FETCH_USER_REJECTED
  }),

  fetchUserEpic: (action$) => action$.pipe(
    ofType(userConstants.FETCH_USER),
    mergeMap(action => ajax.getJSON(`${BASE_URL}${action.payload}`).pipe(
      map(response => this.a.fetchUserFulfilled(response)),
      takeUntil(action$.pipe(
        ofType(userConstants.FETCH_USER_CANCELLED)
      )),
      catchError(error => of({
        type: userConstants.FETCH_USER_REJECTED,
        payload: error.xhr.response
      }))
    ))
  )
};

export default userEpics;