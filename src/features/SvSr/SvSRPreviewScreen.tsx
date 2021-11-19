import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {NavigationParams, SvSRPreviewRouteParams} from '../../interfaces/navigation';
import { ScreenNames } from '../../navigation/navigation';
import {SvSRPreviewPdf} from './SvSRPreviewPdf';

export function SvSRPreviewScreen() {
  const {file, surveyId, data, filters} = useRoute<SvSRPreviewRouteParams>().params;
  const navigation = useNavigation<NavigationParams>();

  const handleCancel = () => {
    navigation.goBack()
  }
  
  const handleNext = () => {
    navigation.navigate(ScreenNames.Signature, {data, filters, surveyId})
  }

  return (
    <View style={styles.container}>
      <SvSRPreviewPdf uri={file} />

      <View style={styles.actionsContainer}>
        <View style={styles.actions}>
          <Button mode="text" onPress={handleCancel}>Cancel</Button>
          <Button mode="contained" onPress={handleNext}>Next</Button>
        </View>
      </View>
    </View>
  )
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
