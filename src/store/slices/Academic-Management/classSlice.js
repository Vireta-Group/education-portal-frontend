import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchClasses = createAsyncThunk(
  'academicClass/list',
  (_, thunkApi) => apiRequest({ url: '/academic/classes' }, thunkApi)
);

export const fetchClass = createAsyncThunk(
  'academicClass/show',
  (id, thunkApi) => apiRequest({ url: `/academic/classes/${id}` }, thunkApi)
);

export const createClass = createAsyncThunk(
  'academicClass/create',
  (data, thunkApi) => apiRequest({ url: '/academic/classes', method: 'POST', body: data }, thunkApi)
);

export const updateClass = createAsyncThunk(
  'academicClass/update',
  ({ id, data }, thunkApi) =>
    apiRequest({ url: `/academic/classes/${id}/update`, method: 'POST', body: data }, thunkApi)
);

export const activateClass = createAsyncThunk(
  'academicClass/activate',
  (id, thunkApi) => apiRequest({ url: `/academic/classes/${id}/activate`, method: 'POST' }, thunkApi)
);

export const inactivateClass = createAsyncThunk(
  'academicClass/inactivate',
  (id, thunkApi) => apiRequest({ url: `/academic/classes/${id}/inactivate`, method: 'POST' }, thunkApi)
);

export const deleteClass = createAsyncThunk(
  'academicClass/delete',
  ({ id, reason }, thunkApi) =>
    apiRequest({ url: `/academic/classes/${id}/delete`, method: 'POST', body: { delete_reason: reason || null } }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  classes: [],
  currentClass: null,
  lastMessage: null,
};

const isAcademicClass = (suffix) => (action) =>
  action.type.startsWith('academicClass/') && action.type.endsWith(suffix);

const academicClassSlice = createSlice({
  name: 'academicClass',
  initialState,
  reducers: {
    clearClassError: (state) => {
      state.error = null;
    },
    clearClassMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload?.data || [];
      })
      .addCase(fetchClass.fulfilled, (state, action) => {
        state.currentClass = action.payload?.data;
      })
      .addMatcher(isAcademicClass('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAcademicClass('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isAcademicClass('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearClassError, clearClassMessage } = academicClassSlice.actions;
export default academicClassSlice.reducer;
