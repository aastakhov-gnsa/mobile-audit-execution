import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ItemWrapper from '../../../components/ItemWrapper';
import Typography from '../../../components/Typography';
import {Button} from 'react-native-paper';
import {ResultCd} from '../../../interfaces/common';

interface QuestionOptionProps {
  title: string;
  description: string;
  resultCd?: ResultCd;
  disabled?: boolean;
  onChange: (rCd: ResultCd) => void;
}

const window = Dimensions.get('window');

function QuestionOption({
  title,
  description,
  resultCd,
  onChange,
  disabled,
}: QuestionOptionProps) {
  const handleYes = React.useCallback(() => onChange('Passed'), [onChange]);
  const handleNo = React.useCallback(() => onChange('Failed'), [onChange]);
  return (
    <View style={styles.optionContainer}>
      <View style={styles.optionDescription}>
        <ItemWrapper title={title} paddingValue={[0, 40]}>
          <Typography size="Body 1">{description}</Typography>
        </ItemWrapper>
      </View>
      <View style={styles.optionButtons}>
        <Button
          disabled={disabled}
          mode={resultCd === 'Passed' ? 'contained' : 'outlined'}
          onPress={handleYes}>
          yes
        </Button>
        <Button
          style={styles.button}
          disabled={disabled}
          mode={resultCd === 'Failed' ? 'contained' : 'outlined'}
          onPress={handleNo}>
          no
        </Button>
      </View>
    </View>
  );
}

export default React.memo(QuestionOption);

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  optionDescription: {
    width: window.width > 800 ? '70%' : '60%',
  },
  optionButtons: {
    width: window.width > 800 ? '30%' : '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '2%',
  },
});
