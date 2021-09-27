import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {surveyApi, useAllSurveysQuery} from '../Survey/surveyService';
import {Alert, StatusBar, StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';
import ListInfoCaption from '../../components/ListInfoCaption';
import {AuditStandardExecution} from '../../interfaces/standard';
import {FlatList} from 'react-native-gesture-handler';
import StandardCard from '../../components/StandardCard';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterValues} from '../../interfaces/filters';
import {useSelector} from '../../utils/store/configureStore';
import HeaderControlsContainer from '../../components/HeaderControlsContainer';
import Help from '../../components/HeaderRight/components/Help';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE} from '../../constants/constants';

interface StandardListParams {
  id: string;
}

const filterValues: FilterValues = [
  {
    fieldName: 'status',
    value: 'Open',
  },
  {
    fieldName: 'status',
    value: 'Failed',
  },
  {
    fieldName: 'standardType',
    value: 'Must',
  },
  {
    fieldName: 'standardType',
    value: 'Recommended',
  },
  {
    fieldName: 'checkpoint',
    value: 'Customer Contact Area',
  },
  {
    fieldName: 'checkpoint',
    value: 'Workshop',
  },
  {
    fieldName: 'checkpoint',
    value: 'Exterior',
  },
];

function StandardListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {id} = route.params as StandardListParams;
  const {auditData} = useAllSurveysQuery('', {
    selectFromResult: result => ({
      ...result,
      auditData: result.data?.find(i => i.id === id),
    }),
  });
  const filter = useSelector(
    state => state.filters?.[ScreenNames.StandardList]?.[id],
  );
  const {data: allData} = surveyApi.endpoints.survey.useQueryState(id);
  const data = filter
    ? allData?.filter(i => i[filter.fieldName] === filter.value) // todo filter by several filters
    : allData;
  React.useEffect(() => {
    navigation.setOptions({
      title: auditData?.number,
      headerRight: () => (
        <HeaderControlsContainer>
          <Icon
            name="information-outline"
            size={ICON_SIZE}
            style={styles.icon}
            onPress={() =>
              navigation.navigate(ScreenNames.AuditDetails, {id: id})
            }
          />
          <Help style={styles.icon} />
          {/*todo implement language switching*/}
          <Icon
            name="translate"
            size={ICON_SIZE}
            onPress={() => Alert.alert('TODO language switching')}
          />
        </HeaderControlsContainer>
      ),
    });
  }, [navigation, auditData]);
  const keyExtractor = React.useCallback(
    (item: AuditStandardExecution) => item.id,
    [],
  );
  const renderItem = React.useCallback(
    ({item}: {item: AuditStandardExecution}) => {
      return <StandardCard id={item.id} surveyId={id} />;
    },
    [id],
  );

  console.log('StandardListScreen::data', data);
  return (
    <ScreenContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeConfig.defaultTheme.colors.onSurface}
      />
      <ListInfoCaption
        leftCaption={`${filter ? filter.value : 'All Standards'} · ${
          data?.length ?? 0
        }`}
      />
      <Filters
        screenName={ScreenNames.StandardList}
        id={id}
        filterValues={filterValues}
      />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
}

export default React.memo(StandardListScreen);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    icon: {
      marginRight: 20,
      color: colors.text,
    },
  });
