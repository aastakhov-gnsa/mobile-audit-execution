import {Resource} from 'i18next';
import en from './en.json';
import ru from './ru.json';
import de from './de.json';

const languageResources: Resource = {
  en,
  ru,
  de,
};

export function getResources(customDictionary: Resource) {
  const result = {...languageResources};
  if (!customDictionary) {
    return result;
  }
  Object.keys(customDictionary).forEach(code => {
    const core = (languageResources[code]?.translation || {}) as Record<
      string,
      string
    >;
    const custom = customDictionary[code].translation as Record<string, string>;
    result[code] = {
      translation: {
        ...core,
        ...custom,
      },
    };
  });
  return result;
}

export default languageResources;
