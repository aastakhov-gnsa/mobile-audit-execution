import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip, Searchbar} from 'react-native-paper';
import {ScreenNames} from '../../navigation/navigation';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import {addFilter, removeFilter} from './filtersReducer';
import {FilterValues} from '../../interfaces/filters';
import Typography from '../Typography';
import {useTranslation} from 'react-i18next';
import { DropDownFilterNames } from './dropDownFilterNames';
import { MultiSelect } from 'react-native-element-dropdown';
import { addInput } from './searchInputReducer';

interface FiltersProps {
  screenName: ScreenNames;
  filterValues: FilterValues;
  isFilterDropDown?: Boolean;
  isFilterSearchInput?: Boolean;
  searchInputType?: string;
  dropDownName?: DropDownFilterNames;
}

function Filters({screenName, filterValues, isFilterDropDown, isFilterSearchInput, dropDownName, searchInputType}: FiltersProps) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(state => state.filters?.[screenName]);
  const searchInput = useSelector(
    state => state.searchInput?.[screenName]
  );
  const {t} = useTranslation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState([]);
  const objectToSelectBox = () => {
    var dropDownFilterArray = filterValues.map(i => ({
      label: t(Array.isArray(i.value) ? i.value[0] : i.value),
      value: i.value as string,
      fieldName: i.fieldName,
    }))
    return dropDownFilterArray;
  };
  const dropDownHandlePress = (dropDownValueHandle: []) => {
    const findArray = filterValues.find(element => dropDownValueHandle)
    if (dropDownValueHandle!=dropDownValue) {
      dispatch(
        addFilter({
          screenName,
          fieldName: findArray?.fieldName as string,
          value: dropDownValueHandle,
        }),
      );
      setDropDownValue(dropDownValueHandle);
    }
    setShowDropDown(false);
  };

  const checkDropDownValue = () => {
    if(typeof selectedFilters == 'undefined' && dropDownValue?.length != 0){
      setDropDownValue([]);
      return [];
    } else {
      return dropDownValue;
    }
  }
  const searchInputHandle = (searchInputValue: string) => {
    if(searchInputValue != undefined){
      dispatch(addInput({
          screenName,
          fieldName: searchInputType as string,
          value: searchInputValue
      }),);
    }
  }

  const checkSearchInputValue = () => {
    if(typeof searchInput == 'undefined' || typeof searchInput[searchInputType as string]?.value == 'undefined'){
      return '';
    } else {
      return searchInput[searchInputType as string]?.value;
    }
  }
  
  return (
    <View style={styles.wrapper}>
    {!isFilterSearchInput ?
      <View style={[styles.notContainer, isFilterDropDown ? styles.notContainer : styles.container]}>
        {isFilterDropDown ?
        <MultiSelect
          style={[styles.dropdown, showDropDown && { borderColor: 'blue' }]}
          data={objectToSelectBox()}
          labelField='label'
          valueField='value'
          onChange={item => dropDownHandlePress(item)}
          value={checkDropDownValue()}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
          placeholder={dropDownName}
          search
          searchPlaceholder={t('Search...')}
          selectedStyle={styles.selectedStyle}
        />
        :filterValues.map(i => {
          const isSelected =
            i.fieldName === selectedFilters?.[i.fieldName]?.fieldName &&
            i.value === selectedFilters?.[i.fieldName]?.value;
          const handlePress = () => {
            if (isSelected) {
              dispatch(removeFilter({screenName, fieldName: i.fieldName}));
            } else {
              dispatch(
                addFilter({
                  screenName,
                  fieldName: i.fieldName,
                  value: i.value,
                }),
              );
            }
          };
            return (
            <Chip
              key={Array.isArray(i.value) ? i.value.toString() : i.value}
              selected={isSelected}
              onPress={handlePress}
              style={styles.chip}
              mode={'outlined'}>
              <Typography size="Body 2">
                {t(Array.isArray(i.value) ? i.value[0] : i.value)}
              </Typography>
            </Chip>
          );
        })}
      </View>
    : <Searchbar
          placeholder={t('Search')}
          onChangeText={searchInputHandle}
          value={checkSearchInputValue() as string}
          style={styles.searchBar}
        />}
    </View>
  );
}

export default React.memo(Filters);

const styles = StyleSheet.create({
  chip: {
    marginRight: 20,
  },
  searchBar: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  notContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  wrapper: {
    paddingBottom: '2%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  selectedStyle: {
    borderRadius: 12
  }
});
