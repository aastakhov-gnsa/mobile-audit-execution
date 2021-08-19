import React from 'react';
import {Stack} from './navigation/navigation';
import SurveyStack from './features/Survey/SurveyStack';
import AuthStack from './features/Auth/AuthStack';
import {AuthContext} from './context/AuthContext';
import {useSelector} from './utils/store/configureStore';

function NavigationRoot() {
  const authContext = React.useContext(AuthContext);
  const gnsaToken = useSelector(store => store.auth.token);
  return (
    <Stack.Navigator headerMode="none">
      {(authContext?.accessToken || authContext?.idToken) && gnsaToken ? (
        <Stack.Screen name="Surveys Stack" component={SurveyStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default React.memo(NavigationRoot);
