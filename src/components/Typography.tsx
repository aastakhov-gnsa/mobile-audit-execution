import React, {memo} from 'react';
import {StyleSheet, Text, TextStyle, TextProps} from 'react-native';

export type TypographyProps = TextProps & {
  child?: React.ReactNode;
  size:
    | 'Headline 1'
    | 'Headline 2'
    | 'Headline 3'
    | 'Headline 4'
    | 'Headline 5'
    | 'Headline 6'
    | 'Subtitle 1'
    | 'Subtitle 2'
    | 'Body 1'
    | 'Body 2'
    | 'Button'
    | 'Caption'
    | 'Overline';
};

function Typography({style, size, ...rest}: TypographyProps) {
  const customStyle = StyleSheet.compose(map[size], style);
  return <Text style={customStyle} children={rest.child} {...rest} />;
}

const map: Record<TypographyProps['size'], TextStyle> = {
  'Headline 6': {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  'Headline 5': {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
  },
  'Headline 4': {
    fontSize: 34,
    fontFamily: 'Roboto-Regular',
  },
  'Headline 3': {
    fontSize: 48,
    fontFamily: 'Roboto-Regular',
  },
  'Headline 2': {
    fontSize: 60,
    fontFamily: 'Roboto-Light',
  },
  'Headline 1': {
    fontSize: 96,
    fontFamily: 'Roboto-Light',
  },
  'Subtitle 1': {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  'Subtitle 2': {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  'Body 1': {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  'Body 2': {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  Button: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  Caption: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
  },
  Overline: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
  },
};

export default memo(Typography);
