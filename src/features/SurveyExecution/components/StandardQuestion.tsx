import React from 'react';
import Typography from '../../../components/Typography';
import {StandardQuestion as StandardQuestionType} from '../../../interfaces/standard';
import ItemWrapper from '../../../components/ItemWrapper';
import {Divider, useTheme} from 'react-native-paper';
import QuestionOption from './QuestionOption';
import {StyleSheet, View} from 'react-native';
import HeaderText from '../../../components/HeaderText';
import AddComment from './AddComment';
import CommentWithColor from '../../../components/CommentWithColor';
import {useDispatch} from '../../../utils/store/configureStore';
import {
  changeQuestionOptionResult,
  changeQuestionResult,
  deleteLocalFile,
  markFileAsDeleted,
} from '../evaluationReducer';
import {ResultCd} from '../../../interfaces/common';
import useCurrentLanguage from '../../../hooks/useCurrentLanguage';
import {useTranslation} from 'react-i18next';
import AddPhotos from '../../../components/AddPhotos';
import FilesPanel from '../../../components/FilesPanel';
import FileAttachment from '../../../components/FileAttachment';
import numToChar from '../../../utils/common/numToChar';

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
  const [langCode, needTranslation] = useCurrentLanguage();

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

  const handleDeleteFile = React.useCallback(
    (fId: string) => {
      const currentFile = question.files.find(i => i.id === fId);
      if (currentFile?.options?._fromServer) {
        dispatch(
          markFileAsDeleted({
            surveyId,
            standardId,
            questionId: question.id,
            fileId: fId,
          }),
        );
      } else {
        dispatch(
          deleteLocalFile({
            surveyId,
            standardId,
            questionId: question.id,
            fileId: fId,
          }),
        );
      }
    },
    [dispatch, question.files, question.id, standardId, surveyId],
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
  const {t} = useTranslation();
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
          {needTranslation && question.nameTranslations?.[langCode]
            ? question.nameTranslations?.[langCode]
            : question.mcName}{' '}
          · {questionIndex + 1} {t('of')} {total}
        </HeaderText>
      </ItemWrapper>
      {!question.isOptionsPresent && (
        <QuestionOption
          disabled={disabled}
          onChange={handleQuestionResult}
          title={question.mcName}
          resultCd={question.resultCd}
          description={
            needTranslation && question.textTranslations?.[langCode]
              ? question.textTranslations?.[langCode]
              : question.mcDescription
          }
        />
      )}
      {/*todo ellipse (ellipsizeMode does not work on iOS in case end of line in not a letter)*/}
      {question.isOptionsPresent && !!question.mcDescription && (
        <ItemWrapper paddingValue={[0, 20]}>
          <Typography size={'Body 1'}>
            {needTranslation && question.textTranslations?.[langCode]
              ? question.textTranslations?.[langCode]
              : question.mcDescription}
          </Typography>
        </ItemWrapper>
      )}
      {question.isOptionsPresent &&
        question.optionsExecution?.map((item, index) => {
          return (
            <QuestionOption
              disabled={disabled}
              key={item.id}
              onChange={createQuestionOptionHandler(item.id)}
              title={`${numToChar(index + 1)}. ${
                needTranslation && item.valueTranslations?.[langCode]
                  ? item.valueTranslations?.[langCode]
                  : item.value
              }`}
              resultCd={item.resultCd}
              description={
                needTranslation && item.hintTranslations?.[langCode]
                  ? item.hintTranslations?.[langCode]
                  : item.hint
              }
            />
          );
        })}
      {question?.internalComment && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title={`${t('Internal Comment')}`}
            value={question?.internalComment}
          />
        </ItemWrapper>
      )}
      {question?.publicComment && (
        <ItemWrapper paddingValue={[32, 0]}>
          <CommentWithColor
            title={`${t('External Comment')}`}
            value={question?.publicComment}
          />
        </ItemWrapper>
      )}
      <ItemWrapper style={styles.addActions} paddingValue={[0, 30]}>
        <View style={styles.mr}>
          <AddComment
            internalComment={question.internalComment}
            publicComment={question.publicComment}
            standardId={standardId}
            surveyId={surveyId}
            questionId={question.id}
          />
        </View>
        <View style={styles.mr}>
          <AddPhotos
            surveyId={surveyId}
            standardId={standardId}
            questionId={question.id}
          />
        </View>
        <View style={styles.mr}>
          <FileAttachment
            surveyId={surveyId}
            standardId={standardId}
            questionId={question.id}
          />
        </View>
      </ItemWrapper>
      {question.files.filter(i => !i.options?._toDelete).length > 0 && (
        <ItemWrapper paddingValue={[0, 30]} title="Files">
          <FilesPanel
            files={question.files}
            onDelete={handleDeleteFile}
            surveyId={surveyId}
            standardId={standardId}
            questionId={question.id}
          />
        </ItemWrapper>
      )}
    </>
  );
}

export default React.memo(StandardQuestion);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    addActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      color: colors.primary,
    },
    mr: {
      marginRight: 20,
    },
  });
