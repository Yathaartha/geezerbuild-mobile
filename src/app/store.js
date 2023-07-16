import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../components/login/authSlice';
import assignmentSlice, {
  getAssignments,
} from '../components/assignments/assignmentSlice';
import submissionSlice from '../components/submissions/submissionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  assignment: assignmentSlice,
  submission: submissionSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

store.dispatch(getAssignments());
