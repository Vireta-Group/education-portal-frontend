import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../lib/api';

const toMessage = (action) => action.payload || action.error?.message || 'Request failed';

export const fetchAcademicYears = createAsyncThunk(
  'academicYear/list',
  async (_, thunkApi) => request('/academic/years', { token: thunkApi.getState().auth.token })
);

export const createAcademicYear = createAsyncThunk(
  'academicYear/create',
  async (data, thunkApi) =>
    request('/academic/years', { method: 'POST', body: data, token: thunkApi.getState().auth.token })
);

export const fetchAcademicYear = createAsyncThunk(
  'academicYear/show',
  async (id, thunkApi) => request(`/academic/years/${id}`, { token: thunkApi.getState().auth.token })
);

export const activateAcademicYear = createAsyncThunk(
  'academicYear/activate',
  async (id, thunkApi) =>
    request(`/academic/years/${id}/activate`, { method: 'POST', token: thunkApi.getState().auth.token })
);

export const archiveAcademicYear = createAsyncThunk(
  'academicYear/archive',
  async (id, thunkApi) =>
    request(`/academic/years/${id}/archive`, { method: 'POST', token: thunkApi.getState().auth.token })
);

export const copyAcademicYear = createAsyncThunk(
  'academicYear/copy',
  async ({ id, data }, thunkApi) =>
    request(`/academic/years/${id}/copy`, { method: 'POST', body: data, token: thunkApi.getState().auth.token })
);

const initialState = {
  loading: false,
  error: null,
  years: [],
  currentYear: null,
  lastMessage: null,
};

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
      .addCase(fetchAcademicYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload || [];
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      })
      .addCase(createAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.lastMessage = 'Academic year created successfully.';
        if (action.payload) state.years.push(action.payload);
      })
      .addCase(createAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      })
      .addCase(fetchAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.currentYear = action.payload;
      })
      .addCase(fetchAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      })
      .addCase(activateAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.lastMessage = 'Academic year activated successfully.';
        state.years = state.years.map((y) =>
          y.id === action.payload?.id ? action.payload : { ...y, is_current: false }
        );
      })
      .addCase(activateAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      })
      .addCase(archiveAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(archiveAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.lastMessage = 'Academic year archived successfully.';
        if (action.payload) {
          state.years = state.years.map((y) => (y.id === action.payload.id ? action.payload : y));
        }
      })
      .addCase(archiveAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      })
      .addCase(copyAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(copyAcademicYear.fulfilled, (state) => {
        state.loading = false;
        state.lastMessage = 'Copy preferences saved successfully.';
      })
      .addCase(copyAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = toMessage(action);
      });
  },
});

export const { clearAcademicYearError, clearAcademicYearMessage } = academicYearSlice.actions;
export default academicYearSlice.reducer;
