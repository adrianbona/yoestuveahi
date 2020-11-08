import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/locations';
import * as api from '../api/locations';

export function* getLocations() {
  try {
    const { data: locations } = yield call(api.getLocations);
    yield put({
      type: constants.LOCATIONS_GET.SUCCESS,
      locations
    });
  } catch (e) {
    yield put({
      type: constants.LOCATIONS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetLocations() {
  yield takeLatest(constants.LOCATIONS_GET.REQUEST, getLocations);
}

export function* createLocation(action) {
  try {
    const { data: location } = yield call(api.createLocation, { ...action });
    console.log(location);
    yield put({ type: constants.LOCATIONS_CREATE.SUCCESS, location });
  } catch (e) {
    yield put({
      type: constants.LOCATIONS_CREATE.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchCreateLocation() {
  yield takeLatest(constants.LOCATIONS_CREATE.REQUEST, createLocation);
}

function* rootSaga() {
  const watchers = [watchGetLocations, watchCreateLocation];
  yield all(watchers.map(fork));
}

export default rootSaga;
