import React from 'react';
import {useAllSurveysQuery} from './surveyService';
import Spinner from '../Auth/components/Spinner';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';
import SurveyCard from '../../components/SurveyCard';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Survey} from '../../interfaces/survey';
import themeConfig from '../../../themeConfig';

function SurveysScreen() {
  const {data, error, isLoading} = useAllSurveysQuery('');

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
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeConfig.defaultTheme.colors.onSurface}
      />
      <ListContainer>
        <ListInfoCaption
          leftCaption={`All Surveys · ${data?.length ?? 0}`}
          rightCaption="Updated /date here/"
        />
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </ListContainer>
    </SafeAreaView>
  );
}

export default React.memo(SurveysScreen);
