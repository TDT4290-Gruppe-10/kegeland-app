import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '~state/store';
import withBluetooth from '~hoc/withBluetooth';

import Router from './routes';

const Wrapper = withBluetooth(SafeAreaProvider);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrapper>
          <Router />
        </Wrapper>
      </PersistGate>
    </ReduxProvider>
  );
}
