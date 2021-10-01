import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Evaluation} from '../../interfaces/evaluation';
import {AuditStandardExecution, CommentType} from '../../interfaces/standard';
import {Survey} from '../../interfaces/survey';
import {EMPTY_ARRAY} from '../../constants/constants';
import {OverruleStatus, ResultCd, Status} from '../../interfaces/common';

const initState: Evaluation = {};
export const evaluationReducer = createSlice({
  name: 'evaluation',
  initialState: initState,
  reducers: {
    addSurvey: (
      state,
      action: PayloadAction<{surveyId: string; surveyData: Survey}>,
    ) => {
      const {surveyId, surveyData} = action.payload;
      state[surveyId] = {
        ...surveyData,
        standards: EMPTY_ARRAY as AuditStandardExecution[],
      };
    },
    fillStandards: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standards: AuditStandardExecution[];
      }>,
    ) => {
      const {surveyId, standards} = action.payload;
      // if (!state[surveyId]) { //todo check
      state[surveyId].standards = standards;
      // }
    },
    changeStandardComment: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        attachedComment: string;
        commentType: CommentType;
      }>,
    ) => {
      const {surveyId, standardId, attachedComment, commentType} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      standard!.attachedComment = attachedComment;
      standard!.commentType = commentType;
    },
    changeQuestionComment: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId: string;
        attachedComment: string;
        commentType: CommentType;
      }>,
    ) => {
      const {surveyId, standardId, attachedComment, commentType, questionId} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const question = standard?.questionDTOList?.find(
        i => i.id === questionId,
      );
      question!.attachedComment = attachedComment;
      question!.commentType = commentType;
    },
    changeQuestionResult: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId: string;
        resultCd: ResultCd;
      }>,
    ) => {
      const {surveyId, standardId, resultCd, questionId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const question = standard?.questionDTOList?.find(
        i => i.id === questionId,
      );
      question!.resultCd = resultCd;
    },
    changeQuestionOptionResult: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId: string;
        optionId: string;
        resultCd: ResultCd;
      }>,
    ) => {
      const {surveyId, standardId, resultCd, questionId, optionId} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const question = standard?.questionDTOList?.find(
        i => i.id === questionId,
      );
      question!.optionsExecution.forEach(i => (i.resultCd = null));
      const option = question!.optionsExecution.find(i => i.id === optionId);
      option!.resultCd = resultCd;
    },
    changeStandardStatus: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        status: Status;
      }>,
    ) => {
      const {surveyId, standardId, status} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      standard!.status = status;
    },
    overruleStandardResult: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        commentText: string;
        status: OverruleStatus;
        time: string;
      }>,
    ) => {
      const {surveyId, standardId, status, time, commentText} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      standard!.status = status;
      standard!.overruleComment = {
        value: commentText,
        overruledHint: `Auditor marked survey as ${
          status.toLowerCase().includes('passed') ? 'passed' : 'failed'
        }, ${time}`,
      };
    },
    changeSurveyStatus: (
      state,
      action: PayloadAction<{
        surveyId: string;
        status: Status;
      }>,
    ) => {
      const {surveyId, status} = action.payload;
      const survey = state[surveyId];
      survey.resultCd = status;
    },
  },
});

export const {
  addSurvey,
  fillStandards,
  changeStandardComment,
  changeQuestionComment,
  changeQuestionResult,
  changeQuestionOptionResult,
  changeStandardStatus,
  overruleStandardResult,
  changeSurveyStatus,
} = evaluationReducer.actions;
