import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

function HomeScreen() {
  return (
    <View style={styles.view}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default React.memo(HomeScreen);
