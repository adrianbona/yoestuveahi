import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import companyAgents from './company-agents';
import clients from './clients';
import posts from './posts';

function* rootSaga() {
  const sagas = [authentication, companyAgents, clients, posts].map(fork);
  yield all(sagas);
}

export default rootSaga;
