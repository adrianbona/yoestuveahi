import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/authentication';
import * as authApi from '../api/authentication';
import * as usersApi from '../api/users';
import { setUserToken } from '../../components/authentication/session';

export function* login(action) {
  try {
    const { data } = yield call(authApi.login, { ...action });
    setUserToken(data.token);
    const user = {
      ...data,
      isAdministrator: data.is_admin,
      creationDate: moment(data.creation_date)
    };
    yield put({
      type: constants.AUTHENTICATION_LOGIN.SUCCESS,
      user
    });
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_LOGIN.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchLogin() {
  yield takeLatest(constants.AUTHENTICATION_LOGIN.REQUEST, login);
}

export function* logout() {
  yield call(authApi.logout);
}

export function* watchLogout() {
  yield takeLatest(constants.AUTHENTICATION_LOGOUT.REQUEST, logout);
}

export function* updateDetails(action) {
  try {
    const { data } = yield call(usersApi.updateDetails, { ...action });
    const user = {
      ...data,
      isAdministrator: data.is_admin,
      creationDate: moment(data.creation_date)
    };
    yield put({ type: constants.AUTHENTICATION_UPDATE_DETAILS.SUCCESS, user });
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_UPDATE_DETAILS.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
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
