import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logout} from '../../features/Auth/authReducer';
import {FilterItemObj} from '../../interfaces/filters';

type FiltersSlice = {
  [screenName: string]: {
    [id: string]: FilterItemObj;
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
        id: string;
        fieldName: string;
        value: string | string[];
      }>,
    ) => {
      const {screenName, id, fieldName, value} = action.payload;
      return {
        ...state,
        [screenName]: {
          ...state[screenName],
          [id]: {
            ...state[screenName][id],
            [fieldName]: {fieldName: fieldName, value: value},
          },
        },
      };
    },
    removeFilter: (
      state,
      action: PayloadAction<{
        screenName: string;
        id: string;
        fieldName: string;
      }>,
    ) => {
      const {screenName, id, fieldName} = action.payload;
      delete state[screenName][id][fieldName];
    },
  },
  extraReducers: builder => builder.addCase(logout, () => initState),
});

export const {addFilter, removeFilter} = filtersReducer.actions;
