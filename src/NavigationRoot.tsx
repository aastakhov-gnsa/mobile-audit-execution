import React from 'react';
import {ScreenNames, Stack} from './navigation/navigation';
import SurveyStack from './features/Survey/SurveyStack';
import {useSelector} from './utils/store/configureStore';
import AuthScreen from './features/Auth/AuthScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdvancedFilter from './components/AdvancedFilter';

const Drawer = createDrawerNavigator();

function NavigationRoot() {
  const gnsaToken = useSelector(store => store.auth.token);
  return (
    <Drawer.Navigator drawerContent={props => <AdvancedFilter {...props}/>}
              screenOptions={{headerShown: false, swipeEdgeWidth: 0, drawerPosition:'right', drawerStyle:{ width: '65%' }}}>
      {gnsaToken ? (
        <Stack.Screen name={ScreenNames.SurveysStack} component={SurveyStack} />
      ) : (
        <Stack.Screen
          name={ScreenNames.Auth}
          component={AuthScreen}
          options={{headerShown: false, animationTypeForReplace: 'pop'}}
        />
      )}
    </Drawer.Navigator>
  );
}

export default React.memo(NavigationRoot);
