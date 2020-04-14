import { all, fork } from 'redux-saga/effects';

import categories from './categories';
import questions from './questions';

export default function* rootSaga() {
  yield all([fork(categories), fork(questions)]);
}
