import configureMockStore from 'redux-mock-store';
import {getDefaultMiddleware} from '@reduxjs/toolkit';

import {initialState as appState} from '~state/ducks/app/app.reducer';
import {initialState as authState} from '~state/ducks/auth/auth.reducer';
import {initialState as bluetoothState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {initialState as questionsState} from '~state/ducks/questions/questions.reducer';
import {initialState as sessionState} from '~state/ducks/session/session.reducer';
import {RootState} from '~state/store';

export const initialStore: Omit<RootState, '_persist'> = {
  app: appState,
  auth: authState,
  bluetooth: bluetoothState,
  questions: questionsState,
  session: sessionState,
};

export const mockStore = configureMockStore(getDefaultMiddleware());
