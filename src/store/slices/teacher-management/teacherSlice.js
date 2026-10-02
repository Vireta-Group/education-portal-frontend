import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchTeachers = createAsyncThunk(
  'teacher/list',
  (_, thunkApi) => apiRequest({ url: 'teachers' }, thunkApi)
);

export const createTeacher = createAsyncThunk(
  'teacher/create',
  (data, thunkApi) => apiRequest({ url: 'teachers', method: 'POST', body: data }, thunkApi)
);

export const fetchTeacher = createAsyncThunk(
  'teacher/show',
  (id, thunkApi) => apiRequest({ url: `teachers/${id}` }, thunkApi)
);

export const updateTeacher = createAsyncThunk(
  'teacher/update',
  ({ id, data }, thunkApi) => apiRequest({ url: `teachers/${id}/update`, method: 'POST', body: data }, thunkApi)
);

export const activateTeacher = createAsyncThunk(
  'teacher/activate',
  (id, thunkApi) => apiRequest({ url: `teachers/${id}/activate`, method: 'POST' }, thunkApi)
);

export const inactivateTeacher = createAsyncThunk(
  'teacher/inactivate',
  (id, thunkApi) => apiRequest({ url: `teachers/${id}/inactivate`, method: 'POST' }, thunkApi)
);

export const fetchTeacherWorkload = createAsyncThunk(
  'teacher/workload',
  (_, thunkApi) => apiRequest({ url: 'teachers/workload' }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  teachers: [],
  currentTeacher: null,
  workload: [],
  lastMessage: null,
};

const isTeacher = (suffix) => (action) =>
  action.type.startsWith('teacher/') && action.type.endsWith(suffix);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    clearTeacherError: (state) => {
      state.error = null;
    },
    clearTeacherMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload?.data || [];
      })
      .addCase(fetchTeacher.fulfilled, (state, action) => {
        state.currentTeacher = action.payload?.data;
      })
      .addCase(fetchTeacherWorkload.fulfilled, (state, action) => {
        state.workload = action.payload?.data || [];
      })
      .addMatcher(isTeacher('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isTeacher('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isTeacher('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTeacherError, clearTeacherMessage } = teacherSlice.actions;
export default teacherSlice.reducer;
