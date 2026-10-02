import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../lib/api';

// ---------------- Qualifications ----------------
export const fetchQualifications = createAsyncThunk(
  'teacherCredential/listQualifications',
  (teacherId, thunkApi) => apiRequest({ url: `teachers/${teacherId}/qualifications` }, thunkApi)
);

export const addQualification = createAsyncThunk(
  'teacherCredential/addQualification',
  ({ teacherId, data }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/qualifications`, method: 'POST', body: data }, thunkApi)
);

export const deleteQualification = createAsyncThunk(
  'teacherCredential/deleteQualification',
  ({ teacherId, qualificationId }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/qualifications/${qualificationId}/delete`, method: 'POST' }, thunkApi)
);

// ---------------- Trainings ----------------
export const fetchTrainings = createAsyncThunk(
  'teacherCredential/listTrainings',
  (teacherId, thunkApi) => apiRequest({ url: `teachers/${teacherId}/trainings` }, thunkApi)
);

export const addTraining = createAsyncThunk(
  'teacherCredential/addTraining',
  ({ teacherId, data }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/trainings`, method: 'POST', body: data }, thunkApi)
);

export const deleteTraining = createAsyncThunk(
  'teacherCredential/deleteTraining',
  ({ teacherId, trainingId }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/trainings/${trainingId}/delete`, method: 'POST' }, thunkApi)
);

// ---------------- Experiences ----------------
export const fetchExperiences = createAsyncThunk(
  'teacherCredential/listExperiences',
  (teacherId, thunkApi) => apiRequest({ url: `teachers/${teacherId}/experiences` }, thunkApi)
);

export const addExperience = createAsyncThunk(
  'teacherCredential/addExperience',
  ({ teacherId, data }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/experiences`, method: 'POST', body: data }, thunkApi)
);

export const deleteExperience = createAsyncThunk(
  'teacherCredential/deleteExperience',
  ({ teacherId, experienceId }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/experiences/${experienceId}/delete`, method: 'POST' }, thunkApi)
);

// ---------------- Documents ----------------
export const fetchTeacherDocuments = createAsyncThunk(
  'teacherCredential/listDocuments',
  (teacherId, thunkApi) => apiRequest({ url: `teachers/${teacherId}/documents` }, thunkApi)
);

export const addTeacherDocument = createAsyncThunk(
  'teacherCredential/addDocument',
  ({ teacherId, data }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/documents`, method: 'POST', body: data }, thunkApi)
);

export const verifyTeacherDocument = createAsyncThunk(
  'teacherCredential/verifyDocument',
  ({ teacherId, documentId, data }, thunkApi) =>
    apiRequest({ url: `teachers/${teacherId}/documents/${documentId}/verify`, method: 'POST', body: data }, thunkApi)
);

export const deleteTeacherDocument = createAsyncThunk(
  'teacherCredential/deleteDocument',
  ({ teacherId, documentId, reason }, thunkApi) =>
    apiRequest({
      url: `teachers/${teacherId}/documents/${documentId}/delete`,
      method: 'POST',
      ...(reason ? { body: { delete_reason: reason } } : {}),
    }, thunkApi)
);

const initialState = {
  loading: false,
  error: null,
  qualifications: [],
  trainings: [],
  experiences: [],
  documents: [],
  lastMessage: null,
};

const isTeacherCredential = (suffix) => (action) =>
  action.type.startsWith('teacherCredential/') && action.type.endsWith(suffix);

const teacherCredentialSlice = createSlice({
  name: 'teacherCredential',
  initialState,
  reducers: {
    clearCredentialError: (state) => {
      state.error = null;
    },
    clearCredentialMessage: (state) => {
      state.lastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQualifications.fulfilled, (state, action) => {
        state.qualifications = action.payload?.data || [];
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload?.data || [];
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.experiences = action.payload?.data || [];
      })
      .addCase(fetchTeacherDocuments.fulfilled, (state, action) => {
        state.documents = action.payload?.data || [];
      })
      .addMatcher(isTeacherCredential('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isTeacherCredential('/fulfilled'), (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload?.message || null;
      })
      .addMatcher(isTeacherCredential('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCredentialError, clearCredentialMessage } = teacherCredentialSlice.actions;
export default teacherCredentialSlice.reducer;
