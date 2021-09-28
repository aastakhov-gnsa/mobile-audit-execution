import React from 'react';
import Typography from '../../../components/Typography';
import {StandardQuestion as StandardQuestionType} from '../../../interfaces/standard';
import ItemWrapper from '../../../components/ItemWrapper';
import {Divider} from 'react-native-paper';
import QuestionOption from './QuestionOption';

export interface StandardQuestionProps {
  question: StandardQuestionType;
  questionIndex: number;
  total: number;
}

function StandardQuestion({
  question,
  questionIndex,
  total,
}: StandardQuestionProps) {
  return (
    <>
      <Divider />
      <ItemWrapper paddingValue={24}>
        <Typography size="Headline 6">
          {question.mcName} · {questionIndex + 1} of {total}
        </Typography>
      </ItemWrapper>
      {!question.isOptionsPresent && (
        <QuestionOption
          title={question.mcName}
          value={question.mcName}
          description={question.mcDescription}
        />
      )}
      {/*todo ellipse (ellipsizeMode does not work on iOS in case end of line in not a letter)*/}
      {question.isOptionsPresent && question.mcDescription && (
        <Typography size={'Body 1'}>{question.mcDescription}</Typography>
      )}
      {question.isOptionsPresent &&
        question.optionsExecution?.map((item, index) => {
          return (
            <QuestionOption
              title={`${index + 1}. ${item.value}`}
              value={item.value}
              description={item.hint}
            />
          );
        })}
    </>
  );
}

export default React.memo(StandardQuestion);
