import React from 'react';
import {ScreenNames, Surveys} from '../../navigation/navigation';
import SurveysScreen from './SurveysScreen';
import HeaderRight from '../../components/HeaderRight/HeaderRight';
import {StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';
import LegalNoticesAndTermsScreen from '../LegalNoticesAndTerms/LegalNoticesAndTermsScreen';
import UserManualScreen from '../UserManual/UserManualScreen';
import UserAvatar from '../../components/UserAvatar';
import HeaderControlsContainer from '../../components/HeaderControlsContainer';
import AuditDetailsScreen from '../AuditDetails/AuditDetailsScreen';
import StandardListScreen from '../StandardList/StandardListScreen';
import SurveyExecutionScreen from '../SurveyExecution/SurveyExecutionScreen';
import {SvSRPreviewScreen} from '../SvSr/SvSRPreviewScreen';
import {SignatureScreen} from '../SvSr/SignatureScreen';
import {useTranslation} from 'react-i18next';
import FileViewScreen from '../FileView/FileViewScreen';

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
  const {t} = useTranslation();
  return (
    <Surveys.Navigator>
      <Surveys.Group>
        <Surveys.Screen
          name={t(ScreenNames.Surveys)}
          component={SurveysScreen}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.headerStyle,
            headerRight: SurveysHeaderRight,
            headerLeft: SurveysHeaderLeft,
          }}
        />
        <Surveys.Screen
          name={ScreenNames.StandardList}
          component={StandardListScreen}
        />
        <Surveys.Screen
          name={ScreenNames.SurveyExecution}
          component={SurveyExecutionScreen}
        />
        <Surveys.Screen
          name={ScreenNames.SvSRPreview}
          options={{title: t('Status Report')}}
          component={SvSRPreviewScreen}
        />
        <Surveys.Screen
          name={ScreenNames.Signature}
          options={{title: t('Sign the Report')}}
          component={SignatureScreen}
        />
      </Surveys.Group>
      <Surveys.Group screenOptions={{presentation: 'modal'}}>
        <Surveys.Screen
          name={ScreenNames.UserManual}
          options={{title: t('User Manual')}}
          component={UserManualScreen}
        />
        <Surveys.Screen
          name={ScreenNames.LegalNoticesAndTerms}
          options={{title: t('Legal Notices and Terms')}}
          component={LegalNoticesAndTermsScreen}
        />
        <Surveys.Screen
          name={ScreenNames.AuditDetails}
          options={{title: t('Audit Details')}}
          component={AuditDetailsScreen}
        />
        <Surveys.Screen
          name={ScreenNames.FileView}
          component={FileViewScreen}
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
