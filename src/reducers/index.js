import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import { UserReducer } from './userReducer';
import { RepoReducer } from "./repoReducer";

const rootReducer = combineReducers({
  UserReducer,
  RepoReducer,
  routing
});

export default rootReducer;