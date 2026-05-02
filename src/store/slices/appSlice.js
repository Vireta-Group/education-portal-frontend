import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  // Add other global app state here
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = appSlice.actions;

export default appSlice.reducer;
