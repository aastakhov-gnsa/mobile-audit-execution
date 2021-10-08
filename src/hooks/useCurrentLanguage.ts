import {useSelector} from '../utils/store/configureStore';
import React from 'react';

export default function useCurrentLanguage(): [string, boolean] {
  const currentLanguageCd = useSelector(state => state.dataLanguage.languageCd);
  return React.useMemo(() => {
    return [currentLanguageCd, currentLanguageCd !== 'eng'];
  }, [currentLanguageCd]);
}
