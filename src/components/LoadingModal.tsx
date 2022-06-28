import React from 'react';
import {Surface, ActivityIndicator} from 'react-native-paper';
import {
  StyleSheet,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import {useTranslation} from 'react-i18next';

interface LoadingModalProps {
  title?: string;
  visible: boolean;
  onCancel?: () => void;
}

function LoadingModal({
  title,
  visible,
  onCancel,
}: LoadingModalProps) {
  const {t} = useTranslation();
  return (
    <>
      {visible && (
        <RNModal
          visible={visible}
          onDismiss={onCancel}
          animationType="fade"          
          transparent={true}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.contentContainer}>
            <Surface style={styles.surface}>
              <ItemWrapper style={styles.header}>
                <ActivityIndicator animating={true}/>
                <Typography style={{paddingLeft: 10}} size="Body 1">{title}</Typography>
              </ItemWrapper>
            </Surface>
          </KeyboardAvoidingView>
        </RNModal>
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
    width: '70%',
    borderRadius: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center'
  }
});
