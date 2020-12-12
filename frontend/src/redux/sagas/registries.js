import {
  all, fork, call, put, takeLatest
} from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/registries';
import * as api from '../api/registries';

export function* getRegistries() {
  try {
    const { data: registries } = yield call(api.getRegistries);
    yield put({
      type: constants.REGISTRIES_GET.SUCCESS,
      registries: registries.map((registry) => {
        return {
          ...registry,
          customerName: registry.registered_by_name,
          locationName: registry.included_in_name,
          entranceTime: moment(registry.entrance_time),
          exitTime: moment(registry.exit_time)
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.REGISTRIES_GET.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchGetRegistries() {
  yield takeLatest(constants.REGISTRIES_GET.REQUEST, getRegistries);
}

export function* createRegistry(action) {
  try {
    yield call(api.createRegistry, action.data);
    const { data: registries } = yield call(api.getRegistries);
    yield put({
      type: constants.REGISTRIES_CREATE.SUCCESS,
      registries: registries.map((registry) => {
        return {
          ...registry,
          customerName: registry.registered_by_name,
          locationName: registry.included_in_name,
          entranceTime: moment(registry.entrance_time),
          exitTime: moment(registry.exit_time)
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.REGISTRIES_CREATE.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchCreateRegistry() {
  yield takeLatest(constants.REGISTRIES_CREATE.REQUEST, createRegistry);
}

function* rootSaga() {
  const watchers = [watchGetRegistries, watchCreateRegistry];
  yield all(watchers.map(fork));
}

export default rootSaga;
