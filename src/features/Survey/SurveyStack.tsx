import React from 'react';
import {ScreenNames, Stack} from '../../navigation/navigation';
import SurveysScreen from './SurveysScreen';
import HeaderRight from '../../components/HeaderRight/HeaderRight';
import {StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';
import LegalNoticesAndTermsScreen from '../LegalNoticesAndTerms/LegalNoticesAndTermsScreen';
import ContactSupportScreen from '../ContactSupport/ContactSupportScreen';
import UserManualScreen from '../UserManual/UserManualScreen';

function SurveyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Surveys"
        component={SurveysScreen}
        options={{
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.headerStyle,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name={ScreenNames.ContactSupport}
        options={{title: 'Contact Support'}}
        component={ContactSupportScreen}
      />
      <Stack.Screen
        name={ScreenNames.UserManual}
        options={{title: 'User Manual'}}
        component={UserManualScreen}
      />
      <Stack.Screen
        name={ScreenNames.LegalNoticesAndTerms}
        options={{title: 'Legal Notices and Terms'}}
        component={LegalNoticesAndTermsScreen}
      />
    </Stack.Navigator>
  );
}

export default React.memo(SurveyStack);

const styles = StyleSheet.create({
  headerTitle: {
    color: themeConfig.defaultTheme.colors.background,
  },
  headerStyle: {
    backgroundColor: themeConfig.defaultTheme.colors.onSurface,
  },
});
