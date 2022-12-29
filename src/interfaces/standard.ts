import {MultiValue, ResultCd, SmFile, Status, Translations} from './common';
import {DaimlerService} from './survey';

type AnyData = Partial<
  Record<
    string,
    | string
    | number
    | MultiValue[]
    | OverruleComment
    | StandardQuestion[]
    | Status
    | Translations
    | DaimlerService[]
  >
>;

export interface AuditStandardExecution extends AnyData {
  id: string;
  vstamp: number;
  internalComment?: string | null;
  publicComment?: string | null;
  checkpoint?: string;
  files?: SmFile[];
  overruleComment?: OverruleComment;
  questionDTOList?: StandardQuestion[];
  refineComment?: string;
  services?: DaimlerService[];
  standardName?: string;
  standardNumber?: string;
  standardText?: string;
  standardType?: StandardType;
  status?: Status;
  statusIconType?: string;
  infoForAuditor?: string;
  requiredDocuments?: string;
  nameTranslations?: Translations;
  textTranslations?: Translations;
  weight: number;
}

export interface StandardQuestion {
  id: string;
  vstamp: number;
  mcName: string;
  mcDescription: string;
  optionsExecution: Array<Option>;
  mcAuditType: string;
  mcAuditCheckpoint: string;
  options: MultiValue[];
  internalComment: string;
  publicComment: string;
  resultCd: ResultCd;
  files: SmFile[];
  isOptionsPresent: boolean;
  nameTranslations: Translations;
  textTranslations: Translations;
}

export interface Option {
  value: string;
  hint: string;
  id: string;
  resultCd: ResultCd;
  valueTranslations?: Translations;
  hintTranslations?: Translations;
}

export interface OverruleComment {
  value: string | null;
  overruledHint: string | null;
}

export type CommentType = 'External' | 'Internal';

export interface DefaultText {
  internal?: string | null;
  public?: string | null;
}

export enum StandardType {
  MUST = 'Must',
  BASIC_BONUS = 'Basic Bonus',
  AWARDED_BONUS = 'Awarded Bonus',
  RECOMMENDED = 'Recommended',
}

export enum StandardFulfillment {
  FAILED = 'Failed',
  OPEN = 'Open',
  PASSED = 'Passed',
}
