import React, {useCallback} from 'react';
import Spinner from '../Auth/components/Spinner';
import SurveyCard from '../../components/SurveyCard';
import ListInfoCaption from '../../components/ListInfoCaption';
import {useAllSurveysQuery} from '../Survey/surveyService';
import {FlatList} from 'react-native-gesture-handler';
import {Survey} from '../../interfaces/survey';
import {StyleSheet, View} from 'react-native';

function HomeScreen() {
  const {data, error, isLoading} = useAllSurveysQuery('');

  const keyExtractor = useCallback((item: Survey) => item.id, []);

  const renderItem = useCallback(({item}: {item: Survey}) => {
    return <SurveyCard survey={item} key={item.id} />;
  }, []);

  if (isLoading) {
    return <Spinner inProgress />;
  }
  console.log('-------');
  console.log('data', data);
  console.log('error', error);
  return (
    <View style={styles.scrollView}>
      <ListInfoCaption
        leftCaption={`All Surveys · ${data?.length ?? 0}`}
        rightCaption="Updated /date here/"
      />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: '4%',
    paddingRight: '4%',
    height: '100%',
  },
});

export default React.memo(HomeScreen);
