import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const assignSubjectTeacher = createAsyncThunk(
  'teacherAssignment/assignSubject',
  (data, thunkApi) => apiRequest({ url: 'teachers/assign-subject', method: 'POST', body: data }, thunkApi)
);

export const fetchSubjectAssignments = createAsyncThunk(
  'teacherAssignment/listSubject',
  (teacherId, thunkApi) => apiRequest({ url: `teachers/${teacherId}/subject-assignments` }, thunkApi)
);

export const removeSubjectAssignment = createAsyncThunk(
  'teacherAssignment/removeSubject',
  (assignmentId, thunkApi) =>
    apiRequest({ url: `teachers/subject-assignments/${assignmentId}/remove`, method: 'POST' }, thunkApi)
);

export const assignClassTeacher = createAsyncThunk(
  'teacherAssignment/assignClassTeacher',
  (data, thunkApi) => apiRequest({ url: 'teachers/assign-class-teacher', method: 'POST', body: data }, thunkApi)
);

export const fetchClassTeacherAssignments = createAsyncThunk(
  'teacherAssignment/listClassTeacher',
  (_, thunkApi) => apiRequest({ url: 'teachers/class-teacher-assignments' }, thunkApi)
);

export const removeClassTeacherAssignment = createAsyncThunk(
  'teacherAssignment/removeClassTeacher',
  (assignmentId, thunkApi) =>
    apiRequest({ url: `teachers/class-teacher-assignments/${assignmentId}/remove`, method: 'POST' }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  subjectAssignments: [],
  classTeacherAssignments: [],
  lastMessage: null,
};

const isTeacherAssignment = (suffix) => (action) =>
  action.type.startsWith('teacherAssignment/') && action.type.endsWith(suffix);

const teacherAssignmentSlice = createSlice({
  name: 'teacherAssignment',
  initialState,
  reducers: {
    clearAssignmentError: (state) => {
      state.error = null;
    },
    clearAssignmentMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectAssignments.fulfilled, (state, action) => {
        state.subjectAssignments = action.payload?.data || [];
      })
      .addCase(fetchClassTeacherAssignments.fulfilled, (state, action) => {
        state.classTeacherAssignments = action.payload?.data || [];
      })
      .addMatcher(isTeacherAssignment('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isTeacherAssignment('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isTeacherAssignment('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAssignmentError, clearAssignmentMessage } = teacherAssignmentSlice.actions;
export default teacherAssignmentSlice.reducer;
