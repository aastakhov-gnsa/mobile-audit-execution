import React from 'react';
import {StyleSheet, View} from 'react-native';
import ItemWrapper from '../../../components/ItemWrapper';
import Typography from '../../../components/Typography';
import {Button, useTheme} from 'react-native-paper';

interface QuestionOptionProps {
  title: string;
  value: string;
  description: string;
}

function QuestionOption({title, description}: QuestionOptionProps) {
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
        <Button mode="outlined">yes</Button>
        <Button mode="outlined">no</Button>
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
