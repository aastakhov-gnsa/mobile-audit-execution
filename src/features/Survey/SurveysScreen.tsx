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
import {format, toDate} from 'date-fns';
import {useSelector} from '../../utils/store/configureStore';
import {QueryStatus} from '@reduxjs/toolkit/query';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterItem, FilterValues} from '../../interfaces/filters';
import {EMPTY_ARRAY} from '../../constants/constants';

enum SurveysFilters {
  allSurveys = 'All Surveys',
  downloadable = 'Downloadable',
  inProgress = 'In progress',
  finished = 'Finished',
}

const possibleFilters: FilterValues = [
  {
    fieldName: ScreenNames.Surveys,
    value: SurveysFilters.downloadable,
  },
  {
    fieldName: ScreenNames.Surveys,
    value: SurveysFilters.inProgress,
  },
  {
    fieldName: ScreenNames.Surveys,
    value: SurveysFilters.finished,
  },
];

function SurveysScreen() {
  const filter = useSelector(
    state => state.filters?.[ScreenNames.Surveys]?.[ScreenNames.Surveys],
  );
  const {
    data: wholeData,
    error,
    isLoading,
    fulfilledTimeStamp,
  } = useAllSurveysQuery('');

  const data = useFilteredSurveys(filter, wholeData);

  const keyExtractor = React.useCallback((item: Survey) => item.id, []);

  const renderItem = React.useCallback(({item}: {item: Survey}) => {
    return <SurveyCard survey={item} key={item.id} />;
  }, []);

  if (isLoading) {
    return <Spinner inProgress />;
  }
  console.log('-------');
  console.log('wholeData', wholeData);
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
          leftCaption={`${
            filter?.value ? filter.value : SurveysFilters.allSurveys
          } · ${data?.length ?? 0}`}
          rightCaption={`Updated ${
            fulfilledTimeStamp
              ? format(toDate(fulfilledTimeStamp), 'PPP kk:mm')
              : ''
          }`}
        />
        <Filters
          screenName={ScreenNames.Surveys}
          filterValues={possibleFilters}
          id={ScreenNames.Surveys}
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

function useFilteredSurveys(filter: FilterItem, wholeData?: Survey[]) {
  const downloadableData = useSelector(state => {
    return wholeData?.filter(
      i =>
        state.surveyApi.queries[`survey("${i.id}")`]?.status !==
        QueryStatus.fulfilled,
    );
  });
  const inProgressData = useSelector(state => {
    return wholeData?.filter(
      i =>
        state.surveyApi.queries[`survey("${i.id}")`]?.status ===
        QueryStatus.fulfilled,
    );
  });

  return React.useMemo(() => {
    if (!wholeData) {
      return EMPTY_ARRAY;
    }

    let data;

    switch (filter?.value) {
      case SurveysFilters.downloadable:
        data = downloadableData;
        break;
      case SurveysFilters.inProgress:
        data = inProgressData;
        break;
      case SurveysFilters.finished:
        data = wholeData; //todo filter finished already surveys
        break;
      default:
        data = wholeData;
    }
    return data;
  }, [downloadableData, filter?.value, inProgressData, wholeData]);
}
