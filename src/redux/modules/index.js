import { combineReducers } from 'redux';
import authentication from './authentication';
import users from './users';

const reducers = {
  authentication,
  users
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
