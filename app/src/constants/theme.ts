import {merge} from 'lodash';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';

const defaultLightTheme = merge(NavigationLightTheme, PaperLightTheme);
const defaultDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

type Theme = typeof defaultLightTheme;

export const lightTheme: Theme = {
  ...defaultLightTheme,
  roundness: 15,
  colors: {
    ...defaultLightTheme.colors,
    primary: '#D25660',
    text: '#333',
  },
};
export const darkTheme: Theme = {
  ...defaultDarkTheme,
  colors: {...defaultDarkTheme.colors, primary: '#D25660'},
};
