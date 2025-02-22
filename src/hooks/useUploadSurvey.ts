import React from 'react';
import {
  useDeleteFileMutation,
  useUploadSurveyMutation,
} from '../features/Survey/surveyService';
import {useSelector, useDispatch} from '../utils/store/configureStore';
import getFileName from '../utils/files/getFileName';
import {unlink} from 'react-native-fs';
import {removeSurvey} from '../features/SurveyExecution/evaluationReducer';
import {addFile} from '../features/FileLoading/fileLoadingReducer';

export function useUploadSurvey(id: string): [() => Promise<any>, boolean] {
  const surveyData = useSelector(state => state.evaluation[id]);
  const dispatch = useDispatch();
  const [upload, {isLoading}] = useUploadSurveyMutation();
  const [deleteFile] = useDeleteFileMutation();
  return [
    React.useCallback(async () => {
      const body = {
        id: surveyData.id,
        resultCd:
          surveyData.resultCd === 'In Progress' ? 'Open' : surveyData.resultCd,
        standards: surveyData.standards.map(standard => {
          return {
            id: standard.id,
            status: standard.status,
            publicComment: standard.publicComment ?? undefined,
            internalComment: standard.internalComment ?? undefined,
            overruleComment: standard.overruleComment?.value
              ? standard.overruleComment
              : undefined,
            questionDTOList: standard.questionDTOList?.map(q => {
              return {
                id: q.id,
                internalComment: q.internalComment ?? undefined,
                publicComment: q.publicComment ?? undefined,
                resultCd: q.isOptionsPresent ? undefined : q.resultCd,
                optionsExecution: !q.isOptionsPresent
                  ? undefined
                  : q.optionsExecution.map(o => ({
                      id: o.id,
                      resultCd: o.resultCd ?? undefined,
                    })),
              };
            }),
          };
        }),
      };
      return upload(body)
        .unwrap()
        .then(() => {
          surveyData.standards.forEach(st => {
            st.questionDTOList?.forEach(q => {
              // call deletion to files from server
              q.files
                .filter(i => i.options?._toDelete)
                .forEach(i => deleteFile(i.id));
              // sending new files
              q.files
                .filter(
                  i =>
                    i.options?._fromServer !== true &&
                    i.options?._toDelete !== true,
                )
                .forEach(i => {
                  const fileName = i.options?._useName
                    ? i.value
                    : getFileName(i.options?._path!) || i.id;
                  dispatch(
                    addFile({
                      surveyId: surveyData.id,
                      fileId: i.id,
                      entityId: q.id,
                      path: i.options?._path!,
                      name: fileName,
                      status: 'uploading',
                    }),
                  );
                });
            });
          });
        })
        .then(() => {
          surveyData.standards.forEach(st => {
            st.files?.forEach(f => {
              unlink(f.options!._path!).catch(
                e => console.error('failed deletion file', f.value, e), // todo implement alert
              );
            });
            st.questionDTOList?.forEach(q => {
              q.files
                .filter(i => i.options?._fromServer || i.options?._toDelete)
                .forEach(f => {
                  unlink(f.options!._path!).catch(
                    e => console.error('failed deletion file', f.value, e), // todo implement alert
                  );
                });
            });
          });
        })
        .then(() => {
          dispatch(removeSurvey(surveyData.id));
          return 'uploaded';
        })
        .catch(e => {
          console.error('upload error', {...e});
        });
    }, [
      deleteFile,
      dispatch,
      surveyData?.id,
      surveyData?.resultCd,
      surveyData?.standards,
      upload,
    ]),
    isLoading,
  ];
}
