import { all, call, put, takeLatest } from 'redux-saga/effects';

import { addPostSuccess, addPostFailure } from './actions';

import api from '~/services/api';

export function* addPosts({ payload }) {
  try {
    const { data } = payload;
    const posts = yield call(api.posts, 'posts', data);

    yield put(addPostSuccess(posts));
  } catch (err) {
    console.tron.log(err);
    yield put(addPostFailure());
  }
}

export default all([takeLatest('@posts/ADD_POSTS_REQUEST', addPosts)]);
