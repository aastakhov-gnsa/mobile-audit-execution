import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Survey} from '../../interfaces/survey';
import {RootState} from '../../utils/store/configureStore';

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://gnsa-dev.i.daimler.com/api/v1/rest/mobile-audit-execution/',
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
    survey: builder.query<Survey, number>({
      query: (id: number) => `survey-download/${id}`,
    }),
  }),
});

export const {useAllSurveysQuery, useSurveyQuery} = surveyApi;
