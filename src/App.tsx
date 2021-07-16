import React from 'react';
import AuthScreen from './features/Auth/AuthScreen';
import HomeScreen from './features/Home/HomeScreen';
import {Stack} from './navigation/navigation';

interface IAuthContext {
  idToken: string;
  setAccessToken: (v: string) => void;
  setIdToken: (v: string) => void;
  setInProgress: (b: boolean) => void;
  inProgress: boolean;
}
export const AuthContext = React.createContext<IAuthContext>({
  idToken: '',
  setAccessToken: () => null,
  setIdToken: () => null,
  setInProgress: () => null,
  inProgress: false,
});

const App = () => {
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
  const [inProgress, setInProgress] = React.useState(false);

  const authContext = React.useMemo(
    () => ({setAccessToken, setIdToken, setInProgress, inProgress, idToken}),
    [setAccessToken, setIdToken, setInProgress, inProgress, idToken],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {accessToken || idToken ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default App;
