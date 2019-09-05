import { all, call, put, takeLatest } from 'redux-saga/effects';

import { addPostSuccess, addPostFailure } from './actions';

import api from '../../../services/api';

export function* addPosts({ payload }) {}

export default all([takeLatest('@posts/ADD_POSTS_REQUEST', addPosts)]);
