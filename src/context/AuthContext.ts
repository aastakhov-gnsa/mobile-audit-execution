import React from 'react';

interface AuthContextProps {
  gnsaToken: string;
  setGnsaToken: (v: string) => void;
  refreshToken: string;
  setRefreshToken: (v: string) => void;
  setInProgress: (b: boolean) => void;
  inProgress: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  refreshToken: '',
  gnsaToken: '',
  setGnsaToken: () => null,
  setRefreshToken: () => null,
  setInProgress: () => null,
  inProgress: false,
});
