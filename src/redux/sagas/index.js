import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import users from './users';
import locations from './locations';
import registries from './registries';
import tests from './tests';

function* rootSaga() {
  const sagas = [authentication, users, locations, registries, tests].map(fork);
  yield all(sagas);
}

export default rootSaga;
