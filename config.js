
import { __API__ } from './src/api/api';

export const AUTH_URI = 'https://sso-int.daimler.com/as/authorization.oauth2';

export const ENVIRONMENT_ID = 'GNSA';

/**
 * Configuration for `react-native-app-auth` library
 *
 * Configured to only fetch authorization code
 */
export const AUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: AUTH_URI,
    tokenEndpoint: 'https://sso-int.daimler.com/as/token.oauth2',
  },
  clientId: 'b00158c4-898b-4a01-ba59-d6df2b411cf3',
  redirectUrl: `${ENVIRONMENT_ID}://audits`,
  usePKCE: false,
  scopes: ['openid', 'profile', 'email', 'phone'],
  skipCodeExchange: true,
  additionalParameters: {
    acr_values: 'daimler:idp:gas:standard',
  },
};
