import {merge} from 'lodash';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from 'react-native-paper';

const defaultLightTheme = merge(NavigationLightTheme, PaperLightTheme);
const defaultDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

type Theme = typeof defaultLightTheme;

export const lightTheme: Theme = {
  ...defaultLightTheme,
  roundness: 3,
  colors: {
    ...defaultLightTheme.colors,
    primary: '#00b0ff', // '#D25660',
    text: '#333',
  },
};
export const darkTheme: Theme = {
  ...defaultDarkTheme,
  roundness: 3,
  colors: {...defaultDarkTheme.colors, primary: '#D25660'},
};
