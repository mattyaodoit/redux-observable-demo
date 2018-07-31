import { of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import repoConstants from './../constants/repoConstants';

const BASE_URL = 'https://api.github.com/users/';
const repoEpics = {
  fetchRepo: username => ({
    type: repoConstants.FETCH_REPO,
    payload: username
  }),

  fetchRepoFulfilled: payload => ({
    type: repoConstants.FETCH_REPO_FULFILLED,
    payload
  }),

  cancelFetchRepo: () => ({
    type: repoConstants.FETCH_REPO_CANCELLED
  }),

  fetchRepoError: (error) => ({
    type: repoConstants.FETCH_REPO_REJECTED,
    payload: error.xhr.response
  }),

  fetchRepoEpic: (action$) => action$.pipe(
    ofType(repoConstants.FETCH_REPO),
    filter(action => action.payload !== undefined),
    mergeMap(response => ajax.getJSON(`${BASE_URL}${response.payload}/repos`).pipe(
      map(repoResponse => this.a.fetchRepoFulfilled(repoResponse)),
      takeUntil(action$.pipe(
        ofType(repoConstants.FETCH_REPO_CANCELLED)
      )),
      catchError(error => of(this.a.fetchRepoError(error)))
    ))
  ),
};

export default repoEpics;