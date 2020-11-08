import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/authentication';
import * as authApi from '../api/authentication';
import * as usersApi from '../api/users';

export function* login(action) {
  try {
    const { data: user } = yield call(authApi.login, { ...action });
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

export function* updateDetails(action) {
  console.log(action);
  try {
    const { data: user } = yield call(usersApi.updateDetails, { ...action });
    yield put({ type: constants.AUTHENTICATION_UPDATE_DETAILS.SUCCESS, user });
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_UPDATE_DETAILS.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchUpdateDetails() {
  yield takeLatest(
    constants.AUTHENTICATION_UPDATE_DETAILS.REQUEST,
    updateDetails
  );
}

/**
 * Export the root saga by forking all available sagas.
 */
function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchUpdateDetails)]);
}

export default rootSaga;
