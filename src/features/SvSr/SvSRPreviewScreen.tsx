import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  NavigationParams,
  SvSRPreviewRouteParams,
} from '../../interfaces/navigation';
import {ScreenNames} from '../../navigation/navigation';
import {SvSRPreviewPdf} from './SvSRPreviewPdf';
import {useTranslation} from 'react-i18next';

/**
 * SvSR pdf preview screen with action buttons to proceed to signature
 */
export function SvSRPreviewScreen() {
  const {file, surveyId, data, filters} =
    useRoute<SvSRPreviewRouteParams>().params;
  const navigation = useNavigation<NavigationParams>();

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate(ScreenNames.Signature, {data, filters, surveyId});
  };

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <SvSRPreviewPdf uri={file} />

      <View style={styles.actionsContainer}>
        <View style={styles.actions}>
          <Button mode="text" onPress={handleCancel}>
            {t('cancel')}
          </Button>
          <Button mode="contained" onPress={handleNext}>
            {t('Next')}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderTopColor: 'rgb(239, 239, 239)',
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actions: {
    display: 'flex',
    height: 'auto',
    flexDirection: 'row',
    paddingRight: 24,
  },
});
