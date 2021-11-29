import {AxiosError} from 'axios';
import {Alert, AlertButton} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {FetchBlobResponse} from 'react-native-blob-util';
import {FetchBlobUtilRequest} from '../interfaces/files';
import uploadBlob from '../utils/files/uploadBlob';
import {DownloadFileOptions, DownloadResult} from 'react-native-fs';
import downloadFile from '../utils/files/downloadFile';
import i18n from 'i18next';

export function alert(e: AxiosError) {
  let requestBody = '';
  if (typeof e.config.data === 'string') {
    try {
      requestBody = JSON.stringify(JSON.parse(e.config.data), null, 2);
    } catch {
      requestBody = e.config.data;
    }
  }
  defaultAlert({
    url: e.request?.responseURL,
    code: e.response?.status,
    response: JSON.stringify(e.response?.data ?? {}, null, 2),
    requestBody,
  });
}

interface DefaultAlertProps {
  title?: string;
  url?: string;
  code?: number;
  response?: string;
  requestBody?: string;
}

export function defaultAlert({
  url,
  code,
  response,
  requestBody,
}: DefaultAlertProps) {
  const isAuthError = code === 401;
  let title = 'Error';
  if (isAuthError) {
    title = 'Authentication failed';
  }
  const message = `
  url: ${url}
  code: ${code}
  response: ${response}
  requestBody: ${requestBody}
  `;
  const button: AlertButton = {
    text: i18n.t('Copy'),
    onPress: () => {
      Clipboard.setString(message);
    },
  };
  Alert.alert(title, message, [button]);
}

export function fileUploadAlert({
  requestConfig,
  response,
  e,
  onProgressCb,
  onSuccessCb,
  onFailCb,
  onRetryCb,
}: {
  requestConfig: FetchBlobUtilRequest;
  response?: FetchBlobResponse;
  e?: any;
  onProgressCb: (part: number) => void;
  onSuccessCb: () => void;
  onFailCb: () => void;
  onRetryCb: () => void;
}) {
  const message = `
url: ${requestConfig.url}
response: ${JSON.stringify(response, null, 2)}
requestConfig: ${JSON.stringify(requestConfig, null, 2)}
exception: ${JSON.stringify(e, null, 2)}
  `;
  const button: AlertButton = {
    text: i18n.t('Copy error and Cancel'),
    onPress: () => {
      Clipboard.setString(message);
      onSuccessCb();
    },
  };
  const retryButton: AlertButton = {
    text: i18n.t('Retry'),
    onPress: () => {
      onRetryCb();
      uploadBlob({
        requestConfig,
        onSuccessCb,
        onProgressCb,
        onFailCb,
        onRetryCb,
      });
    },
  };
  Alert.alert(`Upload file ${requestConfig.data[0].fileName} failed`, message, [
    button,
    retryButton,
  ]);
}

export function fileDownloadAlert({
  fileName,
  requestConfig,
  response,
  onSuccessCb,
  resPathCb,
  onStartCb,
  errCb,
  onRetryCb,
  e,
}: {
  fileName: string;
  requestConfig: DownloadFileOptions;
  onSuccessCb: () => void;
  onStartCb: () => void;
  resPathCb: (path: string) => void;
  errCb: (e: any) => void;
  onRetryCb: () => void;
  response?: DownloadResult;
  e?: any;
}) {
  const message = `
url: ${requestConfig.fromUrl}
response: ${JSON.stringify(response, null, 2)}
requestConfig: ${JSON.stringify(requestConfig, null, 2)}
exception: ${JSON.stringify(e, null, 2)}
  `;
  const button: AlertButton = {
    text: 'Copy error and Cancel',
    onPress: () => {
      Clipboard.setString(message);
      onSuccessCb();
    },
  };
  const retryButton: AlertButton = {
    text: 'Retry',
    onPress: () => {
      onRetryCb();
      downloadFile({
        requestConfig,
        fileName,
        onSuccessCb,
        onRetryCb,
        resPathCb,
        onStartCb,
        errCb,
      });
    },
  };
  Alert.alert(`Download file ${fileName} failed`, message, [
    button,
    retryButton,
  ]);
}
