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
import {ScreenNames} from '../../navigation/navigation';
import {useSelector} from '../../utils/store/configureStore';
import {
  NavigationParams,
  StandardListRouteParams,
} from '../../interfaces/navigation';
import EvaluationHeaderRight from '../../components/HeaderRight/EvaluationHeaderRight';
import {useTranslation} from 'react-i18next';
import {Chip} from 'react-native-paper';
import useCurrentLanguage from '../../hooks/useCurrentLanguage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FILTER_ICON_SIZE} from '../../constants/constants';
import Typography from '../../components/Typography';

function StandardListScreen() {
  const route = useRoute<StandardListRouteParams>();
  const navigation = useNavigation<NavigationParams>();
  const {id} = route.params;
  const auditData = useSelector(state => state.evaluation[id]);
  const filter = useSelector(
    state => state.filters?.[ScreenNames.StandardList],
  );
  const allData = auditData.standards;
  const searchInput = useSelector(
    state => state.searchInput?.[ScreenNames.StandardList],
  );
  const [langCode, needTranslation] = useCurrentLanguage();
  const filterColor = () => {
    let emptyArrayCheck: boolean = true;
    let filters: any[] = [];
    typeof filter == 'undefined'
      ? (emptyArrayCheck = true)
      : (filters = Object.values(filter));
    filters.forEach(element => {
      if (element.value.length > 0) {
        emptyArrayCheck = false;
      }
    });
    if (
      (typeof filter == 'undefined' || emptyArrayCheck) &&
      (typeof searchInput == 'undefined' ||
        (!searchInput?.nameSearch?.value &&
          !searchInput?.descriptionSearch?.value))
    ) {
      return 'transparent';
    } else {
      return 'red';
    }
  };
  const productGroupCheck = () => {
    if (
      auditData?.services.find(
        e => e.productGroup === 'PC' || e.productGroup === 'Van',
      ) === undefined
    ) {
      (globalThis as any).isProductGroupDT = true;
    } else {
      (globalThis as any).isProductGroupDT = false;
    }
  };
  const data = React.useMemo(() => {
    let filteredData = allData.slice();
    filteredData = filteredData.slice();
    productGroupCheck();
    if (filter) {
      const filters = Object.values(filter);
      filters.forEach(f => {
        if (f.value.length != 0) {
          if (
            f.fieldName == 'brand' ||
            f.fieldName == 'activity' ||
            f.fieldName == 'productGroup'
          ) {
            filteredData = filteredData.filter(i =>
              i.services.some(u =>
                Array.isArray(f.value) && f.value.length != 0
                  ? f.value.includes(u[f.fieldName] as string)
                  : u[f.fieldName] === f.value,
              ),
            );
          } else if (
            f.fieldName == 'attachedComment' ||
            f.fieldName == 'files'
          ) {
            if (f.value == 'yes') {
              filteredData = filteredData.filter(i =>
                i.questionDTOList.some(u =>
                  Array.isArray(u[f.fieldName])
                    ? u[f.fieldName].length != 0
                    : typeof u[f.fieldName] === 'string',
                ),
              );
            } else {
              filteredData = filteredData.filter(i =>
                i.questionDTOList.some(u =>
                  Array.isArray(u[f.fieldName] && f.fieldName.length != 0)
                    ? u[f.fieldName].length == 0
                    : typeof u[f.fieldName] !== 'string',
                ),
              );
            }
          } else {
            filteredData = filteredData.filter(i =>
              Array.isArray(f.value)
                ? f.value.includes(i[f.fieldName] as string)
                : i[f.fieldName] === f.value,
            );
          }
        }
      });
    }
    if (
      typeof searchInput != 'undefined' &&
      (searchInput?.nameSearch?.value || searchInput?.descriptionSearch?.value)
    ) {
      if (
        searchInput?.nameSearch?.value &&
        searchInput?.descriptionSearch?.value
      ) {
        const nameSearchQ = searchInput.nameSearch.value.toLowerCase();
        const descriptionQ = searchInput.descriptionSearch.value.toLowerCase();
        return filteredData.filter(i => {
          return (
            ((needTranslation &&
              i.nameTranslations &&
              i.nameTranslations[langCode]?.toLowerCase().indexOf(nameSearchQ) >
                -1) ||
              (i.standardName &&
                i.standardName.toLowerCase().indexOf(nameSearchQ) > -1)) &&
            ((needTranslation &&
              i.textTranslations &&
              i.textTranslations[langCode]
                ?.toLowerCase()
                .indexOf(descriptionQ) > -1) ||
              (i.standardText &&
                i.standardText.toLowerCase().indexOf(descriptionQ) > -1))
          );
        });
      } else if (searchInput?.nameSearch?.value) {
        const q = searchInput.nameSearch.value.toLowerCase();
        return filteredData.filter(i => {
          return (
            (needTranslation &&
              i.nameTranslations &&
              i.nameTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
            (i.standardName && i.standardName.toLowerCase().indexOf(q) > -1)
          );
        });
      } else if (searchInput?.descriptionSearch?.value) {
        const q = searchInput.descriptionSearch.value.toLowerCase();
        return filteredData.filter(i => {
          return (
            (needTranslation &&
              i.textTranslations &&
              i.textTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
            (i.standardText && i.standardText.toLowerCase().indexOf(q) > -1)
          );
        });
      }
    } else {
      return filteredData;
    }
  }, [allData, filter, langCode, needTranslation, searchInput]);

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
          filter === undefined || filterColor() != 'red'
            ? t('All Standards')
            : Object.values(filter)
                .map(f => t(convertFilterValue(f.value)))
                .toString()
                .replace(/,/g, ', ')
        } · ${data?.length ?? 0}`}
      />
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Chip
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={{
            marginRight: 20,
            marginBottom: 14,
            display: 'flex',
            height: '70%',
          }}
          mode={'outlined'}>
          <View style={{display: 'flex'}}>
            <View
              style={{
                marginBottom: 0,
                marginRight: 20,
                height: 1,
                borderRadius: 2,
                borderWidth: 2,
                borderColor: filterColor(),
              }}
            />
            <Icon name="filter-outline" size={FILTER_ICON_SIZE} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography size="Body 2">{t('Filters')}</Typography>
          </View>
        </Chip>
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
  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  } else if (!Array.isArray(value)) {
    return value;
  }
};
