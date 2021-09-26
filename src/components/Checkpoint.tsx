import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Typography from './Typography';
import Gps from '../assets/icons/gps.svg';

interface CheckpointProps {
  checkpoint?: string;
  style?: StyleProp<ViewStyle>;
}

function Checkpoint({checkpoint, style}: CheckpointProps) {
  if (!checkpoint) {
    return null;
  }
  const customStyle = StyleSheet.flatten([styles.container, style]);
  return (
    <View style={customStyle}>
      <Gps style={styles.icon} />
      <Typography size="Body 1">{checkpoint}</Typography>
    </View>
  );
}

export default React.memo(Checkpoint);

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
