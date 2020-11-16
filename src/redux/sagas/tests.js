import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { constants } from '../modules/tests';
import * as api from '../api/tests';

export function* getTests() {
  try {
    const { data: tests } = yield call(api.getTests);
    yield put({
      type: constants.TESTS_GET.SUCCESS,
      tests: tests.map(test => {
        return {
          ...test,
          dateTaken: moment(test.date_taken),
          isPositive: test.is_positive,
          takenBy: test.taken_by_name
        };
      })
    });
  } catch (e) {
    yield put({
      type: constants.TESTS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetTests() {
  yield takeLatest(constants.TESTS_GET.REQUEST, getTests);
}

export function* loadTest(action) {
  try {
    const { data } = yield call(api.loadTest, { ...action });
    const test = {
      ...data,
      dateTaken: moment(data.date_taken),
      isPositive: data.is_positive,
      takenBy: data.taken_by_name
    };
    yield put({ type: constants.TESTS_LOAD.SUCCESS, test });
  } catch (e) {
    yield put({
      type: constants.TESTS_LOAD.FAILURE,
      message:
        typeof e.response.data === 'string'
          ? e.response.data
          : e.request.response || e.message || e
    });
  }
}

export function* watchLoadTest() {
  yield takeLatest(constants.TESTS_LOAD.REQUEST, loadTest);
}

function* rootSaga() {
  const watchers = [watchGetTests, watchLoadTest];
  yield all(watchers.map(fork));
}

export default rootSaga;
