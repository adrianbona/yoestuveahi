import {
  all, fork, call, put, takeLatest
} from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/locations';
import * as api from '../api/locations';

export function* getLocations() {
  try {
    const { data: locations } = yield call(api.getLocations);
    yield put({
      type: constants.LOCATIONS_GET.SUCCESS,
      locations: locations.map((location) => {
        return {
          ...location,
          currentCapacity: location.current_capacity,
          maximumCapacity: location.maximum_capacity,
          openingTime: moment(location.opening_time),
          closingTime: moment(location.closing_time),
          createdAt: moment(location.created_at),
          createdBy: location.created_by,
          siteSource: location.site_source,
          externalId: location.external_id
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.LOCATIONS_GET.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchGetLocations() {
  yield takeLatest(constants.LOCATIONS_GET.REQUEST, getLocations);
}

export function* createLocation(action) {
  try {
    const { data } = yield call(api.createLocation, { ...action });
    const location = {
      ...data,
      currentCapacity: data.current_capacity,
      maximumCapacity: data.maximum_capacity,
      openingTime: moment(data.opening_time),
      closingTime: moment(data.closing_time),
      createdAt: moment(data.created_at),
      createdBy: data.created_by,
      siteSource: data.site_source,
      externalId: data.external_id
    };
    yield put({ type: constants.LOCATIONS_CREATE.SUCCESS, location });
  } catch (e) {
    yield put({
      type: constants.LOCATIONS_CREATE.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
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
