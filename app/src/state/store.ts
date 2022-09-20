import {combineReducers, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import counterReducer from './ducks/counter/counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger);
  },
  devTools: true, // process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
