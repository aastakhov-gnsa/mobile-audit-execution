import {AnyAction, Dispatch, Middleware} from 'redux';
import {surveyApi} from '../Survey/surveyService';
import {addSurvey, fillStandards} from './evaluationReducer';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {Survey} from '../../interfaces/survey';

const fillingMiddleware: Middleware =
  ({getState, dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (surveyApi.endpoints.survey.matchFulfilled(action)) {
      const state = getState();
      const surveyId = action.meta.arg.originalArgs as string;
      dispatch(
        addSurvey({
          surveyId: surveyId,
          surveyData: (
            state.surveyApi.queries['allSurveys("")']?.data as Survey[]
          ).find(i => i.id === surveyId)!,
        }),
      );
      dispatch(
        fillStandards({
          standards: action.payload,
          surveyId: action.meta.arg.originalArgs as string,
        }),
      );
    }
    return next(action);
  };

export default fillingMiddleware;
