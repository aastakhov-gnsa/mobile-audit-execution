import {
  DocumentDirectoryPath,
  downloadFile as rnfsDownloadFile,
  DownloadResult,
} from 'react-native-fs';
import {__API__} from '../../api/api';

interface DownloadFile {
  fileName: string;
  fileId: string;
  token: string;
  resPathCb: (path: string) => void;
  errCb: (e: any) => void;
}
export default function downloadFile({
  fileName,
  fileId,
  token,
  resPathCb,
  errCb,
}: DownloadFile) {
  const path = `${DocumentDirectoryPath}/${fileName}`;
  rnfsDownloadFile({
    fromUrl: `${__API__}/rest/mobile-audit-execution/file?fileId=${fileId}`,
    toFile: path,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .promise.then((res: DownloadResult) => {
      if (res && res.statusCode === 200 && res.bytesWritten > 0) {
        resPathCb(path);
      } else {
        console.error('file is empty ', fileName, res);
        errCb(null);
      }
    })
    .catch(e => {
      console.error('failed to load ', fileName, e);
      errCb(e);
    });
}
