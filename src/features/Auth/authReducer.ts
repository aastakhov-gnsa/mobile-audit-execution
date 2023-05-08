import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthSlice = {
  token?: string;
  refreshToken?: string;
};

export const authReducer = createSlice({
  name: 'auth',
  initialState: {} as AuthSlice,
  reducers: {
    logout: state => {
      state.token = undefined;
      state.refreshToken = undefined;
    },
    setAuthTokens: (
      state,
      action: PayloadAction<{token: string; refreshToken?: string}>,
    ) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
  },
});

export const {logout, setAuthTokens} = authReducer.actions;
