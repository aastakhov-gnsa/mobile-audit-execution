import React from 'react';
import {StyleSheet, View} from 'react-native';
import ItemWrapper from '../../../components/ItemWrapper';
import Typography from '../../../components/Typography';
import {Button, useTheme} from 'react-native-paper';
import {ResultCd} from '../../../interfaces/common';

interface QuestionOptionProps {
  title: string;
  description: string;
  resultCd?: ResultCd;
  disabled?: boolean;
  onChange: (rCd: ResultCd) => void;
}

function QuestionOption({
  title,
  description,
  resultCd,
  onChange,
  disabled,
}: QuestionOptionProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

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
          onPress={() => onChange('Passed')}>
          yes
        </Button>
        <Button
          disabled={disabled}
          mode={resultCd === 'Failed' ? 'contained' : 'outlined'}
          onPress={() => onChange('Failed')}>
          no
        </Button>
      </View>
    </View>
  );
}

export default React.memo(QuestionOption);

const makeStyles = (colors: ReactNativePaper.ThemeColors) => {
  return StyleSheet.create({
    optionContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    optionDescription: {
      width: '70%',
    },
    optionButtons: {
      width: '20%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};
