import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '~state/store';
import WithBluetooth from '~hoc/WithBluetooth';

import Router from './routes';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WithBluetooth>
          <SafeAreaProvider>
            <Router />
          </SafeAreaProvider>
        </WithBluetooth>
      </PersistGate>
    </ReduxProvider>
  );
}
