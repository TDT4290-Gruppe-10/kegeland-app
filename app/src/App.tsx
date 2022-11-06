import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '~state/store';
import withAppWrapper from '~hoc/withAppWrapper';
import withThemedNavigation from '~hoc/withThemedNavigation';

import Router from './routes/Router';

const Wrapper = withAppWrapper(SafeAreaProvider);
const ThemedRouter = withThemedNavigation(Router);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrapper>
          <ThemedRouter />
        </Wrapper>
      </PersistGate>
    </ReduxProvider>
  );
}
