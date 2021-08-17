import React from 'react';
import {Stack} from './navigation/navigation';
import {AuthContext} from './context/AuthContext';
import {useAuthContext} from './features/Auth/hooks/useAuthContext';
import {Provider} from 'react-redux';
import {persistor, store} from './utils/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import SurveyStack from './features/Survey/SurveyStack';
import AuthStack from './features/Auth/AuthStack';

const App = () => {
  const authContext = useAuthContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} />
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator headerMode="none">
          {authContext?.accessToken || authContext?.idToken ? (
            <Stack.Screen name="Surveys Stack" component={SurveyStack} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
