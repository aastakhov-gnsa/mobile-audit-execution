import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar, View} from 'react-native';
import themeConfig from '../../../themeConfig';
import ListInfoCaption from '../../components/ListInfoCaption';
import {AuditStandardExecution} from '../../interfaces/standard';
import {FlatList} from 'react-native-gesture-handler';
import StandardCard from '../../components/StandardCard';
import Filters from '../../components/Filters/Filters';
import {ScreenNames} from '../../navigation/navigation';
import {FilterValues} from '../../interfaces/filters';
import {useSelector} from '../../utils/store/configureStore';
import {NavigationParams, StandardListRouteParams} from '../../interfaces/navigation';
import EvaluationHeaderRight from '../../components/HeaderRight/EvaluationHeaderRight';
import {useTranslation} from 'react-i18next';
import {Chip, Searchbar} from 'react-native-paper';
import ItemWrapper from '../../components/ItemWrapper';
import useCurrentLanguage from '../../hooks/useCurrentLanguage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FILTER_ICON_SIZE} from '../../constants/constants';

const filterValues: FilterValues = [
  {
    fieldName: 'status',
    value: 'Open',
  },
  {
    fieldName: 'status',
    value: ['Passed', 'Passed - Overruled'],
  },
  {
    fieldName: 'status',
    value: ['Failed', 'Failed - Overruled'],
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
    state => state.filters?.[ScreenNames.StandardList],
  );
  const allData = auditData.standards;

  const [langCode, needTranslation] = useCurrentLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const filterColor = () => {
    if(typeof filter == 'undefined' || Object.keys(filter).length == 0){
      return 'transparent';
    } else {
      return 'red';
    }
  }

  const productGroupCheck = () => {
    if(auditData?.services.find(e => e.productGroup==='PC' || e.productGroup==='Van') === undefined){
      (globalThis as any).isProductGroupDT=true;
    } else {
      (globalThis as any).isProductGroupDT=false;
    }
  }

  const data = React.useMemo(() => {
    let filteredData = allData.slice();
    filteredData=filteredData.slice();
    productGroupCheck();
    if (filter) {
      const filters = Object.values(filter);
      filters.forEach(f => {
        if(f.fieldName=='brand' || f.fieldName=='activity' || f.fieldName=='productGroup'){
          filteredData = filteredData.filter(i => i.services.some(u => Array.isArray(f.value)
          ? f.value.includes(u[f.fieldName] as string)
          : u[f.fieldName] === f.value,));

        } else {
          filteredData = filteredData.filter(i =>
            Array.isArray(f.value)
              ? f.value.includes(i[f.fieldName] as string)
              : i[f.fieldName] === f.value,
          );
        }
      });
    }

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
  const Drawer = createDrawerNavigator();

  return (
    <ScreenContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeConfig.defaultTheme.colors.surface}
      />
      <ListInfoCaption
        leftCaption={`${
          filter === undefined || Object.values(filter).length === 0
            ? t('All Standards')
            : t(
                Object.values(filter)
                  .map(f => convertFilterValue(f.value))
                  .toString()
                  .replace(/,/g, ', '),
              )
        } · ${data?.length ?? 0}`}
      />
      <ItemWrapper paddingValue={[0, 20]}>
        <Searchbar
          placeholder={t('Search')}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </ItemWrapper>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <Chip
          onPress={() =>
            navigation.dispatch(DrawerActions.toggleDrawer())
          }
          style={{marginRight:20, display:'flex', height:'70%', marginTop:-14}}
          mode={'outlined'}>
          <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <View style={{marginBottom:0, marginLeft:22, height:1, width:'10%', borderRadius:2, borderWidth:2, borderColor:filterColor()}}/>
            <Icon name="filter-outline" size={FILTER_ICON_SIZE}/>
          </View>
        </Chip>
        <Filters
          screenName={ScreenNames.StandardList}
          filterValues={filterValues}
      />
      </View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
}

export default React.memo(StandardListScreen);

const convertFilterValue = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

