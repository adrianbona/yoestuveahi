import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { constants } from '../modules/notifications';
import * as api from '../api/notifications';

export function* getNotifications() {
  try {
    const { data: notifications } = yield call(api.getNotifications);
    yield put({
      type: constants.NOTIFICATIONS_GET.SUCCESS,
      notifications: notifications.map(notification => {
        return {
          ...notification
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.NOTIFICATIONS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetNotifications() {
  yield takeLatest(constants.NOTIFICATIONS_GET.REQUEST, getNotifications);
}

function* rootSaga() {
  const watchers = [watchGetNotifications];
  yield all(watchers.map(fork));
}

export default rootSaga;
