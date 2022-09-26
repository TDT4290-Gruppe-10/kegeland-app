import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {store} from '~state/store';
import WithBluetooth from '~hoc/WithBluetooth';

import Router from './routes';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <WithBluetooth>
        <SafeAreaProvider>
          <PaperProvider>
            <NavigationContainer>
              <Router />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </WithBluetooth>
    </ReduxProvider>
  );
}
