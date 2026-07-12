import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveSetupStep = createAsyncThunk(
  'setup/saveStep',
  async ({ step, data }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/setup/step/${step}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        const msg = result.message || Object.values(result.errors || {}).flat().join(', ') || 'Failed to save';
        return rejectWithValue(msg);
      }
      return { step };
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchSetupStep = createAsyncThunk(
  'setup/fetchStep',
  async ({ step }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/setup/step/${step}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to fetch');
      return { step, data: result.data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSetupStatus = createAsyncThunk(
  'setup/fetchStatus',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/setup/status`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to fetch status');
      return result.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  completedSteps: [],
  currentStep: 1,
  status: null,
};

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    clearSetupError: (state) => { state.error = null; },
    resetSetup: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSetupStep.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveSetupStep.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.completedSteps.includes(action.payload.step)) {
          state.completedSteps.push(action.payload.step);
        }
        state.currentStep = action.payload.step + 1;
      })
      .addCase(saveSetupStep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSetupStep.pending, (state) => { state.loading = true; })
      .addCase(fetchSetupStep.fulfilled, (state) => { state.loading = false; })
      .addCase(fetchSetupStep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSetupStatus.pending, (state) => { state.loading = true; })
      .addCase(fetchSetupStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(fetchSetupStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSetupError, resetSetup } = setupSlice.actions;
export default setupSlice.reducer;
