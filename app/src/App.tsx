import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import {store} from '~state/store';
import WithBluetooth from '~hoc/WithBluetooth';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <WithBluetooth>
        <SafeAreaProvider>
          <PaperProvider>
            <Text>Render</Text>
          </PaperProvider>
        </SafeAreaProvider>
      </WithBluetooth>
    </ReduxProvider>
  );
}
