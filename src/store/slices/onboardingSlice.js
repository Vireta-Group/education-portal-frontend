import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const api = (endpoint, body, token) =>
  fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || Object.values(data.errors || {}).flat().join(', ') || 'Request failed';
      throw new Error(msg);
    }
    return data.data;
  });

export const saveStep1 = createAsyncThunk(
  'onboarding/saveStep1',
  async (formData, { getState, rejectWithValue }) => {
    try {
      return await api('/api/setup/step/1', formData, getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveStep2 = createAsyncThunk(
  'onboarding/saveStep2',
  async (formData, { getState, rejectWithValue }) => {
    try {
      return await api('/api/setup/step/2', formData, getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveStep3 = createAsyncThunk(
  'onboarding/saveStep3',
  async (formData, { getState, rejectWithValue }) => {
    try {
      return await api('/api/setup/step/3', formData, getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const saveStep4 = createAsyncThunk(
  'onboarding/saveStep4',
  async (formData, { getState, rejectWithValue }) => {
    try {
      return await api('/api/setup/step/4', formData, getState().auth.token);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    clearOnboardingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveStep1.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveStep1.fulfilled, (state) => { state.loading = false; })
      .addCase(saveStep1.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(saveStep2.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveStep2.fulfilled, (state) => { state.loading = false; })
      .addCase(saveStep2.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(saveStep3.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveStep3.fulfilled, (state) => { state.loading = false; })
      .addCase(saveStep3.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(saveStep4.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveStep4.fulfilled, (state) => { state.loading = false; })
      .addCase(saveStep4.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearOnboardingError } = onboardingSlice.actions;
export default onboardingSlice.reducer;
