import { Search, Filter, Plus, Mail, MoreHorizontal } from 'lucide-react';

const Teachers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 mb-6">
        <Link 
          to=".."
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Directory / Staff</h1>
      </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage teaching and organizational staff.</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-[0_2px_10px_-2px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2">
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or subject..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter size={18} />
            Filters
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
            <div key={card} className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-primary-500/30 hover:shadow-md transition-all group relative">
              <button className="absolute right-4 top-4 text-slate-400 hover:text-primary-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={18} />
              </button>
              
              <div className="flex flex-col items-center mt-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  T{card}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Teacher Name</h3>
                <p className="text-sm font-medium text-slate-500 mb-1">Mathematics Dept.</p>
                
                <span className="bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">
                  Head of Department
                </span>
                
                <div className="flex gap-2 w-full mt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <Mail size={16} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Showing 8 of 184 teachers</span>
          <button className="text-primary-600 font-medium hover:text-primary-700">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
