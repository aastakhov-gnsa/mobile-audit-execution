import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';
import {useTheme} from 'react-native-paper';

interface ItemWrapperProps {
  title?: string;
  children?: React.ReactNode;
}

function ItemWrapper({title, children}: ItemWrapperProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.wrapper}>
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

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    title: {
      fontFamily: 'Roboto-Medium',
      marginBottom: 8,
      color: colors.text,
    },
    wrapper: {
      paddingTop: 16,
      paddingBottom: 16,
    },
  });
