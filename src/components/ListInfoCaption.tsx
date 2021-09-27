import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';

interface ListInfoCaptionProps {
  leftCaption: string;
  rightCaption?: string;
}

function ListInfoCaption({leftCaption, rightCaption}: ListInfoCaptionProps) {
  return (
    <View style={styles.info}>
      <Typography size="Subtitle 2">{leftCaption}</Typography>
      <Typography size="Subtitle 2" style={styles.right}>
        {rightCaption}
      </Typography>
    </View>
  );
}

export default React.memo(ListInfoCaption);

const styles = StyleSheet.create({
  info: {
    paddingBottom: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    opacity: 0.5,
  },
});
