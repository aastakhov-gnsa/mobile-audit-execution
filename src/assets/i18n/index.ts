import {Resource} from 'i18next';
import en from './en.json';
import ru from './ru.json';
import de from './de.json';
import da from './da.json';
import es from './es.json';
import it from './it.json';
import {default as nb} from './no.json';
import sv from './sv.json';
import pt from './pt.json';
import {default as zh} from './cn.json';
import fr from './fr.json';
import hu from './hu.json';
import pl from './pl.json';
import th from './th.json';
import fi from './fi.json';

const languageResources: Resource = {
  en,
  ru,
  de,
  da,
  es,
  it,
  nb,
  sv,
  pt,
  zh,
  fr,
  hu,
  pl,
  th,
  fi,
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
