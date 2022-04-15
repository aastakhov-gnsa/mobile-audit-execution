import ReactNativeBlobUtil, {FetchBlobResponse} from 'react-native-blob-util';
import {__API__} from '../../api/api';
import getFileName from './getFileName';
import {FetchBlobUtilRequest} from '../../interfaces/files';
import {fileUploadAlert} from '../../api/apiAlerts';

import {RnBlobUtilConfig, spaceMatcher} from '../../constants/constants';

interface UploadFiles {
  onProgressCb: (part: number) => void;
  onSuccessCb: () => void;
  onFailCb: () => void;
  onRetryCb: () => void;
  questionId?: string;
  filePath?: string;
  token?: string;
  requestConfig?: FetchBlobUtilRequest;
  fileName?: string;
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
  fileName,
}: UploadFiles) {
  const config: FetchBlobUtilRequest = {};
  if (requestConfig) {
    config.method = requestConfig.method;
    config.url = requestConfig.url;
    config.headers = requestConfig.headers;
    config.data = requestConfig.data;
  } else {
    const fName = fileName || getFileName(filePath!);
    const url = `${__API__}/rest/mobile-audit-execution/file?questionId=${questionId}`;
    const formData = [];
    formData.push({
      name: 'file',
      filename: fName,
      data: ReactNativeBlobUtil.wrap(filePath!.replace(spaceMatcher, ' ')),
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

  ReactNativeBlobUtil.config(RnBlobUtilConfig)
    .fetch('POST', config.url!, config.headers, config.data)
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
      console.log('uploadBlob::err', {...err});
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
