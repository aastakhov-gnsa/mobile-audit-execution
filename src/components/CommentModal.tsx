import React, {useState} from 'react';
import {Snackbar, TextInput, Button, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import Modal from './Modal';
import {useTranslation} from 'react-i18next';
import capitalizeFirstLetter from '../utils/common/copitalizeFirstLetter';
import useOrientation from '../hooks/useOrientation';

interface CommentModalProps {
  visible: boolean;
  onVisible: () => void;
  onSave: ({
    textInternal,
    textPublic,
  }: {
    textInternal: string;
    textPublic: string;
  }) => void;
  validationMessage: string;
  titleText?: string;
  defaultTextInternal: string | null;
  defaultTextPublic: string | null;
  extraButtons?: React.ReactNode[];
}

function CommentModal({
  visible,
  onSave,
  onVisible,
  validationMessage,
  titleText,
  defaultTextInternal,
  defaultTextPublic,
  extraButtons,
}: CommentModalProps) {
  const {colors} = useTheme();
  const [isPortrait] = useOrientation();
  const styles = makeStyles(isPortrait, colors);
  const handleText = (t: string, type?: string) => {
    if (type === 'internal') {
      setTextInternal(t);
    } else if (type === 'public') {
      setTextPublic(t);
    } else {
      setTextInternal(t);
      setTextPublic(t);
    }
  };
  const [requestedTab, setRequestedTab] = useState('internal');
  const [textInternal, setTextInternal] = React.useState(
    defaultTextInternal ?? '',
  );
  const [textPublic, setTextPublic] = React.useState(defaultTextPublic ?? '');
  const [snackVisible, setSnackVisible] = React.useState(false);
  const handleSnackVisible = React.useCallback(
    () => setSnackVisible(!snackVisible),
    [snackVisible],
  );

  const handleCancel = React.useCallback(() => {
    onVisible();
    handleText('');
  }, [onVisible]);

  const handleSave = React.useCallback(() => {
    if (!textInternal && !textPublic) {
      handleSnackVisible();
    } else {
      onSave({textInternal, textPublic});
      handleCancel();
    }
  }, [textInternal, textPublic, handleSnackVisible, onSave, handleCancel]);
  const {t} = useTranslation();
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onSave={handleSave}
      extraButtons={extraButtons}
      validationComponent={
        <Snackbar
          visible={snackVisible}
          onDismiss={handleSnackVisible}
          duration={2000}>
          <Typography size="Body 1">{validationMessage}</Typography>
        </Snackbar>
      }
      title={titleText ?? capitalizeFirstLetter(t('comment'))}>
      <View style={styles.tabs}>
        <Button
          color={requestedTab === 'internal' ? colors.primary : colors.disabled}
          style={requestedTab === 'internal' ? styles.selectedTab : styles.tab}
          mode="text"
          onPress={() => {
            setRequestedTab('internal');
            setTextInternal(textInternal);
          }}>
          {t('Internal Comment')}
        </Button>
        <Button
          color={requestedTab === 'public' ? colors.primary : colors.disabled}
          style={requestedTab === 'public' ? styles.selectedTab : styles.tab}
          mode="text"
          onPress={() => {
            setRequestedTab('public');
            setTextPublic(textPublic);
          }}>
          {t('External Comment')}
        </Button>
      </View>
      <ItemWrapper paddingValue={[0, 30]} style={styles.inputWrapper}>
        {requestedTab === 'internal' && (
          <TextInput
            mode="outlined"
            multiline
            placeholder={`${t('Write a message')} ...`}
            value={textInternal}
            onChangeText={text => handleText(text, 'internal')}
            style={styles.input}
          />
        )}
        {requestedTab === 'public' && (
          <TextInput
            mode="outlined"
            multiline
            placeholder={`${t('Write a message')} ...`}
            value={textPublic}
            onChangeText={text => handleText(text, 'public')}
            style={styles.input}
          />
        )}
      </ItemWrapper>
    </Modal>
  );
}

export default React.memo(CommentModal);

const makeStyles = (
  isPortrait: boolean,
  colors: ReactNativePaper.ThemeColors,
) =>
  StyleSheet.create({
    input: {maxHeight: isPortrait ? 500 : 150},
    inputWrapper: {paddingRight: 24, paddingLeft: 24},
    tab: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 2,
      color: colors.onBackground50,
    },
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderBottomWidth: 2,
      borderColor: 'rgb(239, 239, 239)',
      paddingBottom: 2,
    },
    selectedTab: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      color: colors.disabled,
    },
  });
