import { combineEpics } from 'redux-observable';
import UserEpics from './userEpics';

const rootEpic = combineEpics(
  UserEpics.fetchUserEpic
);

export default rootEpic;