import React from 'react';
import {useSelector} from '../utils/store/configureStore';

export default function useStandardData(surveyId: string, standardId: string) {
  const data = useSelector(state =>
    state.evaluation[surveyId].standards?.find(i => i.id === standardId),
  );
  return React.useMemo(() => {
    return data;
  }, [data]);
}
