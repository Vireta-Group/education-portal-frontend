import { Plus } from 'lucide-react';

const Teachers = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Staff Directory</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage teaching and academic organizational staff.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition-all flex items-center gap-2">
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm overflow-hidden p-6 text-center">
         <h3 className="text-lg font-bold text-slate-800 py-10">Teacher directory under rapid development - Wait for Database!</h3>
      </div>
    </div>
  );
};

export default Teachers;
