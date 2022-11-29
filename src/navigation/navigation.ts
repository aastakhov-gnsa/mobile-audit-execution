import {createStackNavigator} from '@react-navigation/stack';

export const Stack = createStackNavigator();
export const Surveys = createStackNavigator();

export enum ScreenNames {
  StandardList = 'StandardList',
  AuditDetails = 'AuditDetails',
  FileView = 'FileView',
  Surveys = 'Surveys',
  SurveyExecution = 'SurveyExecution',
  SurveysStack = 'SurveysStack',
  Auth = 'Auth',
  UserManual = 'UserManual',
  ContactSupport = 'ContactSupport',
  LegalNoticesAndTerms = 'LegalNoticesAndTerms',
  SvSRPreview = 'SvSRPreview',
  Signature = 'Signature',
}
