import { all } from 'redux-saga/effects';

import post from './post/sagas';

export default function* rootSaga() {
  return yield all([post]);
}
