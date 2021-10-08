import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Survey} from '../../interfaces/survey';
import {RootState} from '../../utils/store/configureStore';
import {GnsaUser} from '../../interfaces/User';
import {API_URI} from '../../../config';
import {AuditStandardExecution} from '../../interfaces/standard';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {Language, RecursivePartial} from '../../interfaces/common';

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
  tagTypes: ['Surveys'],
  endpoints: builder => ({
    allSurveys: builder.query<Survey[], string>({
      query: () => 'surveys',
      providesTags: ['Surveys'],
    }),
    survey: builder.query<AuditStandardExecution[], number | string>({
      query: (id: number | string) => `survey/${id}`,
      keepUnusedDataFor: 1,
    }),
    uploadSurvey: builder.mutation<void, RecursivePartial<EvaluationSurvey>>({
      query(body) {
        return {
          url: 'survey',
          method: 'post',
          body,
        };
      },
      invalidatesTags: ['Surveys'],
    }),
    languages: builder.query<Language[], null>({
      query: () => 'languages',
    }),
    userInfo: builder.query<GnsaUser, string>({
      query: (userName: string) => `user-info/${userName}`,
    }),
  }),
});

export const {
  useAllSurveysQuery,
  useSurveyQuery,
  useUserInfoQuery,
  useUploadSurveyMutation,
  useLanguagesQuery,
} = surveyApi;
