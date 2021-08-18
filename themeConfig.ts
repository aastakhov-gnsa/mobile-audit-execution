import {configureFonts, DefaultTheme, DarkTheme} from 'react-native-paper';

const fontFamilies = {
  regular: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
  },
  light: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '300',
  },
  thin: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '100',
  },
};
const fontConfig = {
  default: fontFamilies,
  ios: fontFamilies,
  android: fontFamilies,
};

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#176DB7', // - primary color for your app, usually your brand color.
    accent: '#00A3ED', // - secondary color for your app which complements the primary color.
    background: '#FFFFFF', // - background color for pages, such as lists.
    surface: '#FFFFFF', // - background color for elements containing content, such as cards.
    text: '#141414', // - text color for content.
    disabled: '#898989', // - color for disabled elements.
    placeholder: '#898989', // - color for placeholder text, such as input placeholder.
    backdrop: 'rgba(20, 20, 20, 0.35)', // - color for backdrops of various components such as modals.
    onSurface: 'rgba(20, 20, 20, 0.8)', // - background color for snackbars
    notification: 'rgba(20, 20, 20, 0.35)', // - background color for badges
  },
  fonts: configureFonts(fontConfig),
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#FFFFFF',
  },
  fonts: configureFonts(fontConfig),
};

export default {
  defaultTheme,
  darkTheme,
};
