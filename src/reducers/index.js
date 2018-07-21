import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
  UserReducer,
  routing
});

export default rootReducer;