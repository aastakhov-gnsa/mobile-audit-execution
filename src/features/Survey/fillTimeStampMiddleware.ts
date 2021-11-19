import {AnyAction, Dispatch, Middleware} from 'redux';
import {MiddlewareAPI} from '@reduxjs/toolkit';
import {RootState} from '../../utils/store/configureStore';
import {surveyApi} from './surveyService';
import {fillFulfilledTimeStamp} from './surveysReducer';

const fillTimeStampMiddleware: Middleware =
  ({dispatch}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (surveyApi.endpoints.allSurveys.matchFulfilled(action)) {
      dispatch(fillFulfilledTimeStamp(action.meta.fulfilledTimeStamp));
    }
    return next(action);
  };

export default fillTimeStampMiddleware;
