import React from 'react';
import Pdf from 'react-native-pdf';
import {StyleSheet} from 'react-native';

export interface SvSRPreviewPdfProps {
  uri: string;
}

export function SvSRPreviewPdf({uri}: SvSRPreviewPdfProps) {
  return (
    <Pdf
      fitPolicy={0}
      style={styles.container}
      source={{uri}}
      onError={e => {
        console.warn('error');
        console.error(e);
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
