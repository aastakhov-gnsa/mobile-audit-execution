import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ScreenNames} from '../navigation/navigation';

export type SurveysStackParamList = {
  [ScreenNames.SurveyExecution]: {surveyId: string; standardId: string};
  [ScreenNames.StandardList]: {id: string};
  [ScreenNames.AuditDetails]: {id: string};
  [ScreenNames.UserManual]: undefined;
  [ScreenNames.ContactSupport]: undefined;
  [ScreenNames.LegalNoticesAndTerms]: undefined;
};

export type NavigationParams = NavigationProp<SurveysStackParamList>;

// route params
export type SurveyExecutionRouteParams = RouteProp<
  SurveysStackParamList,
  ScreenNames.SurveyExecution
>;

export type StandardListRouteParams = RouteProp<
  SurveysStackParamList,
  ScreenNames.StandardList
>;
