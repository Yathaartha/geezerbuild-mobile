import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const getSubmissions = createAsyncThunk(
  '/assignments/submissions',
  async ({studentId}) => {
    try {
      const response = await baseApi.get(
        `/assignments/submissions?studentId=${studentId}`,
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const removeSubmission = createAsyncThunk(
  'assignments/remove',
  async ({assignmentId}) => {
    try {
      const response = await baseApi.delete(
        `/assignments/remove?assignmentId=${assignmentId}`,
      );

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    list: [],
    deletion: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSubmissions.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getSubmissions.fulfilled, (state, action) => {
      state.status = 'idle';
      state.list = action.payload;
    });
    builder.addCase(removeSubmission.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(removeSubmission.fulfilled, (state, action) => {
      state.status = 'idle';
      state.deletion = action.payload;
    });
  },
});

export default submissionSlice.reducer;
