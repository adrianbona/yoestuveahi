import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import users from './users';
import locations from './locations';
import registries from './registries';

function* rootSaga() {
  const sagas = [authentication, users, locations, registries].map(fork);
  yield all(sagas);
}

export default rootSaga;
