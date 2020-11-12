import { combineReducers } from 'redux';
import authentication from './authentication';
import users from './users';
import locations from './locations';
import registries from './registries';

const reducers = {
  authentication,
  locations,
  registries,
  users
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
