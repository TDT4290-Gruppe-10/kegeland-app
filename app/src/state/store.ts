import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import bluetoothReducer from './ducks/bluetooth/bluetooth.reducer';
import settingsReducer from './ducks/settings/settings.reducer';

import rootSaga, {sagaMiddleware} from './rootSaga';

const rootReducer = combineReducers({
  settings: settingsReducer,
  bluetooth: bluetoothReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger).concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
