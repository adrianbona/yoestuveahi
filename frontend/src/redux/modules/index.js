import { combineReducers } from 'redux';
import authentication from './authentication';
import contagions from './contagions';
import locations from './locations';
import notifications from './notifications';
import registries from './registries';
import tests from './tests';
import users from './users';

const reducers = {
  authentication,
  contagions,
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
