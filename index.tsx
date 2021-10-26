import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, Platform, NativeModules} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import themeConfig from './themeConfig';
import initLocale from './initLocale';

const deviceLanguage: string =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const underscoreIndex = deviceLanguage.indexOf('_');
export const localeCode: string =
  underscoreIndex > 0
    ? deviceLanguage.substring(0, underscoreIndex)
    : deviceLanguage;
initLocale(localeCode);

function Main() {
  return (
    <PaperProvider theme={themeConfig.defaultTheme}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
