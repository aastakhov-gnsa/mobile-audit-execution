import Config from 'react-native-config';

export const AUTH_URI = `${Config.AUTH_URL}/as/authorization.oauth2`;

export const ENVIRONMENT_ID = 'GNSA';
export const REDIRECT_URL = `${ENVIRONMENT_ID}://audits`;

/**
 * Configuration for `react-native-app-auth` library
 *
 * Configured to only fetch authorization code
 */
export const AUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: AUTH_URI,
    tokenEndpoint: `${Config.AUTH_URL}/as/token.oauth2`,
  },
  clientId: Config.CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  usePKCE: false,
  scopes: ['openid', 'profile', 'email', 'phone'],
  skipCodeExchange: true,
  additionalParameters: {
    acr_values: 'daimler:idp:gas:standard',
  },
};
