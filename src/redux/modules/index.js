import { combineReducers } from 'redux';
import authentication from './authentication';
import companyAgents from './company-agents';
import clients from './clients';
import posts from './posts';

const reducers = {
  posts,
  authentication,
  companyAgents,
  clients
};

const createRootReducer = () =>
  combineReducers({
    ...reducers
  });

export default createRootReducer;
