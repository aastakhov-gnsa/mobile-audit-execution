import React from 'react';
import TouchableText from '../../../components/TouchableText';
import {useDispatch} from '../../../utils/store/configureStore';
import {
  changeQuestionComment,
  changeStandardComment,
} from '../evaluationReducer';
import CommentModal from '../../../components/CommentModal';
import useModalVisibility from '../../../hooks/useModalVisibility';
import {OverruleStatus} from '../../../interfaces/common';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';

interface AddCommentProps {
  surveyId: string;
  standardId: string;
  internalComment: string;
  publicComment: string;
  questionId?: string;
}

function AddComment({
  surveyId,
  standardId,
  internalComment,
  publicComment,
  questionId,
}: AddCommentProps) {
  const [visible, handleVisible] = useModalVisibility();
  const dispatch = useDispatch();
  const handleSave = React.useCallback(
    ({
      textInternal,
      textPublic,
    }: {
      textInternal: string | OverruleStatus;
      textPublic: string | OverruleStatus;
    }) => {
      dispatch(
        questionId
          ? changeQuestionComment({
              standardId,
              questionId,
              surveyId,
              internalComment: textInternal,
              publicComment: textPublic,
            })
          : changeStandardComment({
              standardId,
              surveyId,
              internalComment: textInternal,
              publicComment: textPublic,
            }),
      );
    },
    [dispatch, questionId, standardId, surveyId],
  );
  const handleResetComment = React.useCallback(() => {
    handleVisible();
    dispatch(
      questionId
        ? changeQuestionComment({
            standardId,
            questionId,
            surveyId,
            internalComment: null,
            publicComment: null,
          })
        : changeStandardComment({
            standardId,
            surveyId,
            internalComment: null,
            publicComment: null,
          }),
    );
  }, [dispatch, handleVisible, questionId, standardId, surveyId]);
  const {t} = useTranslation();
  return (
    <>
      {visible && (
        <CommentModal
          visible={visible}
          onVisible={handleVisible}
          onSave={handleSave}
          validationMessage={t('Fill comment and chose type of comment')}
          defaultTextInternal={internalComment}
          defaultTextPublic={publicComment}
          extraButtons={[
            <Button mode="text" onPress={handleResetComment}>
              {t('Delete Comment')}
            </Button>,
          ]}
        />
      )}
      <TouchableText
        onPress={handleVisible}
        size="Button"
        iconName={internalComment || publicComment ? 'comment' : 'add-comment'}>
        {internalComment || publicComment
          ? t('edit comment').toUpperCase()
          : t('add comment').toUpperCase()}
      </TouchableText>
    </>
  );
}

export default React.memo(AddComment);
