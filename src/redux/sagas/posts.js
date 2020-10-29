import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/posts';
import * as api from '../api/posts';

export function* getPosts(action) {
  try {
    const { data: posts } = yield call(api.getPosts);
    yield put({
      type: constants.POSTS_GET.SUCCESS,
      posts
    });
  } catch (e) {
    yield put({
      type: constants.POSTS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetPosts() {
  yield takeLatest(constants.POSTS_GET.REQUEST, getPosts);
}

function* rootSaga() {
  const watchers = [watchGetPosts];
  yield all(watchers.map(fork));
}

export default rootSaga;
