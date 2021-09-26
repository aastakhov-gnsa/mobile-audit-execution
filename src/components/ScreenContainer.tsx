import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions, ScaledSize, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const window = Dimensions.get('window');

function ScreenContainer({children}: {children?: React.ReactNode}) {
  const [dimensions, setDimensions] = React.useState({window});
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions({window});
    });
    return () => subscription?.remove();
  });
  const {colors} = useTheme();
  const styles = makeStyles(colors, dimensions.window);
  return (
    <SafeAreaView style={styles.back}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

export default React.memo(ScreenContainer);

const makeStyles = (
  colors: ReactNativePaper.ThemeColors,
  dimensions: ScaledSize,
) => {
  const isPortrait = dimensions.height > dimensions.width;
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
    },
  });
};
