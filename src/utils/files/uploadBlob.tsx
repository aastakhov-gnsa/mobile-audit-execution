import ReactNativeBlobUtil, {FetchBlobResponse} from 'react-native-blob-util';
import {__API__} from '../../api/api';
import getFileName from './getFileName';
import {FetchBlobUtilRequest} from '../../interfaces/files';
import {fileUploadAlert} from '../../api/apiAlerts';

interface UploadFiles {
  questionId: string;
  filePath: string;
  token: string;
  onProgressCb: (part: number) => void;
}

export default function ({
  questionId,
  filePath,
  token,
  onProgressCb,
}: UploadFiles) {
  const url = `${__API__}/rest/mobile-audit-execution/file?questionId=${questionId}`;
  const formData = [];
  const fileName = getFileName(filePath);
  formData.push({
    name: 'file',
    filename: fileName,
    data: ReactNativeBlobUtil.wrap(filePath),
  });

  const config: FetchBlobUtilRequest = {
    method: 'POST',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
    data: formData,
  };
  ReactNativeBlobUtil.fetch('POST', config.url, config.headers, config.data)
    .uploadProgress((written, total) => {
      // console.log('uploaded', fileName, written / total);
      onProgressCb(written / total);
    })
    .then((response: FetchBlobResponse) => {
      if (response.respInfo.status !== 200) {
        fileUploadAlert(fileName, config, response);
      }
      console.log('uploadBlob::response', response);
    })
    .catch(err => {
      fileUploadAlert(fileName, config, undefined, err);
    });
}
