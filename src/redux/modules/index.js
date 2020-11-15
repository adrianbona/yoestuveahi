import { combineReducers } from 'redux';
import authentication from './authentication';
import users from './users';
import locations from './locations';
import registries from './registries';
import tests from './tests';

const reducers = {
  authentication,
  locations,
  registries,
  users,
  tests
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
