import { from } from 'rxjs';
import { delay, mergeMap, map, takeUntil, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import userConstants from './../constants/userConstants';

const BASE_URL = 'https://api.github.com/users/';
const httpRequest = payload => {
  const request = fetch(`${BASE_URL}${payload}`)
    .then(response => response.json());
  return from(request).pipe(
    delay(1000)
  );
};

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

  fetchUserEpic: (action$) => action$.pipe(
    ofType(userConstants.FETCH_USER),
    mergeMap(action => httpRequest(action.payload).pipe(
      map(response => this.a.fetchUserFulfilled(response)),
      takeUntil(action$.pipe(
        filter(action => action.type === userConstants.FETCH_USER_CANCELLED)
      ))
    ))
  )
};

export default userEpics;