import {createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api/api';

export const fetchGnsaToken = createAsyncThunk(
  'fetchGnsaToken',
  async (sub: string) => {
    const response = await API.gnsaAuth(sub);
    return {token: response.data.token};
  },
);
