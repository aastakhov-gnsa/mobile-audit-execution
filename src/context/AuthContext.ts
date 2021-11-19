import React from 'react';

interface AuthContextProps {
  gnsaToken: string;
  setGnsaToken: (v: string) => void;
  idToken: string;
  accessToken: string;
  setAccessToken: (v: string) => void;
  setIdToken: (v: string) => void;
  setInProgress: (b: boolean) => void;
  inProgress: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  accessToken: '',
  gnsaToken: '',
  setGnsaToken: () => null,
  idToken: '',
  setAccessToken: () => null,
  setIdToken: () => null,
  setInProgress: () => null,
  inProgress: false,
});
