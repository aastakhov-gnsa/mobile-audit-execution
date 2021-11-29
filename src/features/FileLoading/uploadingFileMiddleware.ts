import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {
  addFile,
  changeFileStatus,
  changeLoadPart,
  deleteFile,
} from './fileLoadingReducer';
import uploadBlob from '../../utils/files/uploadBlob';
import {Alert} from 'react-native';

const uploadingFileMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (action.type === addFile.type && action.payload.status === 'uploading') {
      next(action);
      const state = getState();
      const token = state.auth.token;
      const {entityId, path, fileId, name} = action.payload;
      const handleProgress = (n: number) =>
        dispatch(changeLoadPart({part: n, fileId: fileId, entityId}));
      const handleSuccess = () =>
        dispatch(deleteFile({fileId: fileId, entityId}));
      const handleError = () =>
        dispatch(
          changeFileStatus({
            fileId: fileId,
            newStatus: 'error',
            entityId,
          }),
        );
      const handleRetry = () =>
        dispatch(
          changeFileStatus({
            fileId: fileId,
            newStatus: 'uploading',
            entityId,
          }),
        );
      if (token) {
        uploadBlob({
          questionId: entityId,
          filePath: path,
          token: token,
          onProgressCb: handleProgress,
          onSuccessCb: handleSuccess,
          onFailCb: handleError,
          onRetryCb: handleRetry,
          fileName: name,
        });
      } else {
        Alert.alert('Unable to upload file', 'There is no token');
      }
    } else {
      return next(action);
    }
  };

export default uploadingFileMiddleware;
