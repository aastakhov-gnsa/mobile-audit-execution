import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface ListContainerProps {
  children?: React.ReactNode;
}
function ListContainer({children}: ListContainerProps) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(ListContainer);

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: '4%',
    paddingRight: '4%',
    height: '100%',
  },
});
