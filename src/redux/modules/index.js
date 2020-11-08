import { combineReducers } from 'redux';
import authentication from './authentication';
import users from './users';
import locations from './locations';

const reducers = {
  authentication,
  locations,
  users
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
