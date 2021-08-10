import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Survey} from '../../interfaces/survey';

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:8080/api/v1/mobile-audit-execution/' // iOS
    baseUrl: 'http://10.0.2.2:8080/api/v1/mobile-audit-execution/', // android
  }),
  endpoints: builder => ({
    allSurveys: builder.query<Survey[], string>({
      query: () => 'surveys',
    }),
  }),
});

export const {useAllSurveysQuery} = surveyApi;
