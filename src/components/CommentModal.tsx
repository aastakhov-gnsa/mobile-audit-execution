import React from 'react';
import {Chip, Snackbar, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ItemWrapper from './ItemWrapper';
import Typography from './Typography';
import {CommentType} from '../interfaces/standard';
import {OverruleStatus} from '../interfaces/common';
import Modal from './Modal';
import {useTranslation} from 'react-i18next';
import capitalizeFirstLetter from '../utils/common/copitalizeFirstLetter';

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
  defaultChip?: CommentType | OverruleStatus;
}

function CommentModal({
  visible,
  onSave,
  chips,
  onVisible,
  validationMessage,
  titleText,
  defaultChip,
}: CommentModalProps) {
  const [text, setText] = React.useState('');
  const handleText = (t: string) => setText(t);
  const [chip, setChip] = React.useState<
    CommentType | OverruleStatus | undefined
  >(defaultChip ?? undefined);
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
      handleSnackVisible();
    } else {
      onSave({text, chip});
      handleCancel();
    }
  }, [text, chip, handleSnackVisible, onSave, handleCancel]);
  const {t} = useTranslation();

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onSave={handleSave}
      validationComponent={
        <Snackbar
          visible={snackVisible}
          onDismiss={handleSnackVisible}
          duration={2000}>
          <Typography size="Body 1">{validationMessage}</Typography>
        </Snackbar>
      }
      title={titleText ?? capitalizeFirstLetter(t('comment'))}>
      <ItemWrapper paddingValue={[0, 30]} style={styles.inputWrapper}>
        <TextInput
          mode="outlined"
          multiline
          // numberOfLines={5}
          placeholder={`${t('Write a message')} ...`}
          value={text}
          onChangeText={handleText}
        />
      </ItemWrapper>
      <ItemWrapper paddingValue={0} style={styles.chipsWrapper}>
        {chips.map(i => (
          <Chip
            key={i.value}
            style={styles.chip}
            mode="outlined"
            onPress={createOnChipHandler(i.value)}
            selected={i.value === chip}>
            {t(i.title)}
          </Chip>
        ))}
      </ItemWrapper>
    </Modal>
  );
}

export default React.memo(CommentModal);

const styles = StyleSheet.create({
  inputWrapper: {paddingRight: 24, paddingLeft: 24},
  chipsWrapper: {
    paddingLeft: 24,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  chip: {marginRight: 20},
});
