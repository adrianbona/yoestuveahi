import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import users from './users';

function* rootSaga() {
  const sagas = [authentication, users].map(fork);
  yield all(sagas);
}

export default rootSaga;
