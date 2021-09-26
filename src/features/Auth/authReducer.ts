import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchGnsaToken} from './authActions';

type AuthSlice = {
  token?: string;
};

export const authReducer = createSlice({
  name: 'auth',
  initialState: {} as AuthSlice,
  reducers: {
    logout: state => {
      state.token = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGnsaToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const {logout} = authReducer.actions;
