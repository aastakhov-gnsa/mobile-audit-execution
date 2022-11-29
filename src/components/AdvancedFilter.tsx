import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {ScreenNames} from '../navigation/navigation';
import Filters from './Filters/Filters';
import HeaderText from './HeaderText';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import {DropDownFilterNames} from './Filters/dropDownFilterNames';
import {
  productGroupFilterValues,
  brandFilterValues,
  standardTypeFilterValues,
  checkpointFilterValues,
  activityFilterValues,
  brandDTFilterValues,
  productGroupDTFilterValues,
  activityDTFilterValues,
  statusFilterValues,
  standardWithAttachmentFilterValues,
  standardWithCommentFilterValues,
} from './Filters/sideMenuFilterValues';
import {useTranslation} from 'react-i18next';
import {NavigationParams} from '../interfaces/navigation';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {removeFilterList} from './Filters/filtersReducer';
import {useDispatch} from '../utils/store/configureStore';
import {FilterItem} from '../interfaces/filters';
import {removeInput} from './Filters/searchInputReducer';
import {ScrollView} from 'react-native-gesture-handler';

const CustomDrawer = () => {
  const screenName = ScreenNames.StandardList;
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationParams>();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const resetFilters = () => {
    dispatch(removeFilterList({screenName: screenName}));
    dispatch(removeInput({screenName: 'StandardList'}));
  };
  const checkValuesForProductGroups = (filterType: string) => {
    if ((globalThis as any).isProductGroupDT) {
      if (filterType == 'brand') {
        return brandDTFilterValues;
      } else if (filterType == 'productGroup') {
        return productGroupDTFilterValues;
      } else if (filterType == 'activity') {
        return activityDTFilterValues;
      }
    } else {
      if (filterType == 'brand') {
        return brandFilterValues;
      } else if (filterType == 'productGroup') {
        return productGroupFilterValues;
      } else if (filterType == 'activity') {
        return activityFilterValues;
      }
    }
  };
  return (
    <>
      <ScrollView>
        <ItemWrapper paddingValue={20}>
          <HeaderText style={styles.headerText}>{t('Filters')}</HeaderText>
        </ItemWrapper>
        <Typography size="Body 1" style={styles.headerText}>
          {t('Product Groups')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={
            checkValuesForProductGroups('productGroup') as FilterItem[]
          }
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Brands')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={checkValuesForProductGroups('brand') as FilterItem[]}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Activity')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={checkValuesForProductGroups('activity') as FilterItem[]}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.Activity}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Checkpoint')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={checkpointFilterValues}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.Checkpoint}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Standard Type')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={standardTypeFilterValues}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.StandardType}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Result')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={statusFilterValues}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.Status}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Name')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={statusFilterValues}
          isFilterSearchInput={true}
          searchInputType={DropDownFilterNames.NameSearch}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Description')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={statusFilterValues}
          isFilterSearchInput={true}
          searchInputType={DropDownFilterNames.DescriptionSearch}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('#')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={statusFilterValues}
          isFilterSearchInput={true}
          searchInputType={DropDownFilterNames.StandardID}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Standard with Attachment')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={standardWithAttachmentFilterValues}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.StandardWithAttachment}
        />
        <Typography size="Body 1" style={styles.headerText}>
          {t('Standard with Comment')}
        </Typography>
        <Filters
          screenName={screenName}
          filterValues={standardWithCommentFilterValues}
          isFilterDropDown={true}
          dropDownName={DropDownFilterNames.StandardWithComment}
        />
      </ScrollView>
      <View>
        <ItemWrapper style={styles.controlsWrapper}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            {t('Search')}
          </Button>
          <Button mode="outlined" onPress={() => resetFilters()}>
            {t('Reset Filters')}
          </Button>
        </ItemWrapper>
      </View>
    </>
  );
};

export default CustomDrawer;

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    hint: {
      marginTop: 4,
      color: colors.text50,
    },
    header: {
      width: '75%',
      marginTop: 20,
      marginBottom: 6,
    },
    headerText: {
      width: '75%',
      marginTop: 6,
      marginLeft: 20,
      marginBottom: 6,
      marginRight: 20,
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomItem: {
      marginRight: 20,
    },
    viewItem: {},
    controlsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 20,
      borderTopColor: 'rgba(128, 128, 128, 0.5)',
      borderTopWidth: 1,
    },
    button: {marginRight: 8},
  });
