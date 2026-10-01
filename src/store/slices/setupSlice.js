import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../lib/api';

export const saveSetupStep = createAsyncThunk(
  'setup/saveStep',
  async ({ step, data }, { getState, rejectWithValue }) => {
    try {
      await post(`/setup/step/${step}`, data, { token: getState().auth.token });
      return { step };
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchSetupStep = createAsyncThunk(
  'setup/fetchStep',
  async ({ step }, { getState, rejectWithValue }) => {
    try {
      const data = await get(`/setup/step/${step}`, { token: getState().auth.token });
      return { step, data };
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const fetchSetupStatus = createAsyncThunk(
  'setup/fetchStatus',
  async (_, { getState, rejectWithValue }) => {
    try {
      return await get('/setup/status', { token: getState().auth.token });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const completeOnboarding = createAsyncThunk(
  'setup/complete',
  async (_, { getState, rejectWithValue }) => {
    try {
      return await post('/setup/finish', undefined, { token: getState().auth.token });
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
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
      })
      .addCase(completeOnboarding.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(completeOnboarding.fulfilled, (state) => { state.loading = false; })
      .addCase(completeOnboarding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSetupError, resetSetup } = setupSlice.actions;
export default setupSlice.reducer;
