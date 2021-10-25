import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {changeStandardStatus, changeSurveyStatus} from './evaluationReducer';

const surveyStatusMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    const isStandardStatusChanged = action.type === changeStandardStatus.type;
    if (isStandardStatusChanged) {
      next(action);
      const state = getState();
      const {surveyId} = action.payload;
      const survey = state.evaluation[surveyId];
      const surveyNotCompleted = survey.standards.some(i =>
        ['In Progress', 'Open', undefined].includes(i.status),
      );
      if (surveyNotCompleted) {
        return null;
      }
      const surveyFailed = survey.standards.some(i =>
        i.status?.toLowerCase().includes('failed'),
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
