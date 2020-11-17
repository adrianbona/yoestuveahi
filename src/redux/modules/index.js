import { combineReducers } from 'redux';
import authentication from './authentication';
import locations from './locations';
import notifications from './notifications';
import registries from './registries';
import tests from './tests';
import users from './users';

const reducers = {
  authentication,
  locations,
  notifications,
  registries,
  users,
  tests
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
