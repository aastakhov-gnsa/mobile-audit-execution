import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Evaluation} from '../../interfaces/evaluation';
import {AuditStandardExecution} from '../../interfaces/standard';
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
    removeSurvey: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
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
        internalComment: string | null;
        publicComment: string | null;
      }>,
    ) => {
      const {surveyId, standardId, internalComment, publicComment} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      standard!.internalComment = internalComment;
      standard!.publicComment = publicComment;
    },
    changeQuestionComment: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId: string;
        internalComment: string | null;
        publicComment: string | null;
      }>,
    ) => {
      const {surveyId, standardId, internalComment, publicComment, questionId} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const question = standard?.questionDTOList?.find(
        i => i.id === questionId,
      );
      question!.internalComment = internalComment;
      question!.publicComment = publicComment;
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
    resetOverruleStandardResult: (
      state,
      action: PayloadAction<{surveyId: string; standardId: string}>,
    ) => {
      const {surveyId, standardId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      standard!.overruleComment = {
        value: null,
        overruledHint: null,
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
    setDownloadedFile: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId?: string;
        filePath: string;
        fileId: string;
      }>,
    ) => {
      const {surveyId, standardId, questionId, filePath, fileId} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const file = !questionId
        ? standard!.files!.find(i => i.id === fileId)
        : standard!
            .questionDTOList!.find(i => i.id === questionId)!
            .files.find(f => f.id === fileId);
      file!.options!._fromServer = true;
      file!.options!._path = filePath;
    },
    setQuestionAddedFile: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId: string;
        filePath: string;
        fileId: string;
        useName?: boolean;
      }>,
    ) => {
      const {surveyId, standardId, questionId, filePath, fileId, useName} =
        action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const files = standard!.questionDTOList!.find(
        i => i.id === questionId,
      )!.files;
      files.push({
        id: fileId,
        value: fileId,
        options: {_path: filePath, _fromServer: false, _useName: useName},
      });
    },
    markFileAsDeleted: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId?: string;
        fileId: string;
      }>,
    ) => {
      const {surveyId, standardId, questionId, fileId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const file = !questionId
        ? standard!.files!.find(i => i.id === fileId)
        : standard!
            .questionDTOList!.find(i => i.id === questionId)!
            .files.find(f => f.id === fileId);
      file!.options!._toDelete = true;
    },
    deleteLocalFile: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId?: string;
        fileId: string;
      }>,
    ) => {
      const {surveyId, standardId, questionId, fileId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const files = !questionId
        ? standard!.files
        : standard!.questionDTOList!.find(i => i.id === questionId)!.files;
      const fileIndex = files!.findIndex(i => i.id === fileId);
      if (fileIndex > -1) {
        files?.splice(fileIndex, 1);
      }
    },
    setPhotoViewingStart: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId?: string;
        fileId: string;
      }>,
    ) => {
      const {surveyId, standardId, questionId, fileId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const files = !questionId
        ? standard!.files
        : standard!.questionDTOList!.find(i => i.id === questionId)!.files;
      const file = files?.find(i => i.id === fileId);
      file!.options!._viewingStart = true;
    },
    clearPhotoViewingStart: (
      state,
      action: PayloadAction<{
        surveyId: string;
        standardId: string;
        questionId?: string;
      }>,
    ) => {
      const {surveyId, standardId, questionId} = action.payload;
      const standard = state[surveyId].standards.find(i => i.id === standardId);
      const files = !questionId
        ? standard!.files
        : standard!.questionDTOList!.find(i => i.id === questionId)!.files;
      const file = files?.find(i => i.options?._viewingStart);
      delete file!.options!._viewingStart;
    },
  },
});

export const {
  addSurvey,
  removeSurvey,
  fillStandards,
  changeStandardComment,
  changeQuestionComment,
  changeQuestionResult,
  changeQuestionOptionResult,
  changeStandardStatus,
  overruleStandardResult,
  resetOverruleStandardResult,
  changeSurveyStatus,
  setDownloadedFile,
  markFileAsDeleted,
  deleteLocalFile,
  setQuestionAddedFile,
  setPhotoViewingStart,
  clearPhotoViewingStart,
} = evaluationReducer.actions;
