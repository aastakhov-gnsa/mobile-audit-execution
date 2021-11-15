import React from 'react';
import {
  Portal,
  Modal as PaperModal,
  Surface,
  Button,
  Divider,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
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
}

function Modal({
  title,
  visible,
  children,
  onCancel,
  onSave,
  validationComponent,
  saveCaption = 'save',
}: ModalProps) {
  const {t} = useTranslation();
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.contentContainer}>
        <Surface style={styles.surface}>
          <ItemWrapper style={styles.header}>
            <Typography size="Headline 6">{title}</Typography>
          </ItemWrapper>
          <Divider />
          <ItemWrapper paddingValue={25}>{children}</ItemWrapper>
          <Divider />
          <ItemWrapper style={styles.controlsWrapper}>
            <Button mode="text" style={styles.button} onPress={onCancel}>
              {t('cancel')}
            </Button>
            <Button mode="contained" onPress={onSave}>
              {saveCaption ?? t('save')}
            </Button>
          </ItemWrapper>
          {validationComponent}
        </Surface>
      </PaperModal>
    </Portal>
  );
}

export default React.memo(Modal);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
  },
  surface: {width: '70%', borderRadius: 5},
  header: {alignItems: 'center'},
  controlsWrapper: {
    paddingRight: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {marginRight: 8},
});
