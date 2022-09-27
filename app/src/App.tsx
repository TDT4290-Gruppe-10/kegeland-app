import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';

import {store} from '~state/store';
import WithBluetooth from '~hoc/WithBluetooth';

import Router from './routes';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <WithBluetooth>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </WithBluetooth>
    </ReduxProvider>
  );
}
