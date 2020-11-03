import { combineReducers } from 'redux';
import authentication from './authentication';
import companyAgents from './company-agents';
import clients from './clients';
import posts from './posts';
import users from './users';

const reducers = {
  posts,
  authentication,
  companyAgents,
  clients,
  users
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
