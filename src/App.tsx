import React from 'react';
import AuthScreen from './features/Auth/AuthScreen';
import {Stack} from './navigation/navigation';
import {AuthContext} from './context/AuthContext';
import HomeTabs from './features/Home/HomeTabs';
import {useAuthContext} from './features/Auth/hooks/useAuthContext';
import {Provider} from 'react-redux';
import {persistor, store} from './utils/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const authContext = useAuthContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} />
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
    </Provider>
  );
};

export default App;
