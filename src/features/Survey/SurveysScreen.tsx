import React, {useState} from 'react';
import {useAllSurveysQuery} from './surveyService';
import Spinner from '../Auth/components/Spinner';
import ListContainer from '../../components/ListContainer';
import ListInfoCaption from '../../components/ListInfoCaption';
import SurveyCard from '../../components/SurveyCard';
import {FlatList} from 'react-native-gesture-handler';
import {RefreshControl, StatusBar, StyleSheet} from 'react-native';
import {Survey} from '../../interfaces/survey';
import themeConfig from '../../../themeConfig';
import ScreenContainer from '../../components/ScreenContainer';
import {toDate} from 'date-fns';
import {useSelector} from '../../utils/store/configureStore';
import {skipToken} from '@reduxjs/toolkit/query';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterValues} from '../../interfaces/filters';
import {EMPTY_ARRAY} from '../../constants/constants';
import NetInfo from '@react-native-community/netinfo';
import NoSurveys from '../../components/NoSurveys';
import {useTranslation} from 'react-i18next';
import localizedFormat from '../../utils/date/localizedFormat';
import {notEvaluatedStatuses} from '../../interfaces/common';
import {useRoute} from '@react-navigation/native';
import {SurveysRouteParams} from '../../interfaces/navigation';
import {Portal, Snackbar} from 'react-native-paper';
import Typography from '../../components/Typography';
import GenericPopupModal from '../../components/GenericPopupModal';
import LogoutButton from '../../components/LogoutButton';

enum SurveysFilters {
  allSurveys = 'All Surveys',
  downloadable = 'Downloadable',
  inProgress = 'In Progress',
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
  const route = useRoute<SurveysRouteParams>();
  const {notification} = route.params ?? {};
  const [showNotification, setShowNotification] = useState(notification);
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);
  const filterValue = useSelector(
    state => state.filters?.[ScreenNames.Surveys]?.[ScreenNames.Surveys]?.value,
  );
  const {
    data: wholeData,
    isLoading,
    refetch,
    isError,
    isSuccess
  } = useAllSurveysQuery(isConnected ? '' : skipToken);
  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const {fulfilledTimeStamp} = useSelector(state => state.surveys);
  const data = useFilteredSurveys(filterValue, wholeData);

  const keyExtractor = React.useCallback((item: Survey) => item.id, []);

  const renderItem = React.useCallback(({item}: {item: Survey}) => {
    return <SurveyCard survey={item} key={item.id} />;
  }, []);

  const {t} = useTranslation();

  if (isLoading) {
    return <Spinner inProgress />;
  }

  return (
    <ScreenContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeConfig.defaultTheme.colors.onSurface}
      />
      <ListContainer>
        <ListInfoCaption
          leftCaption={`${
            filterValue ? t(filterValue) : t(SurveysFilters.allSurveys)
          } · ${data?.length ?? 0}`}
          rightCaption={
            fulfilledTimeStamp
              ? `${t('Updated')} ${localizedFormat(toDate(fulfilledTimeStamp))}`
              : ''
          }
        />
        <>
          <Filters
            screenName={ScreenNames.Surveys}
            filterValues={possibleFilters}
          />
          {!!data?.length && (
            <>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handleRefresh}
                  />
                }
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </>
          )}
          {!data?.length && (
            <>
              <NoSurveys
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handleRefresh}
                  />
                }
              />
            </>
          )}
        </>
      </ListContainer>
      <Portal>
        <Snackbar
          style={styles.snackbar}
          visible={!!showNotification}
          onDismiss={() => {
            setShowNotification(undefined);
          }}
          action={{
            label: t('Got it'),
            labelStyle: styles.gotit,
            onPress: () => {
              setShowNotification(undefined);
            },
          }}>
          <Typography size="Body 2">
            {t(
              'Survey signed and submited for upload. A copy of the report was sent successfully.',
            )}
          </Typography>
        </Snackbar>
        <GenericPopupModal
          title={t(
              'The session has expired. Please Logout and Re-Login in order to continue!',
                )}
          visible={isConnected && isError && !isSuccess}
          extraButtons={
            <LogoutButton/>
          }
          >
        </GenericPopupModal>
      </Portal>
    </ScreenContainer>
  );
}

export default React.memo(SurveysScreen);

function useFilteredSurveys(
  filterValue: string | string[] | undefined,
  wholeData?: Survey[],
) {
  const {downloadedData, downloadedDataKeys} = useSelector(state => ({
    downloadedData: Object.values(state.evaluation),
    downloadedDataKeys: Object.keys(state.evaluation),
  }));
  const downloadableData = wholeData?.filter(
    i => !downloadedDataKeys.includes(i.id) ?? EMPTY_ARRAY,
  );
  const consolidatedData = wholeData?.length
    ? wholeData
        .map(i => {
          const index = downloadedData.findIndex(j => j.id === i.id);
          return index > -1 ? downloadedData[index] : i;
        })
        .concat(downloadedData.filter(i => !wholeData.some(j => j.id === i.id)))
    : downloadedData;

  return React.useMemo(() => {
    let data;
    switch (filterValue) {
      case SurveysFilters.downloadable:
        data = downloadableData;
        break;
      case SurveysFilters.inProgress:
        data = downloadedData.filter(i =>
          notEvaluatedStatuses.includes(i.resultCd),
        );
        break;
      case SurveysFilters.finished:
        data = downloadedData.filter(
          i => !notEvaluatedStatuses.includes(i.resultCd),
        );
        break;
      default:
        data = consolidatedData;
    }
    return data?.sort(sorter);
  }, [consolidatedData, downloadableData, downloadedData, filterValue]);
}

function sorter(a: Survey, b: Survey) {
  return new Date(a.plannedDate) < new Date(b.plannedDate) ? -1 : 1;
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    height: '100%',
  },
  snackbar: {
    maxWidth: 345,
    minHeight: 106,
    alignSelf: 'center',
    paddingRight: 16,
  },
  gotit: {
    color: '#00A3ED', // todo -> to theme primary
  },
});
