import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ScreenNames} from '../navigation/navigation';
import { EvaluationSurvey } from './evaluation';

export type SurveysStackParamList = {
  [ScreenNames.Surveys]: undefined;
  [ScreenNames.SurveyExecution]: {surveyId: string; standardId: string};
  [ScreenNames.StandardList]: {id: string};
  [ScreenNames.AuditDetails]: {id: string};
  [ScreenNames.FileView]: {fileName: string; filePath: string};
  [ScreenNames.UserManual]: undefined;
  [ScreenNames.ContactSupport]: undefined;
  [ScreenNames.LegalNoticesAndTerms]: undefined;
  [ScreenNames.SvSRPreview]: {file: string, surveyId: string, data: EvaluationSurvey, filters: Record<string, boolean>};
  [ScreenNames.Signature]: { data: EvaluationSurvey, filters: Record<string, boolean>, surveyId: string};
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

export type SvSRPreviewRouteParams = RouteProp<
  SurveysStackParamList,
  ScreenNames.SvSRPreview
>;

export type SignatureRouteParams = RouteProp<
  SurveysStackParamList,
  ScreenNames.Signature
>;
