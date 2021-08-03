import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Subheading} from 'react-native-paper';

interface ListInfoCaptionProps {
  leftCaption: string;
  rightCaption?: string;
}

function ListInfoCaption({leftCaption, rightCaption}: ListInfoCaptionProps) {
  return (
    <View style={styles.info}>
      <Subheading style={styles.left}>{leftCaption}</Subheading>
      <Subheading style={styles.right}>{rightCaption}</Subheading>
    </View>
  );
}

export default React.memo(ListInfoCaption);

const styles = StyleSheet.create({
  info: {
    paddingTop: '1%',
    paddingBottom: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    fontWeight: '500',
  },
  right: {
    fontWeight: '500',
    opacity: 0.5,
  },
});
