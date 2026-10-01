import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../lib/api';

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

const initialState = {
  loading: false,
  error: null,
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
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
