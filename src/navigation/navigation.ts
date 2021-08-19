import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProp} from '@react-navigation/native';

export type Navigation = NavigationProp<any>;

export const Stack = createStackNavigator();

export enum ScreenNames {
  Auth = 'Auth',
  UserManual = 'UserManual',
  ContactSupport = 'ContactSupport',
  LegalNoticesAndTerms = 'LegalNoticesAndTerms',
}
