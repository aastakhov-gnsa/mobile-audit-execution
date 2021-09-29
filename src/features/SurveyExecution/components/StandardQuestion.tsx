import React from 'react';
import Typography from '../../../components/Typography';
import {
  ResultCd,
  StandardQuestion as StandardQuestionType,
} from '../../../interfaces/standard';
import ItemWrapper from '../../../components/ItemWrapper';
import {Divider, useTheme} from 'react-native-paper';
import QuestionOption from './QuestionOption';
import {StyleSheet} from 'react-native';
import HeaderText from '../../../components/HeaderText';
import AddComment from './AddComment';
import CommentWithColor from '../../../components/CommentWithColor';
import {useDispatch} from '../../../utils/store/configureStore';
import {
  changeQuestionOptionResult,
  changeQuestionResult,
} from '../evaluationReducer';

export interface StandardQuestionProps {
  standardId: string;
  surveyId: string;
  question: StandardQuestionType;
  questionIndex: number;
  total: number;
  disabled?: boolean;
}

function StandardQuestion({
  question,
  questionIndex,
  total,
  standardId,
  surveyId,
  disabled,
}: StandardQuestionProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const handleQuestionResult = React.useCallback(
    (rCd: ResultCd) => {
      dispatch(
        changeQuestionResult({
          surveyId,
          standardId,
          questionId: question.id,
          resultCd: rCd === question.resultCd ? null : rCd,
        }),
      );
    },
    [dispatch, question.id, question.resultCd, standardId, surveyId],
  );
  const createQuestionOptionHandler = React.useCallback(
    (opId: string) => (rCd: ResultCd) => {
      const option = question.optionsExecution.find(i => i.id === opId);
      const currentOptionResult = option?.resultCd;
      dispatch(
        changeQuestionOptionResult({
          surveyId,
          standardId,
          questionId: question.id,
          optionId: opId,
          resultCd: rCd === currentOptionResult ? null : rCd,
        }),
      );
    },
    [dispatch, question.id, question.optionsExecution, standardId, surveyId],
  );
  return (
    <>
      <Divider />
      <ItemWrapper paddingValue={24}>
        <HeaderText
          status={
            question.isOptionsPresent
              ? question.optionsExecution?.find(i => i.resultCd)?.resultCd
              : question.resultCd
          }>
          {question.mcName} · {questionIndex + 1} of {total}
        </HeaderText>
      </ItemWrapper>
      {!question.isOptionsPresent && (
        <QuestionOption
          disabled={disabled}
          onChange={handleQuestionResult}
          title={question.mcName}
          resultCd={question.resultCd}
          description={question.mcDescription}
        />
      )}
      {/*todo ellipse (ellipsizeMode does not work on iOS in case end of line in not a letter)*/}
      {question.isOptionsPresent && !!question.mcDescription && (
        <ItemWrapper paddingValue={[0, 20]}>
          <Typography size={'Body 1'}>{question.mcDescription}</Typography>
        </ItemWrapper>
      )}
      {question.isOptionsPresent &&
        question.optionsExecution?.map((item, index) => {
          return (
            <QuestionOption
              disabled={disabled}
              key={item.id}
              onChange={createQuestionOptionHandler(item.id)}
              title={`${index + 1}. ${item.value}`}
              resultCd={item.resultCd}
              description={item.hint}
            />
          );
        })}
      {question?.attachedComment && (
        <ItemWrapper paddingValue={[0, 30]}>
          <CommentWithColor
            title={`${question?.commentType} comment`}
            value={question?.attachedComment}
          />
        </ItemWrapper>
      )}
      <ItemWrapper style={styles.addActions} paddingValue={[0, 30]}>
        <AddComment
          attachedComment={question.attachedComment}
          commentType={question.commentType}
          standardId={standardId}
          surveyId={surveyId}
          questionId={question.id}
        />
        <Typography size="Button" style={styles.button}>
          ADD PHOTOS
        </Typography>
      </ItemWrapper>
    </>
  );
}

export default React.memo(StandardQuestion);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    addActions: {
      width: '35%',
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
    },
    button: {
      color: colors.primary,
    },
  });
