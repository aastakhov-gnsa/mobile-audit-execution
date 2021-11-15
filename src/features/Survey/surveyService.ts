import {createApi} from '@reduxjs/toolkit/query/react';
import {Survey} from '../../interfaces/survey';
import {RootState} from '../../utils/store/configureStore';
import {GnsaUser} from '../../interfaces/User';
import {AuditStandardExecution} from '../../interfaces/standard';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {Language, RecursivePartial} from '../../interfaces/common';
import {axiosBaseQuery, __API__} from '../../api/api';

export const surveyApi = createApi({
  reducerPath: 'surveyApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${__API__}/rest/mobile-audit-execution/`,
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
    downloadFile: builder.mutation<any, string>({
      query: id => {
        return {
          url: `file?fileId=${id}`,
          method: 'get',
        };
      },
    }),
    deleteFile: builder.mutation<void, string>({
      query: id => {
        return {
          url: `file?fileId=${id}`,
          method: 'delete',
        };
      },
    }),
  }),
});

export const {
  useAllSurveysQuery,
  useSurveyQuery,
  useUserInfoQuery,
  useUploadSurveyMutation,
  useLanguagesQuery,
  useDownloadFileMutation,
  useDeleteFileMutation,
} = surveyApi;
