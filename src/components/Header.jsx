import { Bell, Search, User, Moon, Sun, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/slices/appSlice';

const Header = ({ toggleSidebar }) => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
        >
          <Menu size={22} />
        </button>

        <div className="max-w-md w-full relative group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-50 group-focus-within:opacity-100 transition-opacity">
            <Search size={18} className="text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 sm:text-sm"
            placeholder="Search students, staff, or documents..."
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors sm:hidden">
          <Search size={22} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="p-2 text-slate-400 hover:text-primary-600 bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-all duration-200"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="p-2 text-slate-400 hover:text-primary-600 bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-all duration-200 relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <button className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-tr from-primary-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-sm">
            <User size={16} />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-none mb-1">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">Super Administrator</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
