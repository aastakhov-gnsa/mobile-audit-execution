import React from 'react';
import Spinner from '../Auth/components/Spinner';
import SurveyCard from '../../components/SurveyCard';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';
import {useAllSurveysQuery} from '../Survey/surveyService';

function HomeScreen() {
  // const [data, error, isLoading] = useFetch(
  //   'https://gnsa-dev.i.daimler.com/api/v1/data/smaudit/smAudit?_limit=5&_page=1',
  // );
  const {data, error, isLoading} = useAllSurveysQuery('');
  if (isLoading) {
    return <Spinner inProgress />;
  }
  console.log('-------');
  console.log('data', data);
  console.log('error', error);
  return (
    <ListContainer>
      <ListInfoCaption
        leftCaption={`All Surveys · ${data?.length ?? 0}`}
        rightCaption="Updated /date here/"
      />
      {data?.map(survey => {
        return <SurveyCard survey={survey} key={survey.id} />;
      })}
    </ListContainer>
  );
}

export default React.memo(HomeScreen);
