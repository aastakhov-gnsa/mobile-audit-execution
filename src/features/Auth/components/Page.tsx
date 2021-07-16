import React, {ReactNode} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const image = require('../assets/background-new.png');

function Page({children}: {children: ReactNode}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default React.memo(Page);
