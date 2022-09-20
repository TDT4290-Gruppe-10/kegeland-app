import createSagaMiddleware from '@redux-saga/core';
import {all, fork} from 'redux-saga/effects';

import {counterSaga} from './ducks/counter/counter.saga';

export const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* rootSaga() {
  yield all([fork(counterSaga)]);
};

export default rootSaga;
