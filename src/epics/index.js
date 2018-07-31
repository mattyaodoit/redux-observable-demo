import { combineEpics } from 'redux-observable';
import UserEpics from './userEpics';
import RepoEpics from './repoEpics';

const rootEpic = combineEpics(
  UserEpics.fetchUserEpic,
  RepoEpics.fetchRepoEpic
);

export default rootEpic;