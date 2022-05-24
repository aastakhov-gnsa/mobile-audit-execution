import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {ScreenNames} from '../../navigation/navigation';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import {addFilter, removeFilter, removeFilterList} from './filtersReducer';
import {FilterValues} from '../../interfaces/filters';
import {ScrollView} from 'react-native-gesture-handler';
import Typography from '../Typography';
import {useTranslation} from 'react-i18next';
import { DropDownFilterNames } from './dropDownFilterNames';
import { Dropdown } from 'react-native-element-dropdown';

interface FiltersProps {
  screenName: ScreenNames;
  filterValues: FilterValues;
  isFilterDropDown?: Boolean;
  dropDownName?: DropDownFilterNames;
}

function Filters({screenName, filterValues, isFilterDropDown, dropDownName}: FiltersProps) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(state => state.filters?.[screenName]);
  const {t} = useTranslation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");
  const objectToSelectBox = () => {
    var dropDownFilterArray = filterValues.map(i => ({
      label: i.value as string,
      value: i.value as string,
      fieldName: i.fieldName,
    }))
    return dropDownFilterArray;
  };

  const dropDownHandlePress = (dropDownValueHandle: string) => {
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
    if(typeof selectedFilters == 'undefined' && dropDownValue != ""){
      setDropDownValue("");
      return "";
    } else {
      return dropDownValue;
    }
  }
  
  return (
    <View style={styles.wrapper}>
    
      <ScrollView style={[styles.notContainer, isFilterDropDown ? styles.notContainer : styles.container]} horizontal={!isFilterDropDown}>
        {isFilterDropDown ?
        <Dropdown
          style={[styles.dropdown, showDropDown && { borderColor: 'blue' }]}
          data={objectToSelectBox()}
          labelField='label'
          valueField='value'
          onChange={item => dropDownHandlePress(item.value)}
          value={checkDropDownValue()}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
          placeholder={dropDownName}
          search
          searchPlaceholder={t('Search...')}
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
      </ScrollView>
    </View>
  );
}

export default React.memo(Filters);

const styles = StyleSheet.create({
  chip: {
    marginRight: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  notContainer: {
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
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 16,
  }
});
