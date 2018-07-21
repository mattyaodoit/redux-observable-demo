import { of } from 'rxjs';
import { delay, mergeMap, map, takeUntil, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import userConstants from './../constants/userConstants';

const userEpics = {
  fetchUser: id => ({
    type: userConstants.FETCH_USER,
    payload: id
  }),

  fetchUserFulfilled: payload => ({
    type: userConstants.FETCH_USER_FULFILLED,
    payload
  }),

  cancelFetchUser: () => ({
    type: userConstants.FETCH_USER_CANCELLED
  }),

  fakeAjax: url => of({
    id: url.substring(url.lastIndexOf('/') + 1),
    firstName: 'Matt',
    lastName: 'Yao'
  }).pipe(delay(1000)),

  fetchUserEpic: action$ => action$.pipe(
    ofType(userConstants.FETCH_USER),
    mergeMap(action => this.fakeAjax(`/api/users/${action.payload}`).pipe(
      map(response => this.fetchUserFulfilled(response)),
      takeUntil(action$.pipe(
        filter(action => action.type === userConstants.FETCH_USER_CANCELLED)
      ))
    ))
  )
};

export default userEpics;