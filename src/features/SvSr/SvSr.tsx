import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import Modal from '../../components/Modal';
import {ScrollView} from 'react-native-gesture-handler';
import {pdf, fRequestAndroidPermissionRead} from './pdf';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../interfaces/navigation';
import {ScreenNames} from '../../navigation/navigation';
import {SvSRFilters} from './SvSRFilters';
import {useTranslation} from 'react-i18next';

export interface SvSrProps {
  data: EvaluationSurvey;
}

export function SvSr({data}: SvSrProps) {
  const navigation = useNavigation<NavigationParams>();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [show, setShow] = useState(false);
  const handleExport = async () => {
    const path = await pdf(data, selected);
    const readPermissions = await fRequestAndroidPermissionRead();
    if (path && readPermissions) {
      setShow(false);
      navigation.navigate(ScreenNames.SvSRPreview, {
        file: `file://${path}`,
        surveyId: data.id,
        data,
        filters: selected,
      });
    }
  };

  const handleInit = (keys: string[]) => {
    setSelected(sels => {
      const newSelected = {...sels};
      keys.forEach(item => {
        newSelected[item] = true;
      });
      return newSelected;
    });
  };

  const handleSelect = (key: string) => {
    setSelected({
      ...selected,
      [key]: !selected[key],
    });
  };
  const {t} = useTranslation();
  return (
    <>
      <Button mode="text" icon="file-outline" onPress={() => setShow(true)}>
        {t('Generate SvSr')}
      </Button>
      <Modal
        title={t('Survey Status Report Filter')}
        visible={show}
        saveCaption={t('Next')}
        onCancel={() => setShow(false)}
        onSave={handleExport}>
        <ScrollView style={styles.container}>
          <SvSRFilters
            sectionType="standardType"
            selected={selected}
            onInit={handleInit}
            onSelect={handleSelect}
          />
          <SvSRFilters
            sectionType="auditServices"
            selected={selected}
            services={data?.services}
            onInit={handleInit}
            onSelect={handleSelect}
          />
          <SvSRFilters
            sectionType="standardFulfillment"
            selected={selected}
            onInit={handleInit}
            onSelect={handleSelect}
          />
          <SvSRFilters
            sectionType="details"
            selected={selected}
            onInit={handleInit}
            onSelect={handleSelect}
          />
        </ScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 436,
    overflow: 'scroll',
  },
  pdf: {
    flex: 1,
    width: 400,
    height: 500,
  },
});
