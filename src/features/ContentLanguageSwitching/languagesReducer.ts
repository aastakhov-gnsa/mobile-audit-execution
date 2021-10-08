import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Language} from '../../interfaces/common';

type DataLanguageSlice = {
  languages: Language[];
  languageCd: string;
};
const initState: DataLanguageSlice = {
  languages: [],
  languageCd: 'eng',
};

export const languagesReducer = createSlice({
  name: 'dataLanguage',
  initialState: initState,
  reducers: {
    changeLanguageCd: (state, action: PayloadAction<string>) => {
      state.languageCd = action.payload;
    },
    fillLangList: (state, action: PayloadAction<Language[]>) => {
      state.languages = action.payload;
    },
  },
});

export const {changeLanguageCd, fillLangList} = languagesReducer.actions;
