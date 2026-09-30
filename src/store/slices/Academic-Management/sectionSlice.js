import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

export const fetchSections = createAsyncThunk(
  'academicSection/list',
  (_, thunkApi) => apiRequest({ url: '/academic/sections' }, thunkApi)
);

export const fetchSection = createAsyncThunk(
  'academicSection/show',
  (id, thunkApi) => apiRequest({ url: `/academic/sections/${id}` }, thunkApi)
);

export const createSection = createAsyncThunk(
  'academicSection/create',
  (data, thunkApi) => apiRequest({ url: '/academic/sections', method: 'POST', body: data }, thunkApi)
);

export const updateSection = createAsyncThunk(
  'academicSection/update',
  ({ id, data }, thunkApi) =>
    apiRequest({ url: `/academic/sections/${id}/update`, method: 'POST', body: data }, thunkApi)
);

export const activateSection = createAsyncThunk(
  'academicSection/activate',
  (id, thunkApi) => apiRequest({ url: `/academic/sections/${id}/activate`, method: 'POST' }, thunkApi)
);

export const inactivateSection = createAsyncThunk(
  'academicSection/inactivate',
  (id, thunkApi) => apiRequest({ url: `/academic/sections/${id}/inactivate`, method: 'POST' }, thunkApi)
);

export const deleteSection = createAsyncThunk(
  'academicSection/delete',
  ({ id, reason }, thunkApi) =>
    apiRequest({ url: `/academic/sections/${id}/delete`, method: 'POST', body: { delete_reason: reason || null } }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  sections: [],
  currentSection: null,
  lastMessage: null,
};

const isAcademicSection = (suffix) => (action) =>
  action.type.startsWith('academicSection/') && action.type.endsWith(suffix);

const academicSectionSlice = createSlice({
  name: 'academicSection',
  initialState,
  reducers: {
    clearSectionError: (state) => {
      state.error = null;
    },
    clearSectionMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sections = action.payload?.data || [];
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.currentSection = action.payload?.data;
      })
      .addMatcher(isAcademicSection('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAcademicSection('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isAcademicSection('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSectionError, clearSectionMessage } = academicSectionSlice.actions;
export default academicSectionSlice.reducer;
