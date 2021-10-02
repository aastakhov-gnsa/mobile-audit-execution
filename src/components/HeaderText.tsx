import React from 'react';
import Typography from './Typography';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {ColorKey, Status} from '../interfaces/common';
import {useTheme} from 'react-native-paper';

interface StandardHeaderProps {
  children?: React.ReactNode;
  status?: Status;
  style?: StyleProp<TextStyle>;
}

function HeaderText({children, status, style}: StandardHeaderProps) {
  const {colors} = useTheme();
  const {suffix, color} = getStatusInfo(status);

  const textStyle = StyleSheet.flatten([
    styles.text,
    {color: colors[color]},
    style,
  ]);

  return (
    <Typography size="Headline 6" style={textStyle}>
      {children}
      {suffix}
    </Typography>
  );
}

export default React.memo(HeaderText);
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
  },
});

function getStatusInfo(status?: Status): {
  color: ColorKey;
  suffix: string;
} {
  switch (status?.toLowerCase()) {
    case 'passed':
    case 'passed - overruled':
    case 'completed': {
      return {color: 'green', suffix: ' ✓'};
    }
    case 'failed - overruled':
    case 'failed': {
      return {color: 'error', suffix: ' ✗'};
    }
    default: {
      return {color: 'text', suffix: ''};
    }
  }
}
