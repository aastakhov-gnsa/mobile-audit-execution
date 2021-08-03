import React from 'react';
import useFetch from '../../hooks/useFetch';
import Spinner from '../Auth/components/Spinner';
import {Survey} from '../../interfaces/survey';
import SurveyCard from '../../components/SurveyCard';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';

function HomeScreen() {
  // const [data, error, isLoading] = useFetch(
  //   'https://gnsa-dev.i.daimler.com/api/v1/data/smaudit/smAudit?_limit=5&_page=1',
  // );
  const {data, error} = useFetch<Survey[]>( // fixme temp hook
    'http://localhost:8080/api/v1/mobile-audit-execution/surveys',
    // 'https://gnsa-dev.i.daimler.com/api/v1/authenticate',
    // 'http://localhost:8080/api/v1/auth/authenticate',
    // 'https://sso-int.daimler.com/idp/userinfo.openid',
  );
  if (!data) {
    return <Spinner inProgress />;
  }
  console.log('-------');
  console.log('data', data);
  console.log('error', error);
  return (
    <ListContainer>
      <ListInfoCaption
        leftCaption={`All Surveys · ${data.length}`}
        rightCaption="Updated /date here/"
      />
      {data?.map(survey => {
        return <SurveyCard survey={survey} key={survey.id} />;
      })}
    </ListContainer>
  );
}

export default React.memo(HomeScreen);
