import {MultiValue, ResultCd, Status, Translations} from './common';
import { DaimlerService } from './survey';

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
  attachedComment?: string;
  checkpoint?: string;
  commentType?: CommentType;
  files?: MultiValue[];
  overruleComment?: OverruleComment;
  questionDTOList?: StandardQuestion[];
  refineComment?: string;
  services?: DaimlerService[];
  standardName?: string;
  standardNumber?: string;
  standardText?: string;
  standardType?: string;
  status?: Status;
  statusIconType?: string;
  infoForAuditor?: string;
  requiredDocuments?: string;
  nameTranslations?: Translations;
  textTranslations?: Translations;
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
  attachedComment: string;
  commentType: 'Internal' | 'External';
  resultCd: ResultCd;
  files: MultiValue[];
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
  value: string;
  overruledHint: string;
}

export type CommentType = 'External' | 'Internal';
