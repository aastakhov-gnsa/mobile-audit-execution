import React from 'react';
import AuthScreen from './features/Auth/AuthScreen';
// import HomeScreen from './features/Home/HomeScreen';
import {Stack} from './navigation/navigation';
import {SecretItems, Secrets} from './utils/encryptedStorage/encryptedStorage';
import {AuthContext} from './context/AuthContext';
import HomeTabs from './features/Home/HomeTabs';

const App = () => {
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
    }),
    [
      setAccessToken,
      setIdToken,
      setInProgress,
      inProgress,
      idToken,
      gnsaToken,
      setGnsaToken,
    ],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {accessToken || idToken ? (
          <Stack.Screen name="Home" component={HomeTabs} />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false, animationTypeForReplace: 'pop'}}
          />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default App;
