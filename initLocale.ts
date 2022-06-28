import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import languageResources from './src/assets/i18n';

function initLocale(lang: string) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: languageResources,
    lng: lang,
    interpolation: {
      escapeValue: false,
    },
  });
  return i18n;
}

export default initLocale;
