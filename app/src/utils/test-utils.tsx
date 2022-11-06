/* istanbul ignore file */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {render, RenderOptions} from '@testing-library/react-native';
import {Provider as ReduxProvider} from 'react-redux';

import {store} from '~state/store';
import {lightTheme} from '~constants/theme';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';

type TestWrapperProps = {
  children: React.ReactNode;
  store?: typeof store;
};

export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <ReduxProvider store={props.store || mockStore(initialStore)}>
      <PaperProvider theme={lightTheme}>
        <NavigationContainer theme={lightTheme}>{children}</NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};
export const customRender = <T extends any>(
  ui: React.ReactElement<T>,
  options?: {
    wrapperProps?: {
      store: any;
    };
    renderOptions?: RenderOptions;
  },
) =>
  render(ui, {
    wrapper: (props) => <TestWrapper {...props} {...options?.wrapperProps} />,
    ...options?.renderOptions,
  });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
