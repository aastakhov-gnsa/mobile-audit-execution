import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {
  fillStandards,
  setDownloadedFile,
} from '../SurveyExecution/evaluationReducer';
import downloadFile from '../../utils/files/downloadFile';
import {addFile, changeFileStatus, deleteFile} from './fileLoadingReducer';
import {AuditStandardExecution} from '../../interfaces/standard';
import {SmFile} from '../../interfaces/common';

const downloadFilesMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (action.type === fillStandards.type) {
      next(action);
      const state = getState();
      const token = state.auth.token;
      const {standards, surveyId: id} = action.payload as {
        surveyId: string;
        standards: AuditStandardExecution[];
      };
      if (token) {
        standards.forEach(st => {
          downloadImp({
            id,
            files: st.files,
            token,
            dispatch,
            standardId: st.id,
          });
          st.questionDTOList?.forEach(q => {
            downloadImp({
              id,
              files: q.files,
              token,
              dispatch,
              standardId: st.id,
              questionId: q.id,
            });
          });
        });
      }
    }
    return next(action);
  };

export default downloadFilesMiddleware;

function downloadImp({
  id,
  files,
  token,
  dispatch,
  standardId,
  questionId,
}: {
  id: string;
  files?: SmFile[];
  token: string;
  dispatch: Dispatch<AnyAction>;
  standardId: string;
  questionId?: string;
}) {
  files?.forEach(f => {
    if (!f.options?._path) {
      downloadFile({
        fileId: f.id,
        fileName: f.value,
        token,
        onStartCb: () =>
          dispatch(
            addFile({
              entityId: id,
              fileId: f.id,
              path: '',
              status: 'downloading',
              name: f.value,
            }),
          ),
        onSuccessCb: () => {
          dispatch(deleteFile({entityId: id, fileId: f.id}));
        },
        resPathCb: p => {
          console.log('--=', p);
          dispatch(
            setDownloadedFile({
              surveyId: id,
              standardId: standardId,
              questionId: questionId,
              filePath: p,
              fileId: f.id,
            }),
          );
        },
        onRetryCb: () => {
          dispatch(
            changeFileStatus({
              entityId: id,
              fileId: f.id,
              newStatus: 'downloading',
            }),
          );
        },
        errCb: e => {
          dispatch(
            changeFileStatus({
              entityId: id,
              fileId: f.id,
              newStatus: 'error',
            }),
          );
          console.error('e', e);
        },
      });
    }
  });
}
