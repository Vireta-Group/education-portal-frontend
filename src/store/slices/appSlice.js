import { createSlice } from '@reduxjs/toolkit';

const applyThemeClass = (theme) => {
  const root = window.document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') || 'light';
    applyThemeClass(saved);
    return saved;
  }
  return 'light';
};

const initialState = {
  theme: getInitialTheme(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      applyThemeClass(state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      applyThemeClass(action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = appSlice.actions;

export default appSlice.reducer;
