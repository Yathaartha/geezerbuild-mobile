import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseApi} from '../../api/api';

export const getAssignments = createAsyncThunk(
  '/assignments/list',
  async () => {
    try {
      const response = await baseApi.get('/assignments/list');

      console.log(response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const submitAssignment = createAsyncThunk(
  'assignments/create',
  async ({file, userId, assignmentId}) => {
    try {
      const response = await baseApi.post('/assignments/create', {
        submission: file,
        userId,
        assignmentId,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    list: [],
    submission: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAssignments.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getAssignments.fulfilled, (state, action) => {
      state.status = 'idle';
      state.list = action.payload;
    });
    builder.addCase(submitAssignment.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(submitAssignment.fulfilled, (state, action) => {
      state.status = 'idle';
      state.submission = action.payload;
    });
  },
});

export default assignmentSlice.reducer;
