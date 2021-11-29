import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {NavigationParams} from '../../interfaces/navigation';
import Typography from '../../components/Typography';
import {StyleSheet} from 'react-native';

interface FileViewScreenParams {
  fileName: string;
  filePath: string;
}
function FileViewScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationParams>();

  const {fileName, filePath} = route.params as FileViewScreenParams;
  React.useEffect(() => {
    navigation.setOptions({
      title: <Typography size="Headline 6">{fileName}</Typography>,
    });
  });
  return (
    <WebView
      source={{uri: filePath}}
      style={styles.container}
      originWhitelist={['*']}
    />
  );
}

export default React.memo(FileViewScreen);

const styles = StyleSheet.create({
  container: {flex: 1},
});
