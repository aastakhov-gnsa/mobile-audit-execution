import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';

export type Navigation = NavigationProp<any>;

export const Stack = createStackNavigator();
export const Surveys = createStackNavigator();

export enum ScreenNames {
  AuditDetails = 'AuditDetails',
  Surveys = 'Surveys',
  SurveysStack = 'SurveysStack',
  Auth = 'Auth',
  UserManual = 'UserManual',
  ContactSupport = 'ContactSupport',
  LegalNoticesAndTerms = 'LegalNoticesAndTerms',
}
