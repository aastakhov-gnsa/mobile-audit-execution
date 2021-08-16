import {createSlice} from '@reduxjs/toolkit';
import {fetchGnsaToken} from './authActions';

type AuthSlice = {
  token?: string;
};

export const authReducer = createSlice({
  name: 'auth',
  initialState: {} as AuthSlice,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGnsaToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(fetchGnsaToken.rejected, (state, action) => {
        console.error(action.error);
      });
  },
});
