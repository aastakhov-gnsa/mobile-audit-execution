import {format} from 'date-fns';
import {enGB, ru} from 'date-fns/locale';
import {localeCode} from '../../..';

const localeMap: Record<string, any> = {
  en: enGB,
  ru: ru,
};

export default function (date: Date, formatStr = 'PPP kk:mm') {
  return format(date, formatStr, {
    locale: localeMap[localeCode],
  });
}
