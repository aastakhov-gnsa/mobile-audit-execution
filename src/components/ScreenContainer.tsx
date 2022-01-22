import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import useOrientation from '../hooks/useOrientation';

function ScreenContainer({children}: {children?: React.ReactNode}) {
  const [isPortrait] = useOrientation();
  const {colors} = useTheme();
  const styles = makeStyles(colors, isPortrait);
  return (
    <SafeAreaView style={styles.back}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

export default React.memo(ScreenContainer);

const makeStyles = (
  colors: ReactNativePaper.ThemeColors,
  isPortrait: boolean,
) => {
  const sidePadding = isPortrait ? '4%' : '15%';
  return StyleSheet.create({
    back: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      marginLeft: sidePadding,
      marginRight: sidePadding,
      marginTop: Platform.OS === 'android' ? 28 : 0,
    },
  });
};
