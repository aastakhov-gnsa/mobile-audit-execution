import React from 'react';
import {
  SecretItems,
  Secrets,
} from '../../../utils/encryptedStorage/encryptedStorage';

export function useAuthContext() {
  const [refreshToken, setRefreshToken] = React.useState('');
  const [gnsaToken, setGnsaToken] = React.useState('');
  const [inProgress, setInProgress] = React.useState(false);

  React.useEffect(() => {
    const retrieveAuth = async () => {
      try {
        setRefreshToken(
          (await Secrets.getSecret(SecretItems.refreshToken)) as string,
        );
        setGnsaToken(
          (await Secrets.getSecret(SecretItems.gnsaToken)) as string,
        );
      } catch (e) {
        console.error('retrieveAuth', e);
      }
    };
    retrieveAuth();
  }, []);

  const authContext = React.useMemo(
    () => ({
      setRefreshToken,
      setInProgress,
      inProgress,
      gnsaToken,
      setGnsaToken,
      refreshToken,
    }),
    [
      setRefreshToken,
      setInProgress,
      inProgress,
      gnsaToken,
      setGnsaToken,
      refreshToken,
    ],
  );
  return authContext;
}
