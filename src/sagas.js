import { call, put, takeLatest, all } from 'redux-saga/effects';
import { Posts } from './constants';
import { PostsAPI } from './api';
import { fetchPostsSuccess, fetchPostsError } from './actions';

const postsApi = new PostsAPI();

function* getPostsFromApi(action) {
  try {
    const data = yield call(postsApi.fetchPosts, { response: action.payload });
    console.log(data);
    yield put(fetchPostsSuccess(data));
  } catch (e) {
    yield put(fetchPostsError(e));
  }
}

function* getPosts(action) {
  yield takeLatest(Posts.fetchPosts, getPostsFromApi);
}

function* getPostsSuccess() {}

export default function* rootSaga() {
  yield all([getPosts()]);
}
