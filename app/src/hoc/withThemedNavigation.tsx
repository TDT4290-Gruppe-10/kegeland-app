import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {darkTheme, lightTheme} from '~constants/theme';
import useAppSelector from '~hooks/useAppSelector';

const getTheme = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};

/**
 * Wraps a component with a themed navigation container
 * @param Component the component to wrap
 * @returns wrapped component
 */
const withThemedNavigation =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    const {isDarkMode} = useAppSelector((state) => state.settings);
    const [theme, setTheme] = useState(getTheme(isDarkMode));

    useEffect(() => {
      setTheme(getTheme(isDarkMode));
    }, [isDarkMode]);

    return (
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Component {...props} />
        </NavigationContainer>
      </PaperProvider>
    );
  };

export default withThemedNavigation;