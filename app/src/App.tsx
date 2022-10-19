import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '~state/store';
import withAppWrapper from '~hoc/withAppWrapper';

import Router from './routes';

const Wrapper = withAppWrapper(SafeAreaProvider);

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
