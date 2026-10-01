import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../lib/api';

// Helper to clear all auth cookies by setting past expiry
const clearAuthCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

export const registerSchool = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      return await post('/register', formData);
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await post('/auth/login', credentials);
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message || 'Logout failed');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  onboardingStep: null,
  token: localStorage.getItem('token') || null,
  user: null,
  tenant: null,
  admin: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.tenant = null;
      state.admin = null;
      clearAuthCookies();
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.tenant = action.payload.tenant;
        state.admin = action.payload.admin;
        state.onboardingStep = action.payload.onboarding_step ?? null;
      })
      .addCase(registerSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.tenant = null;
        state.admin = null;
        state.loading = false;
        clearAuthCookies();
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.tenant = null;
        state.admin = null;
        state.loading = false;
        state.error = null;
        clearAuthCookies();
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
