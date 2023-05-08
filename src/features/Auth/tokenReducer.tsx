import {createSlice} from '@reduxjs/toolkit';
import {logout} from './authReducer';

type TokenSlice = {
  tokenLoading: boolean;
  tokenError?: any;
};

const initState: TokenSlice = {
  tokenLoading: false,
};
export const tokenReducer = createSlice({
  name: 'tokenUtil',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logout, () => initState);
  },
});
