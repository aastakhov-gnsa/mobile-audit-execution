import React from 'react';
import {Surface, Modal, Portal} from 'react-native-paper';
import {
  StyleSheet,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Button from './Button';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';

interface VersionCheckProps {
  visible: boolean;
  hideDialog: () => void;
  updateApp: () => void;
}

function VersionCheck({visible, hideDialog, updateApp}: VersionCheckProps) {
  const {t} = useTranslation();
  return (
    <>
      {visible && (
        <Portal>
          <Modal
            visible={visible}
            contentContainerStyle={styles.contentContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.contentContainer}>
              <Surface
                style={
                  Platform.OS === 'ios' ? styles.surface : styles.surfaceAndroid
                }>
                <ItemWrapper style={styles.header}>
                  <Typography size="Headline 6">
                    {t('New Mobile Application Version')}
                  </Typography>
                </ItemWrapper>
                <ItemWrapper>
                  <Typography size="Subtitle 1">
                    {t(
                      'There is a new GNSA Mobile Application version. In order not to lose your data, please Save and Upload your unfinished Surveys and then upgrade your mobile application.',
                    )}
                  </Typography>
                </ItemWrapper>
                <ItemWrapper
                  style={Platform.OS === 'ios' ? styles.buttonContainer : null}>
                  <Button onPress={() => hideDialog()}>{t('Dismiss')}</Button>
                  <Button onPress={() => updateApp()}>{t('Update')}</Button>
                </ItemWrapper>
              </Surface>
            </KeyboardAvoidingView>
          </Modal>
        </Portal>
      )}
    </>
  );
}

export default React.memo(VersionCheck);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    paddingRight: '1%',
    paddingLeft: '1%',
    width: '80%',
    borderRadius: 5,
  },
  surfaceAndroid: {
    paddingRight: '5%',
    paddingLeft: '5%',
    width: '80%',
    borderRadius: 5,
  },
  header: {alignItems: 'center', paddingBottom: 0},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
