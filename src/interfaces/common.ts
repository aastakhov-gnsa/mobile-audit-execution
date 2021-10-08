export type ColorKey = keyof ReactNativePaper.ThemeColors;

export interface MultiValue {
  id: string;
  value: string;
  options?: Record<string, string>;
}

export type EmptyStatus = null;
export type ResultCd = 'Passed' | 'Failed' | EmptyStatus;
export type OverruleStatus = 'Passed - Overruled' | 'Failed - Overruled';
export type Status =
  | ResultCd
  | OverruleStatus
  | 'Open'
  | 'Completed'
  | 'In Progress';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Translations = Record<string, string>;

export interface Language {
  type: string;
  key: string;
  value: string;
  description: string;
  language: string;
  displayOrder: number;
  active: boolean;
}
