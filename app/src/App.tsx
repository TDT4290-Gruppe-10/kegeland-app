import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';

import {store, persistor} from '~state/store';
import WithBluetooth from '~hoc/WithBluetooth';

import Router from './routes';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WithBluetooth>
          <SafeAreaProvider>
            <PaperProvider>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </PaperProvider>
          </SafeAreaProvider>
        </WithBluetooth>
      </PersistGate>
    </ReduxProvider>
  );
}
