import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/notifications';
import * as api from '../api/notifications';

export function* getNotifications() {
  try {
    const { data: notifications } = yield call(api.getNotifications);
    yield put({
      type: constants.NOTIFICATIONS_GET.SUCCESS,
      notifications: notifications.map(notification => {
        return {
          ...notification,
          locationName: notification.location_name,
          createdAt: moment(notification.created_at)
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.NOTIFICATIONS_GET.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchGetNotifications() {
  yield takeLatest(constants.NOTIFICATIONS_GET.REQUEST, getNotifications);
}

export function* markNotificationAsRead(action) {
  try {
    const { data: notification } = yield call(
      api.markNotificationAsRead,
      action
    );
    yield put({
      type: constants.NOTIFICATIONS_MARK_AS_READ.SUCCESS,
      notification: {
        ...notification,
        locationName: notification.location_name,
        createdAt: moment(notification.created_at)
      }
    });
  } catch (e) {
    yield put({
      type: constants.NOTIFICATIONS_MARK_AS_READ.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchMarkNotificationAsRead() {
  yield takeLatest(
    constants.NOTIFICATIONS_MARK_AS_READ.REQUEST,
    markNotificationAsRead
  );
}

function* rootSaga() {
  const watchers = [watchGetNotifications, watchMarkNotificationAsRead];
  yield all(watchers.map(fork));
}

export default rootSaga;
