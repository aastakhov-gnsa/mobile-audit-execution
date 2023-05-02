import React from 'react';
import {Surface, Button, Divider} from 'react-native-paper';
import {
  StyleSheet,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import {useTranslation} from 'react-i18next';

interface ModalProps {
  title?: string;
  visible: boolean;
  children?: React.ReactNode;
  onCancel?: () => void;
  onSave?: () => void;
  saveCaption?: string;
  validationComponent?: React.ReactNode;
  extraButtons?: React.ReactNode[];
}

function Modal({
  title,
  visible,
  children,
  onCancel,
  onSave,
  validationComponent,
  saveCaption = 'save',
  extraButtons,
}: ModalProps) {
  const {t} = useTranslation();
  return (
    <>
      {visible && (
        <RNModal
          visible={visible}
          onDismiss={onCancel}
          animationType="slide"
          transparent={true}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.contentContainer}>
            <Surface
              style={
                Platform.OS === 'ios' ? styles.surface : styles.surfaceAndroid
              }>
              <ItemWrapper style={styles.header}>
                <Typography size="Headline 6">{title}</Typography>
              </ItemWrapper>
              <Divider />
              <ItemWrapper paddingValue={25}>{children}</ItemWrapper>
              <Divider />
              <ItemWrapper
                style={Platform.OS === 'ios' ? styles.controlsWrapper : null}>
                {extraButtons?.map(i => i)}
                <Button mode="text" onPress={onCancel}>
                  {t('cancel')}
                </Button>
                <Button mode="contained" onPress={onSave}>
                  {t(saveCaption)}
                </Button>
              </ItemWrapper>
              {validationComponent}
            </Surface>
          </KeyboardAvoidingView>
        </RNModal>
      )}
    </>
  );
}

export default React.memo(Modal);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    width: '70%',
    borderRadius: 5,
  },
  surfaceAndroid: {
    width: '90%',
    borderRadius: 5,
  },
  header: {alignItems: 'center'},
  controlsWrapper: {
    paddingRight: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
