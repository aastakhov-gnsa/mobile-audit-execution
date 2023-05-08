import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logout} from '../../features/Auth/authReducer';
import {FilterItem} from '../../interfaces/filters';

type FiltersSlice = {
  [screenName: string]: {
    [fieldName: string]: FilterItem;
  };
};

const initState: FiltersSlice = {};

export const filtersReducer = createSlice({
  name: 'filters',
  initialState: initState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{
        screenName: string;
        fieldName: string;
        value: string | string[];
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
    removeFilter: (
      state,
      action: PayloadAction<{
        screenName: string;
        fieldName: string;
      }>,
    ) => {
      const {screenName, fieldName} = action.payload;
      delete state[screenName][fieldName];
    },
    removeFilterList: (
      state,
      action: PayloadAction<{
        screenName: string;
      }>,
    ) => {
      const {screenName} = action.payload;
      delete state[screenName];
    },
  },
  extraReducers: builder => builder.addCase(logout, () => initState),
});

export const {addFilter, removeFilter, removeFilterList} =
  filtersReducer.actions;
