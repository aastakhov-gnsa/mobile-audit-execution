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

interface AddCommentProps {
  surveyId: string;
  standardId: string;
  attachedComment?: string;
  commentType?: CommentType;
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

  return (
    <>
      {visible && (
        <CommentModal
          visible={visible}
          onVisible={handleVisible}
          onSave={handleSave}
          chips={chips}
          validationMessage="Fill comment and chose type of comment"
        />
      )}
      <TouchableText
        onPress={handleVisible}
        size="Button"
        iconName={attachedComment ? 'comment' : 'add-comment'}>{`${
        attachedComment ? commentType?.toUpperCase() : 'ADD'
      } COMMENT`}</TouchableText>
    </>
  );
}

export default React.memo(AddComment);
