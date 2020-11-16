import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants as userConstants } from '../modules/users';
import { constants as authConstants } from '../modules/authentication';
import * as api from '../api/users';

export function* getUsers() {
  try {
    const { data: users } = yield call(api.getUsers);
    yield put({
      type: userConstants.USERS_GET.SUCCESS,
      users: users.map(user => {
        return {
          ...user,
          isAdministrator: user.is_admin,
          createdAt: moment(user.creation_date)
        };
      })
    });
  } catch (e) {
    yield put({
      type: userConstants.USERS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* refreshUsers() {
  try {
    const { data: users } = yield call(api.getUsers);
    yield put({
      type: userConstants.USERS_REFRESH.SUCCESS,
      users: users.map(user => {
        return {
          ...user,
          isAdministrator: user.is_admin,
          createdAt: moment(user.creation_date)
        };
      })
    });
    yield put({
      type: authConstants.AUTHENTICATION_REFRESH,
      users
    });
  } catch (e) {
    yield put({
      type: userConstants.USERS_REFRESH.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetUsers() {
  yield takeLatest(userConstants.USERS_GET.REQUEST, getUsers);
}

export function* watchRefreshUsers() {
  yield takeLatest(userConstants.USERS_REFRESH.REQUEST, refreshUsers);
}

function* rootSaga() {
  const watchers = [watchGetUsers, watchRefreshUsers];
  yield all(watchers.map(fork));
}

export default rootSaga;
