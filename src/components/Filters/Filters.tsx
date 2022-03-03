import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {ScreenNames} from '../../navigation/navigation';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import {addFilter, removeFilter} from './filtersReducer';
import {FilterValues} from '../../interfaces/filters';
import {ScrollView} from 'react-native-gesture-handler';
import Typography from '../Typography';
import {useTranslation} from 'react-i18next';

interface FiltersProps {
  screenName: ScreenNames;
  id: string;
  filterValues: FilterValues;
}

function Filters({screenName, id, filterValues}: FiltersProps) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    state => state.filters?.[screenName]?.[id],
  );
  const {t} = useTranslation();
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} horizontal>
        {filterValues.map(i => {
          const isSelected =
            i.fieldName === selectedFilters?.[i.fieldName]?.fieldName &&
            i.value === selectedFilters?.[i.fieldName]?.value;
          const handlePress = () => {
            if (isSelected) {
              dispatch(removeFilter({screenName, id, fieldName: i.fieldName}));
            } else {
              dispatch(
                addFilter({
                  screenName,
                  id,
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
  wrapper: {
    paddingBottom: '2%',
  },
});
