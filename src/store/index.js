import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';
import academicYearReducer from './slices/Academic-Management/academicYearSlice';
import academicClassReducer from './slices/Academic-Management/classSlice';
import academicSectionReducer from './slices/Academic-Management/sectionSlice';
import academicSubjectReducer from './slices/Academic-Management/subjectSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
    academicYear: academicYearReducer,
    academicClass: academicClassReducer,
    academicSection: academicSectionReducer,
    academicSubject: academicSubjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
