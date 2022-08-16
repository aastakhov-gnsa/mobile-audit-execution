import React from 'react';
import {Surface, Modal, Portal} from 'react-native-paper';
import {
  StyleSheet,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';

interface GenericPopupModalProps {
  title?: string;
  visible: boolean;
  extraButtons?: React.ReactNode;
  children?: React.ReactNode;
}

function GenericPopupModal({
  title,
  visible,
  extraButtons,
  children,
}: GenericPopupModalProps) {
  return (
    <>
      {visible && (
        <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={styles.contentContainer}
          >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.contentContainer}>
            <Surface style={Platform.OS === 'ios' ? styles.surface : styles.surfaceAndroid}>
              <ItemWrapper style={styles.header}>
                <Typography size='Subtitle 1'>{title}</Typography>
              </ItemWrapper>
              <ItemWrapper paddingValue={0}>{children}</ItemWrapper>
              <ItemWrapper style={Platform.OS === 'ios' ? styles.controlsWrapper : null}>
              {extraButtons}
              </ItemWrapper>
            </Surface>
          </KeyboardAvoidingView>
        </Modal>
        </Portal>
      )}
    </>
  );
}

export default React.memo(GenericPopupModal);

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
  controlsWrapper: {
    paddingRight: '40%',
    paddingLeft: '40%'
  },
});
