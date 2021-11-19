import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import {FetchBaseQueryArgs} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_URL} from '../../config';
import {GnsaAuthResponse, UserInfo} from '../interfaces/sso';
import {alert} from './apiAlerts';

export const __HOST__ = API_URL;
// export const __HOST__ = 'http://localhost:8080';
export const __API__ = __HOST__ + '/api/v1';
const __AJAX_TIMEOUT__ = 900000;

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
  async (args, {getState}) => {
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
    try {
      const result = await axiosInstance({
        url: `${baseUrl}${url}`,
        method,
        data,
        headers,
      });
      return {data: result.data};
    } catch (e) {
      let err = e as AxiosError;
      alert(err);
      return {
        error: {status: err.response?.status, data: err.response?.data},
      };
    }
  };

/**
 * Get user info from SSO using token
 * @param token
 */
export function getUserInfo(token: string): Promise<AxiosResponse<UserInfo>> {
  return axiosInstance.get('https://sso-int.daimler.com/idp/userinfo.openid', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function gnsaAuth(
  userName: string,
): Promise<AxiosResponse<GnsaAuthResponse>> {
  return axiosInstance.post(
    'auth/authenticate',
    {
      username: userName,
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
  getUserInfo,
  gnsaAuth,
};
