import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar, StyleSheet, View} from 'react-native';
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
import {DaimlerService} from '../../interfaces/survey';

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
    typeof filter === 'undefined'
      ? (emptyArrayCheck = true)
      : (filters = Object.values(filter));
    filters.forEach(element => {
      if (element.value.length > 0) {
        emptyArrayCheck = false;
      }
    });
    if (
      (typeof filter === 'undefined' || emptyArrayCheck) &&
      (typeof searchInput === 'undefined' ||
        (!searchInput?.nameSearch?.value &&
          !searchInput?.descriptionSearch?.value &&
          !searchInput?.standardID?.value))
    ) {
      return 'transparent';
    } else {
      return 'red';
    }
  };

  const filterCount = () => {
    let count = 0;
    let filters: any[] = [];
    typeof filter === 'undefined'
      ? (filters = [])
      : (filters = Object.values(filter));
    filters.forEach(element => {
      if (element.value.length > 0) {
        count++;
      }
    });
    if (searchInput?.nameSearch?.value) {
      count++;
    }
    if (searchInput?.descriptionSearch?.value) {
      count++;
    }
    if (searchInput?.standardID?.value) {
      count++;
    }
    return count;
  };

  const productGroupCheck = React.useCallback(() => {
    if (
      auditData?.services.find(
        e => e.productGroup === 'PC' || e.productGroup === 'Van',
      ) === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }, [auditData]);
  const data = React.useMemo(() => {
    let filteredData = allData.slice();
    filteredData = filteredData.slice();
    (globalThis as any).isProductGroupDT = productGroupCheck();
    if (filter) {
      const filters = Object.values(filter);
      filters.forEach(f => {
        if (f.value.length !== 0) {
          if (
            f.fieldName === 'brand' ||
            f.fieldName === 'activity' ||
            f.fieldName === 'productGroup'
          ) {
            filteredData = filteredData.filter(i =>
              i.services?.some(u =>
                Array.isArray(f.value) && f.value.length !== 0
                  ? f.value.includes(
                      u[f.fieldName as keyof DaimlerService] as string,
                    )
                  : u[f.fieldName as keyof DaimlerService] === f.value,
              ),
            );
          } else if (f.fieldName === 'files') {
            if (f.value.toString() === 'yes') {
              filteredData = filteredData.filter(i =>
                i.questionDTOList?.some(u => u[f.fieldName].length !== 0),
              );
            } else {
              filteredData = filteredData.filter(i =>
                i.questionDTOList?.some(u => u[f.fieldName].length === 0),
              );
            }
          } else if (f.fieldName === 'attachedComment') {
            if (f.value.toString() === 'yes') {
              filteredData = filteredData.filter(i =>
                i.questionDTOList?.some(
                  u =>
                    (typeof u.internalComment === 'string' &&
                      u.internalComment.length > 0) ||
                    (typeof u.publicComment === 'string' &&
                      u.publicComment.length > 0),
                ),
              );
            } else {
              filteredData = filteredData.filter(i =>
                i.questionDTOList?.some(
                  u =>
                    (typeof u.internalComment !== 'string' ||
                      u.internalComment.length === 0) &&
                    (typeof u.publicComment !== 'string' ||
                      u.publicComment.length === 0),
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
      typeof searchInput !== 'undefined' &&
      (searchInput?.nameSearch?.value ||
        searchInput?.descriptionSearch?.value ||
        searchInput?.standardID?.value)
    ) {
      if (
        searchInput?.nameSearch?.value &&
        searchInput?.descriptionSearch?.value &&
        searchInput?.standardID?.value
      ) {
        const nameSearchQ = searchInput.nameSearch.value
          .toString()
          .toLowerCase();
        const descriptionQ = searchInput.descriptionSearch.value
          .toString()
          .toLowerCase();
        const standardIDQ = searchInput.standardID.value
          .toString()
          .toLowerCase();
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
                i.standardText.toLowerCase().indexOf(descriptionQ) > -1)) &&
            i.standardNumber &&
            i.standardNumber.toLowerCase().indexOf(standardIDQ) > -1
          );
        });
      } else if (searchInput?.nameSearch?.value) {
        const q = searchInput.nameSearch.value.toString().toLowerCase();
        return filteredData.filter(i => {
          return (
            (needTranslation &&
              i.nameTranslations &&
              i.nameTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
            (i.standardName && i.standardName.toLowerCase().indexOf(q) > -1)
          );
        });
      } else if (searchInput?.descriptionSearch?.value) {
        const q = searchInput.descriptionSearch.value.toString().toLowerCase();
        return filteredData.filter(i => {
          return (
            (needTranslation &&
              i.textTranslations &&
              i.textTranslations[langCode]?.toLowerCase().indexOf(q) > -1) ||
            (i.standardText && i.standardText.toLowerCase().indexOf(q) > -1)
          );
        });
      } else if (searchInput?.standardID?.value) {
        const q = searchInput.standardID.value.toString().toLowerCase();
        return filteredData.filter(i => {
          return (
            i.standardNumber && i.standardNumber.toLowerCase().indexOf(q) > -1
          );
        });
      }
    } else {
      return filteredData;
    }
  }, [
    allData,
    filter,
    langCode,
    needTranslation,
    searchInput,
    productGroupCheck,
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      title: auditData?.number,
      headerRight: () => evaluationHeaderRightFunc(id),
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
        leftCaption={`${
          filterColor() !== 'red'
            ? t('All Standards')
            : filterCount() + ' ' + t('Filter(s) Applied')
        }`}
      />
      <View style={styles.drawerViewGeneral}>
        <Chip
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={styles.drawerChip}
          mode={'outlined'}>
          <View style={styles.filterDrawerButtonView}>
            <View
              style={[styles.filterColorView, {borderColor: filterColor()}]}
            />
            <Icon name="filter-outline" size={FILTER_ICON_SIZE} />
          </View>
          <View style={styles.fitersButton}>
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

function evaluationHeaderRightFunc(sId: any) {
  return <EvaluationHeaderRight surveyId={sId} />;
}

export default React.memo(StandardListScreen);

const styles = StyleSheet.create({
  drawerViewGeneral: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerChip: {
    marginRight: 20,
    marginBottom: 14,
    display: 'flex',
    height: '70%',
  },
  filterColorView: {
    marginBottom: 0,
    marginRight: 20,
    height: 1,
    borderRadius: 2,
    borderWidth: 2,
  },
  filterDrawerButtonView: {
    display: 'flex',
  },
  fitersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
