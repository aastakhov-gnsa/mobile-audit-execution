import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {
  changeStandardStatus,
  changeSurveyStatus,
  overruleStandardResult,
  resetOverruleStandardResult,
} from './evaluationReducer';
import {failedStatuses, notEvaluatedStatuses} from '../../interfaces/common';

const changeStandardStatusActionTypes = [
  changeStandardStatus.type,
  overruleStandardResult.type,
  resetOverruleStandardResult.type,
];

const surveyStatusMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    const isStandardStatusChanged = changeStandardStatusActionTypes.includes(
      action.type,
    );
    if (isStandardStatusChanged) {
      next(action);
      const state = getState();
      const {surveyId} = action.payload;
      const survey = state.evaluation[surveyId];
      const surveyNotStarted =
        survey.standards.filter(i => i.status === 'Open').length ===
        survey.standards.length;
      if (surveyNotStarted) {
        dispatch(changeSurveyStatus({surveyId, status: 'Open'}));
        return null;
      }
      const surveyNotCompleted = survey.standards.some(i =>
        notEvaluatedStatuses.includes(i.status),
      );
      if (surveyNotCompleted) {
        dispatch(changeSurveyStatus({surveyId, status: 'In Progress'}));
        return null;
      }
      const surveyFailed = survey.standards.some(
        i => i.status && failedStatuses.includes(i.status),
      );
      if (surveyFailed) {
        dispatch(changeSurveyStatus({surveyId, status: 'Failed'}));
      } else {
        dispatch(changeSurveyStatus({surveyId, status: 'Passed'}));
      }
    } else {
      return next(action);
    }
  };

export default surveyStatusMiddleware;
