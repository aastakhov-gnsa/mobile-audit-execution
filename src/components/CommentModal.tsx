import React from 'react';
import {
  Button,
  Chip,
  Divider,
  Modal,
  Portal,
  Snackbar,
  Surface,
  TextInput,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import {CommentType} from '../interfaces/standard';
import {OverruleStatus} from '../interfaces/common';

interface CommentModalProps {
  visible: boolean;
  onVisible: () => void;
  onSave: ({
    text,
    chip,
  }: {
    text: string;
    chip: CommentType | OverruleStatus;
  }) => void;
  chips: Array<{title: string; value: CommentType | OverruleStatus}>;
  validationMessage: string;
  titleText?: string;
}

function CommentModal({
  visible,
  onSave,
  chips,
  onVisible,
  validationMessage,
  titleText,
}: CommentModalProps) {
  const [text, setText] = React.useState('');
  const handleText = (t: string) => setText(t);
  const [chip, setChip] = React.useState<
    CommentType | OverruleStatus | undefined
  >(undefined);
  const createOnChipHandler = React.useCallback(
    (v: CommentType | OverruleStatus) => () => {
      if (chip === v) {
        setChip(undefined);
      } else {
        setChip(v);
      }
    },
    [chip],
  );

  const [snackVisible, setSnackVisible] = React.useState(false);
  const handleSnackVisible = React.useCallback(
    () => setSnackVisible(!snackVisible),
    [snackVisible],
  );

  const handleCancel = React.useCallback(() => {
    onVisible();
    setChip(undefined);
    handleText('');
  }, [onVisible]);

  const handleSave = React.useCallback(() => {
    if (!text || !chip) {
      // Alert.alert('Fill comment and chose type of comment');
      handleSnackVisible();
    } else {
      onSave({text, chip});
      handleCancel();
    }
  }, [text, chip, handleSnackVisible, onSave, handleCancel]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={styles.contentContainer}>
        <Surface style={styles.surface}>
          <ItemWrapper style={styles.header}>
            <Typography size="Headline 6">{titleText ?? 'Comment'}</Typography>
          </ItemWrapper>
          <Divider />
          <ItemWrapper paddingValue={[25, 30]} style={styles.inputWrapper}>
            <TextInput
              mode="outlined"
              multiline
              // numberOfLines={5}
              placeholder="Write a message ..."
              value={text}
              onChangeText={handleText}
            />
          </ItemWrapper>
          <ItemWrapper paddingValue={[0, 25]} style={styles.chipsWrapper}>
            {chips.map(i => (
              <Chip
                key={i.value}
                style={styles.chip}
                mode="outlined"
                onPress={createOnChipHandler(i.value)}
                selected={i.value === chip}>
                {i.title}
              </Chip>
            ))}
          </ItemWrapper>
          <Divider />
          <ItemWrapper style={styles.controlsWrapper}>
            <Button mode="text" style={styles.button} onPress={handleCancel}>
              cancel
            </Button>
            <Button mode="contained" onPress={handleSave}>
              save
            </Button>
          </ItemWrapper>
          <Snackbar
            visible={snackVisible}
            onDismiss={handleSnackVisible}
            duration={2000}>
            <Typography size="Body 1">{validationMessage}</Typography>
          </Snackbar>
        </Surface>
      </Modal>
    </Portal>
  );
}

export default React.memo(CommentModal);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
  },
  surface: {width: '70%'},
  header: {alignItems: 'center'},
  inputWrapper: {paddingRight: 24, paddingLeft: 24},
  chipsWrapper: {
    paddingLeft: 24,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  chip: {marginRight: 20},
  controlsWrapper: {
    paddingRight: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {marginRight: 8},
});
