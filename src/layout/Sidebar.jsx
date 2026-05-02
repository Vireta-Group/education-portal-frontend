import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Building2, GraduationCap, BookOpen, Calculator, FileText,
  Settings, Bus, UserCircle2, Library, Calendar, ShieldCheck,
  Stethoscope, Award, Coffee, Home, UserCheck, MessageSquare, Briefcase, ChevronLeft, LogOut
} from 'lucide-react';

const MODULES = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'academics', name: 'Academic', icon: BookOpen, path: '/academics' },
  { id: 'students', name: 'Students', icon: GraduationCap, path: '/students' },
  { id: 'teachers', name: 'Teachers', icon: UserCircle2, path: '/teachers' },
  { id: 'employees', name: 'Employees', icon: Briefcase, path: '/employees' },
  { id: 'exams', name: 'Examinations', icon: FileText, path: '/exams' },
  { id: 'results', name: 'Results', icon: Award, path: '/results' },
  { id: 'fees', name: 'Fees & Acc.', icon: Calculator, path: '/fees' },
  { id: 'transport', name: 'Transport', icon: Bus, path: '/transport' },
  { id: 'hostel', name: 'Hostel', icon: Building2, path: '/hostel' },
  { id: 'canteen', name: 'Canteen', icon: Coffee, path: '/canteen' },
  { id: 'library', name: 'Library', icon: Library, path: '/library' },
  { id: 'hr', name: 'HR Mgr.', icon: UserCheck, path: '/hr' },
  { id: 'events', name: 'Events', icon: Calendar, path: '/events' },
  { id: 'communication', name: 'Communicate', icon: MessageSquare, path: '/communication' },
  { id: 'security', name: 'Security', icon: ShieldCheck, path: '/security' },
  { id: 'health', name: 'Health', icon: Stethoscope, path: '/health' },
  { id: 'settings', name: 'System Settings', icon: Settings, path: '/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/60
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-sky-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg">EP</span>
          </div>
          <span className={`font-bold text-slate-800 dark:text-white text-lg whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}>
            EduPro
          </span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={20} className={`transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-4 px-3 flex flex-col gap-1">
        {MODULES.map((module) => (
          <NavLink
            key={module.id}
            to={module.path}
            title={!isOpen ? module.name : undefined}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
              ${isActive 
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'}
            `}
          >
            <module.icon 
              size={20} 
              strokeWidth={2}
              className={`shrink-0 transition-colors ${!isOpen ? 'mx-auto' : ''}`}
            />
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden lg:block pointer-events-none'}`}>
              {module.name}
            </span>
            
            {/* Active Indicator Line */}
            {isOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-indigo-600 rounded-r-md transition-all duration-300 group-[.active]:h-6" />
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
        <button 
          onClick={handleLogout}
          className={`
            w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
            text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium
            ${!isOpen ? 'px-0' : ''}
          `}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
