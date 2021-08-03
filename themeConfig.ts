import {configureFonts, DefaultTheme} from 'react-native-paper';

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

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

export default {
  theme,
};
