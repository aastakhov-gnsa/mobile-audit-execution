import React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from '../utils/store/configureStore';
import {
  useDeleteFileMutation,
  useUploadSurveyMutation,
} from '../features/Survey/surveyService';
import {removeSurvey} from '../features/SurveyExecution/evaluationReducer';
import {useTranslation} from 'react-i18next';
import {unlink} from 'react-native-fs';
import uploadBlob from '../utils/files/uploadBlob';
import Typography from './Typography';
import {StyleSheet} from 'react-native';
import getFileName from '../utils/files/getFileName';

interface UploadSurveyProps {
  id: string;
}

function UploadSurvey({id}: UploadSurveyProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const surveyData = useSelector(state => state.evaluation[id]);
  const [upload, {isLoading}] = useUploadSurveyMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [uploadingFiles, setUploadingFiles] = React.useState<{
    [id: string]: {name: string; part: number};
  }>({});
  const token = useSelector(state => state.auth.token);
  const handleClick = React.useCallback(async () => {
    const body = {
      id: surveyData.id,
      resultCd: surveyData.resultCd,
      standards: surveyData.standards.map(standard => {
        return {
          id: standard.id,
          status: standard.status,
          commentType: standard.commentType ?? undefined,
          attachedComment: standard.attachedComment ?? undefined,
          overruleComment: standard.overruleComment?.value
            ? standard.overruleComment
            : undefined,
          questionDTOList: standard.questionDTOList?.map(q => {
            return {
              id: q.id,
              attachedComment: q.attachedComment ?? undefined,
              commentType: q.commentType ?? undefined,
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
    upload(body)
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
                const fileName = getFileName(i.options?._path!) || i.id;
                uploadBlob({
                  questionId: q.id,
                  filePath: i.options?._path!,
                  token: token!,
                  onProgressCb: n => {
                    console.log('UploadSurvey::onProgressCb', i.id, n);
                    setUploadingFiles({
                      ...uploadingFiles,
                      [i.id]: {name: fileName, part: n},
                    });
                  },
                });
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
            q.files.forEach(f => {
              unlink(f.options!._path!).catch(
                e => console.error('failed deletion file', f.value, e), // todo implement alert
              );
            });
          });
        });
        dispatch(removeSurvey(surveyData.id));
      })
      .catch(() => {});
  }, [
    deleteFile,
    dispatch,
    surveyData.id,
    surveyData.resultCd,
    surveyData.standards,
    token,
    upload,
    uploadingFiles,
  ]);
  const {t} = useTranslation();

  console.log('uploadingFiles', uploadingFiles);
  return (
    <>
      {isLoading && (
        <Typography size="Button" style={styles.hint}>
          {t('Uploading survey').toUpperCase() + '...'}
        </Typography>
      )}
      {!isLoading && <Button onPress={handleClick}>{t('upload')}</Button>}
      {/*todo uploading progress displaing*/}
      {/*<Portal>*/}
      {/*  {Object.values(uploadingFiles).map(i => {*/}
      {/*    return (*/}
      {/*      <Snackbar visible={i.part < 1} onDismiss={() => null}>*/}
      {/*        <ProgressBar progress={i.part} />*/}
      {/*      </Snackbar>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Portal>*/}
    </>
  );
}

export default React.memo(UploadSurvey);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    hint: {
      color: colors.text50,
    },
  });
