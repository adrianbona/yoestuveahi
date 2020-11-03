import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import companyAgents from './company-agents';
import clients from './clients';
import posts from './posts';
import users from './users';

function* rootSaga() {
  const sagas = [authentication, companyAgents, clients, posts, users].map(
    fork
  );
  yield all(sagas);
}

export default rootSaga;
