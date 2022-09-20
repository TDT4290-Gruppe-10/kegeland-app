import createSagaMiddleware from '@redux-saga/core';
import {all} from 'redux-saga/effects';

export const sagaMiddleware = createSagaMiddleware();

const rootSaga = function* rootSaga() {
  yield all([]);
};

export default rootSaga;
