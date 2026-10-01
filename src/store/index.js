import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';
import academicYearReducer from './slices/academicYearSlice';
import studentReducer from './slices/studentSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
    academicYear: academicYearReducer,
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
