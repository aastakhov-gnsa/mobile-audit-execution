import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logout} from '../../features/Auth/authReducer';
import {FilterItem} from '../../interfaces/filters';

type SearchInputSlice = {
  [screenName: string]: {
    [fieldName: string]: FilterItem;
  };
};

const initState: SearchInputSlice = {};

export const searchInputReducer = createSlice({
  name: 'searchInput',
  initialState: initState,
  reducers: {
    addInput: (
      state,
      action: PayloadAction<{
        screenName: string;
        fieldName: string;
        value: string;
      }>,
    ) => {
      const {screenName, fieldName, value} = action.payload;
      return {
        ...state,
        [screenName]: {
          ...state[screenName],
          [fieldName]: {fieldName: fieldName, value: value},
        },
      };
    },
    removeInput: (
      state,
      action: PayloadAction<{
        screenName: string;
      }>,
    ) => {
      const {screenName} = action.payload;
      delete state[screenName];
    }
  },
  extraReducers: builder => builder.addCase(logout, () => initState),
});

export const {addInput, removeInput} = searchInputReducer.actions;
