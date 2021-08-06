import React from 'react';
import AuthScreen from './features/Auth/AuthScreen';
import {Stack} from './navigation/navigation';
import {AuthContext} from './context/AuthContext';
import HomeTabs from './features/Home/HomeTabs';
import {useAuthContext} from './features/Auth/hooks/useAuthContext';

const App = () => {
  const authContext = useAuthContext();

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {authContext?.accessToken || authContext?.idToken ? (
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
