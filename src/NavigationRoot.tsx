import React from 'react';
import {ScreenNames, Stack} from './navigation/navigation';
import SurveyStack from './features/Survey/SurveyStack';
import {AuthContext} from './context/AuthContext';
import {useSelector} from './utils/store/configureStore';
import AuthScreen from './features/Auth/AuthScreen';

function NavigationRoot() {
  const authContext = React.useContext(AuthContext);
  const gnsaToken = useSelector(store => store.auth.token);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {(authContext?.accessToken || authContext?.idToken) && gnsaToken ? (
        <Stack.Screen name={ScreenNames.SurveysStack} component={SurveyStack} />
      ) : (
        <Stack.Screen
          name={ScreenNames.Auth}
          component={AuthScreen}
          options={{headerShown: false, animationTypeForReplace: 'pop'}}
        />
      )}
    </Stack.Navigator>
  );
}

export default React.memo(NavigationRoot);
