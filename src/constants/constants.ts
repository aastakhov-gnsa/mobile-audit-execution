import {ReactNativeBlobUtilConfig} from 'react-native-blob-util';

export const ICON_SIZE = 20;

export const FILTER_ICON_SIZE = 22;

export const noDataIndex = -1;

export const EMPTY_ARRAY: unknown[] = [];

export const FILE_TIMEOUT = 180000;

export const RnBlobUtilConfig: ReactNativeBlobUtilConfig = {
  timeout: FILE_TIMEOUT,
};

export const popoverTheme = {
  colors: {
    backdrop: 'transparent',
  },
};

export const imageMatcher = /\.(png|jpg|jpeg|gif)$/i;
export const pdfMatcher = /\.(pdf)$/i;
export const docMatcher = /\.(doc|docx)$/i;
export const xlsMatcher = /\.(xls|xlsx|csv)$/i;

export const spaceMatcher = /%20/g;

export const filePrefix = 'file://';
export const contentPrefix = 'content://';
