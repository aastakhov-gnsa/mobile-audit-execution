import React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import Typography from './Typography';
import {StyleSheet} from 'react-native';
import { useUploadSurvey } from '../hooks/useUploadSurvey';

interface UploadSurveyProps {
  id: string;
}

function UploadSurvey({id}: UploadSurveyProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [uploadSurvey, isLoading] = useUploadSurvey(id)
  const {t} = useTranslation();

  return (
    <>
      {isLoading && (
        <Typography size="Button" style={styles.hint}>
          {t('Uploading survey').toUpperCase() + '...'}
        </Typography>
      )}
      {!isLoading && <Button onPress={uploadSurvey}>{t('upload')}</Button>}
    </>
  );
}

export default React.memo(UploadSurvey);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    hint: {
      color: colors.text50,
    },
  });
