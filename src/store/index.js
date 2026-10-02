import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';
import academicYearReducer from './slices/Academic-Management/academicYearSlice';
import academicClassReducer from './slices/Academic-Management/classSlice';
import academicSectionReducer from './slices/Academic-Management/sectionSlice';
import academicSubjectReducer from './slices/Academic-Management/subjectSlice';
import teacherReducer from './slices/teacher-management/teacherSlice';
import teacherAssignmentReducer from './slices/teacher-management/teacherAssignmentSlice';
import teacherCredentialReducer from './slices/teacher-management/teacherCredentialSlice';
import teacherAttendanceReducer from './slices/teacher-management/teacherAttendanceSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
    academicYear: academicYearReducer,
    academicClass: academicClassReducer,
    academicSection: academicSectionReducer,
    academicSubject: academicSubjectReducer,
    teacher: teacherReducer,
    teacherAssignment: teacherAssignmentReducer,
    teacherCredential: teacherCredentialReducer,
    teacherAttendance: teacherAttendanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
