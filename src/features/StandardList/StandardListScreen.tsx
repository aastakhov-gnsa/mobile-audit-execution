import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import themeConfig from '../../../themeConfig';
import ListInfoCaption from '../../components/ListInfoCaption';
import {AuditStandardExecution} from '../../interfaces/standard';
import {FlatList} from 'react-native-gesture-handler';
import StandardCard from '../../components/StandardCard';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterValues} from '../../interfaces/filters';
import {useSelector} from '../../utils/store/configureStore';
import {
  NavigationParams,
  StandardListRouteParams,
} from '../../interfaces/navigation';
import EvaluationHeaderRight from '../../components/HeaderRight/EvaluationHeaderRight';
import {useTranslation} from 'react-i18next';
import {Searchbar} from 'react-native-paper';
import ItemWrapper from '../../components/ItemWrapper';
import useCurrentLanguage from '../../hooks/useCurrentLanguage';

const filterValues: FilterValues = [
  {
    fieldName: 'status',
    value: 'Open',
  },
  {
    fieldName: 'status',
    value: 'Passed',
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
    value: 'Basic Bonus',
  },
  {
    fieldName: 'standardType',
    value: 'Awarded Bonus',
  },
  {
    fieldName: 'standardType',
    value: 'Recommended',
  },
  {
    fieldName: 'checkpoint',
    value: 'Back Office',
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
    value: 'MPC',
  },
  {
    fieldName: 'checkpoint',
    value: 'Exterior',
  },
  {
    fieldName: 'checkpoint',
    value: 'Show Room',
  },
  {
    fieldName: 'checkpoint',
    value: 'Warehouse and Parts Area',
  },
];

function StandardListScreen() {
  const route = useRoute<StandardListRouteParams>();
  const navigation = useNavigation<NavigationParams>();
  const {id} = route.params;
  const auditData = useSelector(state => state.evaluation[id]);
  const filter = useSelector(
    state => state.filters?.[ScreenNames.StandardList]?.[id],
  );
  const allData = auditData.standards;

  const [langCode, needTranslation] = useCurrentLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const data = React.useMemo(() => {
    const filteredData = filter
      ? allData?.filter(i => i[filter.fieldName] === filter.value) //todo filter by several filters
      : allData.slice();
    if (searchQuery.length) {
      const q = searchQuery.toLowerCase();
      return filteredData.filter(i => {
        return (
          (i.standardNumber &&
            i.standardNumber.toLowerCase().indexOf(q) > -1) ||
          (needTranslation &&
            i.nameTranslations &&
            i.nameTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
          (needTranslation &&
            i.textTranslations &&
            i.textTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
          (i.standardName && i.standardName.toLowerCase().indexOf(q) > -1) ||
          (i.standardText && i.standardText.toLowerCase().indexOf(q) > -1)
        );
      });
    }
    return filteredData;
  }, [allData, filter, langCode, needTranslation, searchQuery]);

  React.useEffect(() => {
    navigation.setOptions({
      title: auditData?.number,
      headerRight: () => <EvaluationHeaderRight surveyId={id} />,
    });
  }, [navigation, auditData, id]);
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
  const {t} = useTranslation();
  return (
    <ScreenContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeConfig.defaultTheme.colors.surface}
      />
      <ListInfoCaption
        leftCaption={`${filter ? t(filter.value) : t('All Standards')} · ${
          data?.length ?? 0
        }`}
      />
      <ItemWrapper paddingValue={[0, 20]}>
        <Searchbar
          placeholder={t('Search')}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </ItemWrapper>
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
