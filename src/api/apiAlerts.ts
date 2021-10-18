import {AxiosError} from 'axios';
import {Alert, AlertButton} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export function alert(e: AxiosError) {
  const isAuthError = e.response?.status === 401;
  let title = 'Error';
  if (isAuthError) {
    title = 'Authentication failed';
  }

  let requestBody = '';
  if (typeof e.config.data === 'string') {
    try {
      requestBody = JSON.stringify(JSON.parse(e.config.data), null, 2);
    } catch {
      requestBody = e.config.data;
    }
  }

  const message = `
url: ${e.request?.responseURL}
code: ${e.response?.status}
response: ${JSON.stringify(e.response?.data ?? {}, null, 2)}
requestBody: ${requestBody}
`;
  const button: AlertButton = {
    text: 'Copy',
    onPress: () => {
      Clipboard.setString(message);
    },
  };
  Alert.alert(title, message, [button]);
}
