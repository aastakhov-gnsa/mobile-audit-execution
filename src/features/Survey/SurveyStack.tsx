import React from 'react';
import {ScreenNames, Surveys} from '../../navigation/navigation';
import SurveysScreen from './SurveysScreen';
import HeaderRight from '../../components/HeaderRight/HeaderRight';
import {StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';
import LegalNoticesAndTermsScreen from '../LegalNoticesAndTerms/LegalNoticesAndTermsScreen';
import ContactSupportScreen from '../ContactSupport/ContactSupportScreen';
import UserManualScreen from '../UserManual/UserManualScreen';
import UserAvatar from '../../components/UserAvatar';
import HeaderControlsContainer from '../../components/HeaderControlsContainer';
import AuditDetailsScreen from '../AuditDetails/AuditDetailsScreen';

function SurveyStack() {
  const SurveysHeaderRight = React.useCallback(() => <HeaderRight />, []);
  const SurveysHeaderLeft = React.useCallback(
    () => (
      <HeaderControlsContainer>
        <UserAvatar />
      </HeaderControlsContainer>
    ),
    [],
  );
  return (
    <Surveys.Navigator>
      <Surveys.Group>
        <Surveys.Screen
          name={ScreenNames.Surveys}
          component={SurveysScreen}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.headerStyle,
            headerRight: SurveysHeaderRight,
            headerLeft: SurveysHeaderLeft,
          }}
        />
      </Surveys.Group>
      <Surveys.Group screenOptions={{presentation: 'modal'}}>
        <Surveys.Screen
          name={ScreenNames.ContactSupport}
          options={{title: 'Contact Support'}}
          component={ContactSupportScreen}
        />
        <Surveys.Screen
          name={ScreenNames.UserManual}
          options={{title: 'User Manual'}}
          component={UserManualScreen}
        />
        <Surveys.Screen
          name={ScreenNames.LegalNoticesAndTerms}
          options={{title: 'Legal Notices and Terms'}}
          component={LegalNoticesAndTermsScreen}
        />
        <Surveys.Screen
          name={ScreenNames.AuditDetails}
          options={{title: 'Audit Details'}}
          component={AuditDetailsScreen}
        />
      </Surveys.Group>
    </Surveys.Navigator>
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
