/**
 * Ends the user session associated with the given ID token by clearing their session in application and out of P14C.
 *
 * @param token  - a required attribute that specifies the ID token passed to the logout endpoint as a hint about the user’s current authenticated session.
 * @see {@link https://openid.net/specs/openid-connect-session-1_0.html#RPLogout|RP-Initiated Logout}
 */
export const signOff = (token: string) => {
  // return fetch(`${getBaseApiUrl(
  //     true)}/${ENVIRONMENT_ID}/as/signoff?id_token_hint=${token}`);
  return fetch(
    `https://session-int.i.daimler.com/smsignout?id_token_hint=${token}`,
  );
};
