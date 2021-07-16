import React from 'react';

interface AuthContextProps {
  idToken: string;
  setAccessToken: (v: string) => void;
  setIdToken: (v: string) => void;
  setInProgress: (b: boolean) => void;
  inProgress: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  idToken: '',
  setAccessToken: () => null,
  setIdToken: () => null,
  setInProgress: () => null,
  inProgress: false,
});
