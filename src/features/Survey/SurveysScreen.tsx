import React from 'react';
import {useAllSurveysQuery} from './surveyService';
import Spinner from '../Auth/components/Spinner';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';
import SurveyCard from '../../components/SurveyCard';
import {FlatList} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {Survey} from '../../interfaces/survey';
import themeConfig from '../../../themeConfig';
import ScreenContainer from '../../components/ScreenContainer';
import {toDate, format} from 'date-fns';

function SurveysScreen() {
  const {data, error, isLoading, fulfilledTimeStamp} = useAllSurveysQuery('');

  const keyExtractor = React.useCallback((item: Survey) => item.id, []);

  const renderItem = React.useCallback(({item}: {item: Survey}) => {
    return <SurveyCard survey={item} key={item.id} />;
  }, []);

  if (isLoading) {
    return <Spinner inProgress />;
  }
  console.log('-------');
  console.log('data', data);
  console.log('error', error);
  return (
    <ScreenContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeConfig.defaultTheme.colors.onSurface}
      />
      <ListContainer>
        <ListInfoCaption
          leftCaption={`All Surveys · ${data?.length ?? 0}`}
          rightCaption={`Updated ${
            fulfilledTimeStamp ? format(toDate(fulfilledTimeStamp), 'PPP') : ''
          }`}
        />
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </ListContainer>
    </ScreenContainer>
  );
}

export default React.memo(SurveysScreen);
