import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchSubjects = createAsyncThunk(
  'academicSubject/list',
  (_, thunkApi) => apiRequest({ url: '/academic/subjects' }, thunkApi)
);

export const fetchSubject = createAsyncThunk(
  'academicSubject/show',
  (id, thunkApi) => apiRequest({ url: `/academic/subjects/${id}` }, thunkApi)
);

export const createSubject = createAsyncThunk(
  'academicSubject/create',
  (data, thunkApi) => apiRequest({ url: '/academic/subjects', method: 'POST', body: data }, thunkApi)
);

export const updateSubject = createAsyncThunk(
  'academicSubject/update',
  ({ id, data }, thunkApi) =>
    apiRequest({ url: `/academic/subjects/${id}/update`, method: 'POST', body: data }, thunkApi)
);

export const activateSubject = createAsyncThunk(
  'academicSubject/activate',
  (id, thunkApi) => apiRequest({ url: `/academic/subjects/${id}/activate`, method: 'POST' }, thunkApi)
);

export const inactivateSubject = createAsyncThunk(
  'academicSubject/inactivate',
  (id, thunkApi) => apiRequest({ url: `/academic/subjects/${id}/inactivate`, method: 'POST' }, thunkApi)
);

export const deleteSubject = createAsyncThunk(
  'academicSubject/delete',
  ({ id, reason }, thunkApi) =>
    apiRequest({ url: `/academic/subjects/${id}/delete`, method: 'POST', body: { delete_reason: reason || null } }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  subjects: [],
  currentSubject: null,
  lastMessage: null,
};

const isAcademicSubject = (suffix) => (action) =>
  action.type.startsWith('academicSubject/') && action.type.endsWith(suffix);

const academicSubjectSlice = createSlice({
  name: 'academicSubject',
  initialState,
  reducers: {
    clearSubjectError: (state) => {
      state.error = null;
    },
    clearSubjectMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload?.data || [];
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.currentSubject = action.payload?.data;
      })
      .addMatcher(isAcademicSubject('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAcademicSubject('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isAcademicSubject('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubjectError, clearSubjectMessage } = academicSubjectSlice.actions;
export default academicSubjectSlice.reducer;
