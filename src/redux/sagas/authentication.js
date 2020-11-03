import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/authentication';
import * as api from '../api/authentication';

export function* login(action) {
  try {
    const user = yield call(api.login, { ...action });
    yield put({ type: constants.AUTHENTICATION_LOGIN.SUCCESS, user });
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_LOGIN.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchLogin() {
  yield takeLatest(constants.AUTHENTICATION_LOGIN.REQUEST, login);
}

export function* logout() {}

export function* watchLogout() {
  yield takeLatest(constants.AUTHENTICATION_LOGOUT.REQUEST, logout);
}

/**
 * Export the root saga by forking all available sagas.
 */
function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}

export default rootSaga;
