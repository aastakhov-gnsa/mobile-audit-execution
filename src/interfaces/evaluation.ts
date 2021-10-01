import {AuditStandardExecution} from './standard';
import {Survey} from './survey';

export interface Evaluation {
  [surveyId: string]: EvaluationSurvey;
}

export interface EvaluationSurvey extends Survey {
  standards: AuditStandardExecution[];
}
