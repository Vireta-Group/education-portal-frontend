import { Moon, Sun } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/appSlice';

const ThemeToggle = () => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-4 right-4 z-50 p-2.5 text-slate-400 hover:text-indigo-600 bg-white/80 dark:bg-secondary-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
