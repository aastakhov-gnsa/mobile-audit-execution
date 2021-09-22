import {createSlice} from '@reduxjs/toolkit';
import {fetchGnsaToken} from './authActions';
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
    builder
      .addCase(logout, () => initState)
      .addCase(fetchGnsaToken.pending, state => {
        state.tokenLoading = true;
      })
      .addCase(fetchGnsaToken.fulfilled, state => {
        state.tokenLoading = false;
      })
      .addCase(fetchGnsaToken.rejected, (state, action) => {
        console.error(action.error);
        state.tokenLoading = false;
        state.tokenError = action.payload;
      });
  },
});
