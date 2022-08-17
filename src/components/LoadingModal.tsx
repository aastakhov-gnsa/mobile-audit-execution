import React from 'react';
import {Surface, ActivityIndicator, Modal, Portal} from 'react-native-paper';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';

interface LoadingModalProps {
  title?: string;
  visible: boolean;
}

function LoadingModal({
  title,
  visible,
}: LoadingModalProps) {
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
            <Surface style={styles.surface}>
              <ItemWrapper style={styles.header}>
                <ActivityIndicator animating={true}/>
                <Typography style={{paddingLeft: 12}} size="Body 1">{title}</Typography>
              </ItemWrapper>
            </Surface>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
      )}
    </>
  );
}

export default React.memo(LoadingModal);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    paddingRight: '3%',
    paddingLeft: '3%',
    width: '80%',
    borderRadius: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center'
  }
});
