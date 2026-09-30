import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchAcademicYears = createAsyncThunk(
  'academicYear/list',
  (_, thunkApi) => apiRequest({ url: 'academic/years' }, thunkApi)
);

export const fetchAcademicYear = createAsyncThunk(
  'academicYear/show',
  (id, thunkApi) => apiRequest({ url: `academic/years/${id}` }, thunkApi)
);

export const createAcademicYear = createAsyncThunk(
  'academicYear/create',
  (data, thunkApi) => apiRequest({ url: 'academic/years', method: 'POST', body: data }, thunkApi)
);

export const activateAcademicYear = createAsyncThunk(
  'academicYear/activate',
  (id, thunkApi) => apiRequest({ url: `academic/years/${id}/activate`, method: 'POST' }, thunkApi)
);

export const archiveAcademicYear = createAsyncThunk(
  'academicYear/archive',
  (id, thunkApi) => apiRequest({ url: `academic/years/${id}/archive`, method: 'POST' }, thunkApi)
);

export const copyAcademicYear = createAsyncThunk(
  'academicYear/copy',
  ({ id, data }, thunkApi) =>
    apiRequest({ url: `academic/years/${id}/copy`, method: 'POST', body: data }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  years: [],
  currentYear: null,
  lastMessage: null,
};

const isAcademicYear = (suffix) => (action) =>
  action.type.startsWith('academicYear/') && action.type.endsWith(suffix);

const academicYearSlice = createSlice({
  name: 'academicYear',
  initialState,
  reducers: {
    clearAcademicYearError: (state) => {
      state.error = null;
    },
    clearAcademicYearMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.years = action.payload?.data || [];
      })
      .addCase(fetchAcademicYear.fulfilled, (state, action) => {
        state.currentYear = action.payload?.data;
      })
      .addMatcher(isAcademicYear('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAcademicYear('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isAcademicYear('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAcademicYearError, clearAcademicYearMessage } = academicYearSlice.actions;
export default academicYearSlice.reducer;
