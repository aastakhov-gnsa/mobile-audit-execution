import React from 'react';
import TouchableText from '../../../components/TouchableText';
import {CommentType} from '../../../interfaces/standard';
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
  attachedComment?: string | null;
  commentType?: CommentType | null;
  questionId?: string;
}

const chips: Array<{title: string; value: CommentType}> = [
  {
    value: 'Internal',
    title: 'Internal Comment',
  },
  {
    value: 'External',
    title: 'External Comment',
  },
];

function AddComment({
  surveyId,
  standardId,
  attachedComment,
  commentType,
  questionId,
}: AddCommentProps) {
  const [visible, handleVisible] = useModalVisibility();
  const dispatch = useDispatch();
  const handleSave = React.useCallback(
    ({text, chip}: {text: string; chip: CommentType | OverruleStatus}) => {
      dispatch(
        questionId
          ? changeQuestionComment({
              standardId,
              questionId,
              surveyId,
              commentType: chip as CommentType,
              attachedComment: text,
            })
          : changeStandardComment({
              standardId,
              surveyId,
              commentType: chip as CommentType,
              attachedComment: text,
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
            commentType: null,
            attachedComment: null,
          })
        : changeStandardComment({
            standardId,
            surveyId,
            commentType: null,
            attachedComment: null,
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
          chips={chips}
          validationMessage={t('Fill comment and chose type of comment')}
          defaultText={attachedComment}
          defaultChip={commentType ?? chips[1].value}
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
        iconName={attachedComment ? 'comment' : 'add-comment'}>
        {attachedComment
          ? t(
              commentType === 'Internal'
                ? 'Internal Comment'
                : 'External Comment',
            ).toUpperCase()
          : t('add comment').toUpperCase()}
      </TouchableText>
    </>
  );
}

export default React.memo(AddComment);
