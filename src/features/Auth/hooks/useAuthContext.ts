import React from 'react';
import {
  SecretItems,
  Secrets,
} from '../../../utils/encryptedStorage/encryptedStorage';

export function useAuthContext() {
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
  const [gnsaToken, setGnsaToken] = React.useState('');
  const [inProgress, setInProgress] = React.useState(false);

  React.useEffect(() => {
    const retrieveAuth = async () => {
      try {
        setAccessToken(
          (await Secrets.getSecret(SecretItems.accessToken)) as string,
        );
        setIdToken((await Secrets.getSecret(SecretItems.idToken)) as string);
        setGnsaToken(
          (await Secrets.getSecret(SecretItems.gnsaToken)) as string,
        );
      } catch (e) {
        console.error('retrieveAuth', e);
      }
    };
    retrieveAuth();
  }, [setIdToken, setAccessToken]);

  const authContext = React.useMemo(
    () => ({
      setAccessToken,
      setIdToken,
      setInProgress,
      inProgress,
      idToken,
      gnsaToken,
      setGnsaToken,
      accessToken,
    }),
    [
      setAccessToken,
      setIdToken,
      setInProgress,
      inProgress,
      idToken,
      gnsaToken,
      setGnsaToken,
      accessToken,
    ],
  );
  return authContext;
}
