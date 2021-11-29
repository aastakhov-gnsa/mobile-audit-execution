import {
  DocumentDirectoryPath,
  downloadFile as rnfsDownloadFile,
  DownloadFileOptions,
  DownloadResult,
} from 'react-native-fs';
import {__API__} from '../../api/api';
import {fileDownloadAlert} from '../../api/apiAlerts';

interface DownloadFile {
  fileName: string;
  onStartCb: () => void;
  onSuccessCb: () => void;
  resPathCb: (path: string) => void;
  errCb: (e: any) => void;
  onRetryCb: () => void;
  token?: string;
  fileId?: string;
  requestConfig?: DownloadFileOptions;
}
export default function downloadFile({
  fileName,
  fileId,
  token,
  onSuccessCb,
  onStartCb,
  resPathCb,
  errCb,
  onRetryCb,
  requestConfig,
}: DownloadFile) {
  const path = `${DocumentDirectoryPath}/${fileName}`;
  const config: DownloadFileOptions = requestConfig
    ? requestConfig
    : {
        fromUrl: `${__API__}/rest/mobile-audit-execution/file?fileId=${fileId}`,
        toFile: path,
        headers: {
          authorization: `Bearer ${token}`,
        },
        begin: res => {
          onStartCb();
          console.log('begin to loading file', fileName, res);
        },
      };
  rnfsDownloadFile(config)
    .promise.then((res: DownloadResult) => {
      if (res && res.statusCode === 200 && res.bytesWritten > 0) {
        onSuccessCb();
        resPathCb(path);
      } else {
        errCb(null);
        fileDownloadAlert({
          requestConfig: config,
          response: res,
          onSuccessCb,
          resPathCb,
          onStartCb,
          onRetryCb,
          fileName,
          errCb,
          e: `file is empty ${fileName} ${JSON.stringify(res, null, 2)}`,
        });
        console.error('file is empty ', fileName, res);
      }
    })
    .catch(e => {
      errCb(e);
      console.error('failed to load ', fileName, e);
      fileDownloadAlert({
        requestConfig: config,
        e,
        onSuccessCb,
        onRetryCb,
        fileName,
        errCb,
        onStartCb,
        resPathCb,
      });
    });
}
