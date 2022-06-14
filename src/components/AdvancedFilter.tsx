import React from "react";
import {View, StyleSheet} from "react-native";
import {Button, useTheme} from "react-native-paper";
import {ScreenNames} from "../navigation/navigation";
import Filters from "./Filters/Filters";
import HeaderText from "./HeaderText";
import ItemWrapper from "./ItemWrapper";
import Typography from "./Typography";
import {DropDownFilterNames} from './Filters/dropDownFilterNames';
import {productGroupFilterValues, brandFilterValues, standardTypeFilterValues, checkpointFilterValues, activityFilterValues, brandDTFilterValues, productGroupDTFilterValues, activityDTFilterValues} from './Filters/sideMenuFilterValues';
import {useTranslation} from "react-i18next";
import {NavigationParams} from "../interfaces/navigation";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import {removeFilterList} from "./Filters/filtersReducer";
import {useDispatch} from "../utils/store/configureStore";
import {FilterItem} from "../interfaces/filters";

const CustomDrawer = () => {
  const screenName = ScreenNames.StandardList;
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationParams>();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const checkValuesForProductGroups = (filterType: string) => {
    if((globalThis as any).isProductGroupDT){
      if(filterType == 'brand'){
        return brandDTFilterValues;
      } else if (filterType == 'productGroup') {
        return productGroupDTFilterValues;
      } else if (filterType == 'activity') {
        return activityDTFilterValues;
      }
    } else {
      if(filterType == 'brand'){
        return brandFilterValues;
      } else if (filterType == 'productGroup') {
        return productGroupFilterValues;
      } else if (filterType == 'activity') {
        return activityFilterValues;
      }
    }
  }
    return(
      <>
      <ItemWrapper style={styles.viewItem}>
        <ItemWrapper paddingValue={20}>
             <HeaderText style={styles.header}>{t('Filters')}</HeaderText>
        </ItemWrapper>
        <Typography size='Body 1' style={styles.header}>
          {t('Product Groups')}
        </Typography>
        <Filters
        screenName={screenName}
        filterValues={checkValuesForProductGroups('productGroup') as FilterItem[]}
        />
        <Typography size='Body 1' style={styles.header}>
          {t('Brands')}
        </Typography>
        <Filters
        screenName={screenName}
        filterValues={checkValuesForProductGroups('brand') as FilterItem[]}
        />
        </ItemWrapper>
        <Filters
        screenName={screenName}
        filterValues={checkValuesForProductGroups('activity') as FilterItem[]}
        isFilterDropDown={true}
        dropDownName={DropDownFilterNames.Activity}
        />
        <Filters
        screenName={screenName}
        filterValues={checkpointFilterValues}
        isFilterDropDown={true}
        dropDownName={DropDownFilterNames.Checkpoint}
        />
        <Filters
        screenName={screenName}
        filterValues={standardTypeFilterValues}
        isFilterDropDown={true}
        dropDownName={DropDownFilterNames.StandardType}
        />
        <View style={styles.controlViewWithLine}>
          <ItemWrapper style={styles.controlsWrapper}>
              <Button mode="contained" style={styles.button} onPress={() =>
                              navigation.dispatch(DrawerActions.closeDrawer())}>
                {t('search')}
              </Button>
              <Button mode="outlined" onPress={()=>dispatch(removeFilterList({screenName:'StandardList'}))}>
                {t('reset filters')}
              </Button>
          </ItemWrapper>
        </View>
      </>
    )
}

export default CustomDrawer

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
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomItem: {
      marginRight: 20,
    },
    viewItem: {
      marginLeft: 20,
    },
    controlsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginLeft: 20,
      marginBottom:20,
      borderTopColor: 'rgba(128, 128, 128, 0.5)',
      borderTopWidth: 1,
    },
    controlViewWithLine: {
      flex:1,
      justifyContent:'flex-end'
    },
    button: {marginRight: 8},
  });