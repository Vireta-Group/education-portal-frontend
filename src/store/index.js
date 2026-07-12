import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import setupReducer from './slices/setupSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    setup: setupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
