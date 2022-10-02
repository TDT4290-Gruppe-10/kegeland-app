import React from 'react';
import {Switch, useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {setDarkMode} from '~state/ducks/settings/settings.reducer';

export type ThemeSwitchProps = {
  color: string;
  style?:
    | {
        marginRight: number;
        marginVertical?: number | undefined;
      }
    | undefined;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.settings.isDarkMode);
  const toggle = () => {
    dispatch(setDarkMode(!darkMode));
  };
  return (
    <Switch
      {...props}
      color={colors.primary}
      value={darkMode}
      onValueChange={() => toggle()}
    />
  );
};

export default ThemeSwitch;
