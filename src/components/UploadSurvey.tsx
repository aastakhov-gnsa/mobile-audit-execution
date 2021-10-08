import React from 'react';
import {
  ActivityIndicator,
  Button,
  Portal,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from '../utils/store/configureStore';
import {useUploadSurveyMutation} from '../features/Survey/surveyService';
import useModalVisibility from '../hooks/useModalVisibility';
import {removeSurvey} from '../features/SurveyExecution/evaluationReducer';

interface UploadSurveyProps {
  id: string;
}

function UploadSurvey({id}: UploadSurveyProps) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const surveyData = useSelector(state => state.evaluation[id]);
  const [upload, {isLoading}] = useUploadSurveyMutation();
  const [visible, handleVisible] = useModalVisibility();

  const handleClick = React.useCallback(async () => {
    upload({
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
    })
      .unwrap()
      .then(() => dispatch(removeSurvey(surveyData.id)))
      .catch(() => {
        handleVisible();
      });
  }, [
    handleVisible,
    surveyData.id,
    surveyData.resultCd,
    surveyData.standards,
    upload,
  ]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator animating={true} color={colors.primary} />
      ) : (
        <Button onPress={handleClick}>upload</Button>
      )}
      <Portal>
        <Snackbar visible={visible} onDismiss={handleVisible} duration={2000}>
          Upload failed
        </Snackbar>
      </Portal>
    </>
  );
}

export default React.memo(UploadSurvey);
