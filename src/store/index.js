import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';
import academicYearReducer from './slices/Academic-Management/academicYearSlice';
import academicClassReducer from './slices/Academic-Management/classSlice';
import academicSectionReducer from './slices/Academic-Management/sectionSlice';
import academicSubjectReducer from './slices/Academic-Management/subjectSlice';
import studentReducer from './slices/studentSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
    academicYear: academicYearReducer,
    student: studentReducer,
    academicClass: academicClassReducer,
    academicSection: academicSectionReducer,
    academicSubject: academicSubjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
