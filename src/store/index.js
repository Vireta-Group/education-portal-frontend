import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';
<<<<<<< HEAD
import academicYearReducer from './slices/academicYearSlice';
import studentReducer from './slices/studentSlice';
=======
import academicYearReducer from './slices/Academic-Management/academicYearSlice';
import academicClassReducer from './slices/Academic-Management/classSlice';
import academicSectionReducer from './slices/Academic-Management/sectionSlice';
import academicSubjectReducer from './slices/Academic-Management/subjectSlice';
>>>>>>> 0ad6ee17e16ea6ed0f0225b59ccbaf2ea43388f3

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
    academicYear: academicYearReducer,
<<<<<<< HEAD
    student: studentReducer,
=======
    academicClass: academicClassReducer,
    academicSection: academicSectionReducer,
    academicSubject: academicSubjectReducer,
>>>>>>> 0ad6ee17e16ea6ed0f0225b59ccbaf2ea43388f3
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
