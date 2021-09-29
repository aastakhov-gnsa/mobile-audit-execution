import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';
import {useTheme} from 'react-native-paper';
import {ColorKey} from '../interfaces/common';

interface CommentViewCardProps {
  hint?: string;
  value?: string;
  title: string;
  leftColor?: ColorKey;
}

function CommentViewCard({
  hint,
  value,
  title,
  leftColor,
}: CommentViewCardProps) {
  const {colors} = useTheme();
  if (!value) {
    return null;
  }
  const styles = makeStyles(colors, leftColor);
  return (
    <View style={styles.container}>
      {hint && (
        <Typography size="Body 2" style={styles.hint}>
          {hint}
        </Typography>
      )}
      <Typography size="Body 1" style={styles.title}>
        {title}
      </Typography>
      <Typography size="Body 1">{value}</Typography>
    </View>
  );
}

export default React.memo(CommentViewCard);

const makeStyles = (
  colors: ReactNativePaper.ThemeColors,
  leftColor?: ColorKey,
) =>
  StyleSheet.create({
    container: {
      paddingTop: 11,
      paddingBottom: 11,
      paddingLeft: 16,
      borderLeftColor: leftColor ? colors[leftColor] : colors.text,
      borderLeftWidth: 3,
      borderStyle: 'solid',
    },
    hint: {
      color: colors.text50,
      marginBottom: 4,
    },
    title: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 4,
    },
  });
