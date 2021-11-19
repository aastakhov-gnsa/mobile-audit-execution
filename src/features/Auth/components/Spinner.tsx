import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface SpinnerProps {
  inProgress: boolean;
}

function Spinner({inProgress}: SpinnerProps) {
  if (!inProgress) {
    return null;
  }
  return (
    <Modal transparent={true} animationType={'none'} visible={inProgress}>
      <View style={styles.view}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
export default React.memo(Spinner);
