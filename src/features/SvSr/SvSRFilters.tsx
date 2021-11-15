import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Typography from '../../components/Typography';
import {MultiValue} from '../../interfaces/common';
import {StandardFulfillment, StandardType} from '../../interfaces/standard';
import {DaimlerService, surveyDetails} from '../../interfaces/survey';
import { getServiceLabel } from '../../utils/daimlerService';

export interface SvSRFiltersProps {
  /**
   * Determines set of filters to display
   */
  sectionType:
    | 'standardType'
    | 'auditServices'
    | 'standardFulfillment'
    | 'details';
  /**
   * Keys of selected filters
   */
  selected: Record<string, boolean>;
  /**
   * Fires on filter toggle
   */
  onSelect: (key: string) => void;
  /**
   * Fires on component initialization with array of filter keys calculated from `sectionType`
   */
  onInit: (keys: string[]) => void;
  /**
   * For `auditServices` section type, as it's dynamic set
   */
  services?: DaimlerService[];
}

/**
 * Filters section on SvSR filters popup
 */
export function SvSRFilters({
  sectionType,
  services,
  selected,
  onInit,
  onSelect,
}: SvSRFiltersProps) {
  const {colors} = useTheme();
  let title = '';
  let values: string[] = [];
  if (sectionType === 'standardType') {
    title = 'Standard Type';
    values = Object.values(StandardType);
  } else if (sectionType === 'standardFulfillment') {
    title = 'Standard Fulfillment';
    values = Object.values(StandardFulfillment);
  } else if (sectionType === 'details') {
    title = 'Details';
    values = Object.values(surveyDetails);
  } else if (services) {
    title = 'Audit Services';
    values = services.map(getServiceLabel);
  }
  useEffect(() => {
    onInit(values);
  }, []);
  return (
    <View style={styles.section}>
      <Typography size="Body 1" style={styles.header}>
        {title}
      </Typography>
      {values.map(item => {
        return (
          <Pressable
            key={item}
            style={styles.item}
            onPress={() => onSelect(item)}>
            <Typography size="Body 1">{item}</Typography>
            {selected[item] && (
              <Icon name="check" size={24} color={colors.primary} />
            )}
          </Pressable>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    fontFamily: 'Roboto-Bold',
    paddingLeft: 24,
    paddingRight: 24,
  },
  item: {
    height: 48,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgb(239,239,239)',
    borderBottomWidth: 1,
  },
});
