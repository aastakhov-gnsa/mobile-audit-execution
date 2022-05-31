import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import {RootState, AppDispatch} from '../utils/store/configureStore';
import {FetchBaseQueryArgs} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import {alert} from './apiAlerts';
import {setAuthTokens} from '../features/Auth/authReducer';
import {MaybePromise} from '@reduxjs/toolkit/dist/query/tsHelpers';

export const __HOST__ = Config.API_URL;
export const __API__ = __HOST__ + '/api/v1';
const __AJAX_TIMEOUT__ = 180000;

type PrepareHeadersArg = (
  headers: Headers,
  api: {
    getState: () => unknown;
  },
) => MaybePromise<Headers>;

export function createAxiosInstance(config?: AxiosRequestConfig) {
  return axios.create({
    baseURL: __API__,
    timeout: __AJAX_TIMEOUT__,
    responseType: 'json',
    headers: {
      // ...HEADERS,
      // ...{ClientId: __CLIENT_ID__},
    },
    ...config,
  });
}

export const axiosBaseQuery =
  ({
    baseUrl,
    prepareHeaders,
  }: FetchBaseQueryArgs): BaseQueryFn<
    | {
        url?: string;
        method?: AxiosRequestConfig['method'];
        body?: AxiosRequestConfig['data'];
      }
    | string
  > =>
  async (args, {getState, dispatch}) => {
    let url = '';
    let method: AxiosRequestConfig['method'] = 'get';
    let data;
    if (args && typeof args !== 'string') {
      url = args.url!;
      method = args.method ?? 'get';
      data = args.body;
    } else {
      url = args;
    }
    let headers = {};
    if (prepareHeaders) {
      headers = await prepareHeaders(new Headers({}), {getState});
      headers = (headers as any).map;
    }
    const requestConfig = {
      url: `${baseUrl}${url}`,
      method,
      data,
      headers,
    };
    const refreshToken = (getState() as RootState)?.auth.refreshToken;
    try {
      const result = await axiosInstance(requestConfig);
      return {data: result.data};
    } catch (e) {
      let err = e as AxiosError;
      if (
        err.response?.headers.location === '/auth/refreshtoken' &&
        refreshToken
      ) {
        return handleStaleJWTToken(
          requestConfig,
          getState as any,
          dispatch,
          prepareHeaders!,
        );
      }
      alert(err);
      return {
        error: {status: err.response?.status, data: err.response?.data},
      };
    }
  };

/**
 * Exchange authorization for JWT and refresh tokens
 *
 * JWT token is used to access gnsa-sm-am endpoints
 * Refresh token is exchanged for a new pair of tokens when current JWT token is expired.
 *
 * @param authorizationCode Authorization code received from `react-native-app-auth`
 */
export function sendAuthorizationCode(authorizationCode: string) {
  return axiosInstance.post<{
    jwttoken: string;
    refreshToken: string;
    familyName: string;
    givenName: string;
  }>(
    '/auth/authenticate',
    {
      authenticationCode: authorizationCode,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
}

export const axiosInstance = createAxiosInstance();

export const API = {
  sendAuthorizationCode,
};

/**
 * Intended to be called when expired JWT token is detected (e.g., in catch section of axios request)
 *
 * Request is made for '/auth/refreshtoken' endpoint to exchange current refresh token
 * for new JWT and refresh tokens; if succesful, `setAuthTokens` action is dispatched and original request
 * is called again with new JWT token.
 *
 * @param config Original request configuration
 * @param getState Redux store getState
 * @param dispatch Redux store dispatch
 * @param prepareHeaders RTK prepare headers callback
 */
async function handleStaleJWTToken(
  config: AxiosRequestConfig,
  getState: () => RootState,
  dispatch: AppDispatch,
  prepareHeaders: PrepareHeadersArg,
) {
  try {
    const refreshToken = getState().auth.refreshToken;
    const refreshResponse = await axiosInstance.post<{
      jwttoken: string;
      refreshToken: string;
    }>(
      '/auth/refreshtoken',
      {refreshToken},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch(
      setAuthTokens({
        token: refreshResponse.data.jwttoken,
        refreshToken: refreshResponse.data.refreshToken,
      }),
    );
    let headers = await prepareHeaders(new Headers({}), {getState});
    headers = (headers as any).map;
    return axiosInstance({...config, headers});
  } catch (e) {
    let err = e as AxiosError;
    return {error: {status: err.response?.status, data: err.response?.data}};
  }
}
