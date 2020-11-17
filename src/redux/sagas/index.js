import { all, fork } from 'redux-saga/effects';
import authentication from './authentication';
import locations from './locations';
import notifications from './notifications';
import registries from './registries';
import users from './users';
import tests from './tests';

function* rootSaga() {
  const sagas = [
    authentication,
    locations,
    notifications,
    registries,
    users,
    tests
  ].map(fork);
  yield all(sagas);
}

export default rootSaga;
