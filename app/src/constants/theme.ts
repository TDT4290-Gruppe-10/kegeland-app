import {cloneDeep, merge} from 'lodash';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Theme,
} from 'react-native-paper';

export type ThemeOverride = Theme['colors'] & {
  muted: string;
  elevation: {
    elevation1: string;
  };
  status: {
    success: string;
    alert: string;
    error: string;
  };
};

const baseOverride: Partial<Omit<Theme, 'colors'>> = {
  roundness: 15,
};

const sharedColorOverride: Partial<ThemeOverride> = {
  primary: '#00b0ff',
  status: {
    success: '#64dd17',
    alert: '#ffd600',
    error: '#dd2c00',
  },
};

const lightColorOverride: Partial<Theme['colors']> = merge(
  cloneDeep(sharedColorOverride),
  {
    muted: 'rgba(0, 0, 0, 0.54)',
    elevation: {
      elevation1: '#fff',
    },
  } as ThemeOverride,
);

const darkColorOverride: Partial<Theme['colors']> = merge(
  cloneDeep(sharedColorOverride),
  {
    muted: 'rgba(229, 229, 231, 0.54)',
    elevation: {
      elevation1: '#272727',
    },
  } as ThemeOverride,
);

export const lightTheme = merge(merge(NavigationLightTheme, PaperLightTheme), {
  ...baseOverride,
  colors: lightColorOverride,
});
export const darkTheme = merge(merge(PaperDarkTheme, NavigationDarkTheme), {
  ...baseOverride,
  colors: darkColorOverride,
});
