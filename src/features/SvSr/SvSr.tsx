import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import Modal from '../../components/Modal';
import {ScrollView} from 'react-native-gesture-handler';
import {pdf, fRequestAndroidPermissionRead} from './pdf';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../interfaces/navigation';
import {ScreenNames} from '../../navigation/navigation';
import {SvSRFilters} from './SvSRFilters';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import {filePrefix} from '../../constants/constants';

export interface SvSrProps {
  data: EvaluationSurvey;
}

/**
 * `Generate SvSR` button opening modal with SvSR parametrs and button to proceed to pdf
 */
export function SvSr({data}: SvSrProps) {
  const navigation = useNavigation<NavigationParams>();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [show, setShow] = useState(false);
  const handleExport = async () => {
    const path = await pdf(data, selected);
    const readPermissions =
      Platform.OS === 'android' ? await fRequestAndroidPermissionRead() : true;
    if (path && readPermissions) {
      setShow(false);
      navigation.navigate(ScreenNames.SvSRPreview, {
        file: `${filePrefix}${path}`,
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
  const handleGenerateSvsrButtonPress = () => setShow(true);
  const {t} = useTranslation();
  return (
    <>
      <Button icon="file-outline" onPress={handleGenerateSvsrButtonPress}>
        {t('Generate SvSr')}
      </Button>
      <Modal
        title={t('Survey Status Report Filter').toString()}
        visible={show}
        saveCaption={t('Next').toString()}
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
