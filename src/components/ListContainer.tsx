import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

interface ListContainerProps {
  children?: React.ReactNode;
}
function ListContainer({children}: ListContainerProps) {
  return (
    <SafeAreaView>
      <View style={styles.scrollView}>{children}</View>
    </SafeAreaView>
  );
}

export default React.memo(ListContainer);

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
});
