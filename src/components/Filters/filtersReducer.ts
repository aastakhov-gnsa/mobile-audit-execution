import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logout} from '../../features/Auth/authReducer';

type FiltersSlice = {
  [screenName: string]: {
    [id: string]: {
      fieldName: string;
      value: string;
    };
  };
};

const initState: FiltersSlice = {};

export const filtersReducer = createSlice({
  name: 'filters',
  initialState: initState,
  reducers: {
    // todo need ability to add several filters
    addFilter: (
      state,
      action: PayloadAction<{
        screenName: string;
        id: string;
        fieldName: string;
        value: string;
      }>,
    ) => {
      const {screenName, id, fieldName, value} = action.payload;
      return {
        ...state,
        [screenName]: {
          ...state[screenName],
          [id]: {
            fieldName: fieldName,
            value: value,
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
      const {screenName, id} = action.payload;
      delete state[screenName][id];
    },
  },
  extraReducers: builder => builder.addCase(logout, () => initState),
});

export const {addFilter, removeFilter} = filtersReducer.actions;
