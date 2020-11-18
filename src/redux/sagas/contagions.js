import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/contagions';
import * as api from '../api/contagions';

export function* getContagions() {
  try {
    const { data: contagions } = yield call(api.getContagions);
    yield put({
      type: constants.CONTAGIONS_GET.SUCCESS,
      contagions: contagions.map(contagion => {
        return {
          ...contagion,
          reportedOn: moment(contagion.reported_on)
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

export function* watchGetContagions() {
  yield takeLatest(constants.CONTAGIONS_GET.REQUEST, getContagions);
}

function* rootSaga() {
  const watchers = [watchGetContagions];
  yield all(watchers.map(fork));
}

export default rootSaga;
