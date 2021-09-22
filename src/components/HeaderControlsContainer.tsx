import React from 'react';
import {StyleSheet, View} from 'react-native';

interface HeaderControlsContainerProps {
  children?: React.ReactNode;
}
function HeaderControlsContainer({children}: HeaderControlsContainerProps) {
  return <View style={styles.container}>{children}</View>;
}
export default React.memo(HeaderControlsContainer);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
  },
});
