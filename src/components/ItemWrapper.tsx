import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Typography from './Typography';
import {useTheme} from 'react-native-paper';

type PaddingType = number | [number, number];

interface ItemWrapperProps {
  title?: string;
  children?: React.ReactNode;
  paddingValue?: PaddingType;
  style?: StyleProp<ViewStyle>;
}

function ItemWrapper({title, children, paddingValue, style}: ItemWrapperProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors, paddingValue);
  return (
    <View style={StyleSheet.flatten([styles.wrapper, style])}>
      {title && (
        <Typography size="Body 1" style={styles.title}>
          {title}
        </Typography>
      )}
      {children}
    </View>
  );
}

export default React.memo(ItemWrapper);

const makeStyles = (
  colors: ReactNativePaper.ThemeColors,
  paddingValue?: PaddingType,
) => {
  let pT = 16;
  let pB = 16;
  if (typeof paddingValue === 'number') {
    pT = paddingValue;
    pB = paddingValue;
  }
  if (
    paddingValue &&
    Array.isArray(paddingValue) &&
    typeof paddingValue[0] === 'number' &&
    typeof paddingValue[1] === 'number'
  ) {
    pT = paddingValue[0];
    pB = paddingValue[1];
  }
  return StyleSheet.create({
    title: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 8,
      color: colors.text,
    },
    wrapper: {
      paddingTop: pT,
      paddingBottom: pB,
    },
  });
};
