import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {
  changeQuestionOptionResult,
  changeQuestionResult,
  changeStandardStatus,
} from './evaluationReducer';

const standardStatusMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    const isQuestionChanged = action.type === changeQuestionResult.type;
    const isQuestionOptionChanged =
      action.type === changeQuestionOptionResult.type;

    if (isQuestionChanged || isQuestionOptionChanged) {
      next(action);
      const state = getState();
      const {surveyId, standardId} = action.payload;
      const standard = state.evaluation[surveyId].standards.find(
        i => i.id === standardId,
      );
      const questions = standard?.questionDTOList;
      const standardNotCompleted = questions?.some(i => {
        if (i.isOptionsPresent) {
          return !i.optionsExecution.some(j => j.resultCd);
        } else {
          return !i.resultCd;
        }
      });
      if (standardNotCompleted) {
        dispatch(
          changeStandardStatus({standardId, surveyId, status: 'In Progress'}),
        );
        return null;
      }
      const standardFailed = questions?.some(i => {
        if (i.isOptionsPresent) {
          return i.optionsExecution.some(j => j.resultCd === 'Failed');
        } else {
          return i.resultCd === 'Failed';
        }
      });
      if (standardFailed) {
        dispatch(
          changeStandardStatus({standardId, surveyId, status: 'Failed'}),
        );
      } else {
        dispatch(
          changeStandardStatus({standardId, surveyId, status: 'Passed'}),
        );
      }
    } else {
      return next(action);
    }
  };

export default standardStatusMiddleware;
