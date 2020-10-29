import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/clients';
import * as api from '../api/clients';

export function* getClients(action) {
  try {
    const { page, pageSize, clients } = yield call(api.getClients, {
      ...action
    });

    yield put({
      type: constants.CLIENTS_GET.SUCCESS,
      page,
      pageSize,
      clients
    });
  } catch (e) {
    yield put({
      type: constants.CLIENTS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetClients() {
  yield takeLatest(constants.CLIENTS_GET.REQUEST, getClients);
}

export function* getClient(action) {
  try {
    const client = yield call(api.getClient, {
      ...action
    });

    yield put({
      type: constants.CLIENT_GET.SUCCESS,
      client
    });
  } catch (e) {
    yield put({
      type: constants.CLIENT_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetClient() {
  yield takeLatest(constants.CLIENT_GET.REQUEST, getClient);
}

function* rootSaga() {
  const watchers = [watchGetClients, watchGetClient];
  yield all(watchers.map(fork));
}

export default rootSaga;
