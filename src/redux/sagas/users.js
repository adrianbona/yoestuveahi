import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/users';
import * as api from '../api/users';

export function* getUsers() {
  try {
    const { data: users } = yield call(api.getUsers);
    yield put({
      type: constants.USERS_GET.SUCCESS,
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
      type: constants.USERS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetUsers() {
  yield takeLatest(constants.USERS_GET.REQUEST, getUsers);
}

function* rootSaga() {
  const watchers = [watchGetUsers];
  yield all(watchers.map(fork));
}

export default rootSaga;
