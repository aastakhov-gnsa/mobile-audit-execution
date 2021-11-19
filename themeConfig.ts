import {configureFonts, DefaultTheme, DarkTheme} from 'react-native-paper';

const fontFamilies = {
  regular: {
    fontFamily: 'Roboto-Regular',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
  },
  light: {
    fontFamily: 'Roboto-Light',
  },
  thin: {
    fontFamily: 'Roboto-Regular',
  },
};
const fontConfig = {
  default: fontFamilies,
  ios: fontFamilies,
  android: fontFamilies,
};

const defaultTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00A3ED', // - primary color for your app, usually your brand color.
    accent: 'rgba(126, 126, 126, 0.2)', // - secondary color for your app which complements the primary color.
    background: '#FFFFFF', // - background color for pages, such as lists.
    surface: '#FFFFFF', // - background color for elements containing content, such as cards.
    text: '#141414', // - text color for content.
    disabled: '#898989', // - color for disabled elements.
    placeholder: '#898989', // - color for placeholder text, such as input placeholder.
    backdrop: 'rgba(20, 20, 20, 0.35)', // - color for backdrops of various components such as modals.
    onSurface: 'rgba(20, 20, 20, 0.8)', // - background color for snackbars
    notification: 'rgba(20, 20, 20, 0.35)', // - background color for badges
    onBackground100: '#141414',
    onBackground50: '#898989',
    onBackground20: '#D0D0D0',
    onBackground10: '#E8E8E8',
    onBackgroundAlpha35: 'rgba(20, 20, 20, 0.35)',
    text50: '#898989',
    error: '#E07070',
    yellow: '#FF982B',
    green: '#85BB60',
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
