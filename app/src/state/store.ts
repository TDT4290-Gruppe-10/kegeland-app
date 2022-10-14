import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import reduxFlipper from 'redux-flipper';

import appReducer from './ducks/app/app.reducer';
import bluetoothReducer from './ducks/bluetooth/bluetooth.reducer';
import authReducer from './ducks/auth/auth.reducer';

import rootSaga, {sagaMiddleware} from './rootSaga';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['app', 'auth', 'bluetooth'],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  bluetooth: bluetoothReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(logger)
      .concat(reduxFlipper())
      .concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
