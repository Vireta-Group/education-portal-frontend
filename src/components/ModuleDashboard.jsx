import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ModuleDashboard = ({ title, description, subModules }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{title} Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description || `Manage ${title.toLowerCase()} sub-modules and settings.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subModules.map((sub, i) => (
          <Link 
            key={i} 
            to={sub.path} 
            className="bg-white dark:bg-slate-900 overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] rounded-xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col group hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                <sub.icon size={24} />
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{sub.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{sub.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModuleDashboard;
