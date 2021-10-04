import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {GnsaAuthResponse, UserInfo} from '../interfaces/sso';

export const __HOST__ = 'https://gnsa-dev.i.daimler.com';
// export const __HOST__ = 'http://localhost:8080';
const __API__ = __HOST__ + '/api/v1/';
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
