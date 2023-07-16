import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const loginAsync = createAsyncThunk(
  '/auth/login',
  async ({username, password}) => {
    console.log(password);
    try {
      const response = await baseApi.post('/auth/login', {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 0,
    response: 'default',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAsync.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.response = action.payload;
    });
  },
});

export default authSlice.reducer;
