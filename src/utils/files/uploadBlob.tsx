import ReactNativeBlobUtil, {FetchBlobResponse} from 'react-native-blob-util';
import {__API__} from '../../api/api';
import getFileName from './getFileName';
import {FetchBlobUtilRequest} from '../../interfaces/files';
import {fileUploadAlert} from '../../api/apiAlerts';

interface UploadFiles {
  onProgressCb: (part: number) => void;
  onSuccessCb: () => void;
  onFailCb: () => void;
  onRetryCb: () => void;
  questionId?: string;
  filePath?: string;
  token?: string;
  requestConfig?: FetchBlobUtilRequest;
}

export default function ({
  questionId,
  filePath,
  token,
  onProgressCb,
  onSuccessCb,
  onFailCb,
  requestConfig,
  onRetryCb,
}: UploadFiles) {
  const config: FetchBlobUtilRequest = {};
  if (requestConfig) {
    config.method = requestConfig.method;
    config.url = requestConfig.url;
    config.headers = requestConfig.headers;
    config.data = requestConfig.data;
  } else {
    const fileName = getFileName(filePath!);
    const url = `${__API__}/rest/mobile-audit-execution/file?questionId=${questionId}`;
    const formData = [];
    formData.push({
      name: 'file',
      filename: fileName,
      data: ReactNativeBlobUtil.wrap(filePath!),
    });
    config.method = 'POST';
    config.url = url;
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    };
    config.data = formData;
  }

  ReactNativeBlobUtil.fetch('POST', config.url!, config.headers, config.data)
    .uploadProgress((written, total) => {
      // console.log('uploaded', fileName, written / total);
      onProgressCb(written / total);
    })
    .then((response: FetchBlobResponse) => {
      if (response.respInfo.status !== 200) {
        onFailCb();
        fileUploadAlert({
          requestConfig: config,
          response: response,
          onFailCb: onFailCb,
          onProgressCb: onProgressCb,
          onSuccessCb: onSuccessCb,
          onRetryCb: onRetryCb,
        });
      } else {
        onSuccessCb();
      }
      console.log('uploadBlob::response', response);
    })
    .catch(err => {
      onFailCb();
      fileUploadAlert({
        requestConfig: config,
        e: err,
        onFailCb: onFailCb,
        onProgressCb: onProgressCb,
        onSuccessCb: onSuccessCb,
        onRetryCb: onRetryCb,
      });
    });
}
