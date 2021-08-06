// export const AUTH_URI =
//   'https://gnsa-dev.i.daimler.com/api/v1/rest/authenticate';
export const AUTH_URI = 'https://sso-int.daimler.com/as/authorization.oauth2';
export const API_URI = 'https://gnsa-dev.i.daimler.com/api/v1';

export const ENVIRONMENT_ID = 'GNSA';

export const AUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: AUTH_URI,
    tokenEndpoint: 'https://sso-int.daimler.com/as/token.oauth2',
  },
  // issuer: AUTH_URI,
  // issuer: AUTH_URI + '/'+ ENVIRONMENT_ID + '/as',
  clientId: 'b00158c4-898b-4a01-ba59-d6df2b411cf3',
  clientSecret: 'ddc1fce2-454f-48c3-b6f1-6b799e3fff23',
  redirectUrl: `${ENVIRONMENT_ID}://audits`,
  // redirectUrl: 'gnsa-dev.i.daimler.com/audits',
  scopes: ['openid', 'profile', 'email', 'phone'],
  // usePKCE: true,
  // useNonce: true,
  // additionalParameters: {
  //   max_age: '3600',
  //   prompt: 'login'
  // }
  additionalParameters: {
    acr_values: 'daimler:idp:gas:standard',
  },

  // additionalParameters: ["acr_values": "daimler:idp:gas:standard"]
};
