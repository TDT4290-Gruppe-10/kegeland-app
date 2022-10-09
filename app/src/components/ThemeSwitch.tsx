import React from 'react';
import {Switch, useTheme} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {updateSetting} from '~state/ducks/app/app.actions';

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
  const {darkMode} = useAppSelector((state) => state.app.settings);
  const toggle = () => {
    dispatch(updateSetting<'darkMode'>({key: 'darkMode', value: !darkMode}));
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
