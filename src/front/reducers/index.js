import { combineReducers } from 'redux';
import User from './user';
import Auth from './auth';
import Admin from './admin';

const rootReducer = combineReducers({
  user: User,
  auth: Auth,
  admin: Admin,
});

export default rootReducer;
