export type FilterValues = Array<FilterItem>;

export interface FilterItem {
  fieldName: string;
  value: string | string[];
}
