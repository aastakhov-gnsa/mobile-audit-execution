import React from 'react';
import {Stack} from '../../navigation/navigation';
import AuthScreen from './AuthScreen';
import LegalNoticesAndTermsScreen from '../LegalNoticesAndTerms/LegalNoticesAndTermsScreen';

function AuthStack() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false, animationTypeForReplace: 'pop'}}
      />
      <Stack.Screen
        name="LegalNoticesAndTerms"
        options={{title: 'Legal Notices and Terms'}}
        component={LegalNoticesAndTermsScreen}
      />
    </Stack.Navigator>
  );
}

export default React.memo(AuthStack);
