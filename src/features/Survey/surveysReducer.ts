import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SurveysSlice} from '../../interfaces/surveys';

const initState: SurveysSlice = {
  fulfilledTimeStamp: 0,
};

export const surveysReducer = createSlice({
  name: 'surveys',
  initialState: initState,
  reducers: {
    fillFulfilledTimeStamp: (state, action: PayloadAction<number>) => {
      state.fulfilledTimeStamp = action.payload;
    },
  },
});

export const {fillFulfilledTimeStamp} = surveysReducer.actions;
