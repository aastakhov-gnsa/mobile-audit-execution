import React from 'react';
import {useAllSurveysQuery} from './surveyService';
import Spinner from '../Auth/components/Spinner';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';
import SurveyCard from '../../components/SurveyCard';
import {FlatList} from 'react-native-gesture-handler';
import {Alert, StatusBar} from 'react-native';
import {Survey} from '../../interfaces/survey';
import themeConfig from '../../../themeConfig';
import ScreenContainer from '../../components/ScreenContainer';
import {format, toDate} from 'date-fns';
import {useSelector} from '../../utils/store/configureStore';
import {skipToken} from '@reduxjs/toolkit/query';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterItem, FilterValues} from '../../interfaces/filters';
import {EMPTY_ARRAY} from '../../constants/constants';
import NetInfo from '@react-native-community/netinfo';

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
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);
  const filter = useSelector(
    state => state.filters?.[ScreenNames.Surveys]?.[ScreenNames.Surveys],
  );
  const {
    data: wholeData,
    error,
    isLoading,
  } = useAllSurveysQuery(isConnected ? '' : skipToken);
  const {fulfilledTimeStamp} = useSelector(state => state.surveys);

  const data = useFilteredSurveys(filter, wholeData);

  const keyExtractor = React.useCallback((item: Survey) => item.id, []);

  const renderItem = React.useCallback(({item}: {item: Survey}) => {
    return <SurveyCard survey={item} key={item.id} />;
  }, []);

  if (isLoading) {
    return <Spinner inProgress />;
  }

  if (error) {
    Alert.alert('Error', JSON.stringify(error, null, 2));
  }

  console.log('--SurveysScreen');
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
          rightCaption={
            fulfilledTimeStamp
              ? `Updated ${format(toDate(fulfilledTimeStamp), 'PPP kk:mm')}`
              : ''
          }
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
  const {downloadedData, downloadedDataKeys} = useSelector(state => ({
    downloadedData: Object.values(state.evaluation),
    downloadedDataKeys: Object.keys(state.evaluation),
  }));
  const downloadableData = wholeData?.filter(
    i => !downloadedDataKeys.includes(i.id) ?? EMPTY_ARRAY,
  );

  return React.useMemo(() => {
    let data;

    switch (filter?.value) {
      case SurveysFilters.downloadable:
        data = downloadableData;
        break;
      case SurveysFilters.inProgress:
        data = downloadedData.filter(i => i.resultCd === 'Open');
        break;
      case SurveysFilters.finished:
        data = downloadedData.filter(i => i.resultCd !== 'Open');
        break;
      default:
        data = (wholeData ? wholeData : downloadedData) ?? EMPTY_ARRAY;
    }
    return data;
  }, [downloadableData, downloadedData, filter?.value, wholeData]);
}
