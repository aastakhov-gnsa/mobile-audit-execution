import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Survey} from '../../interfaces/survey';
import {RootState} from '../../utils/store/configureStore';
import {GnsaUser} from '../../interfaces/User';
import {API_URI} from '../../../config';

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URI}/rest/mobile-audit-execution/`,
    prepareHeaders: (headers, {getState}) => {
      const state = getState() as RootState;
      if (state.auth.token) {
        headers.set('authorization', `Bearer ${state.auth.token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    allSurveys: builder.query<Survey[], string>({
      query: () => 'surveys',
    }),
    survey: builder.query<Survey, number | string>({
      query: (id: number | string) => `survey-download/${id}`,
    }),
    userInfo: builder.query<GnsaUser, string>({
      query: (userName: string) => `user-info/${userName}`,
    }),
  }),
});

export const {useAllSurveysQuery, useSurveyQuery, useUserInfoQuery} = surveyApi;
