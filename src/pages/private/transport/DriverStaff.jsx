import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DriverStaff = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          to=".."
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Driver Staff</h1>
      </div>
      <p className="text-slate-500 mt-2">This module is under construction.</p>
    </div>
  );
};

export default DriverStaff;
