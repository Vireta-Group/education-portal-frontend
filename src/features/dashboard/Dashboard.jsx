import { Users, GraduationCap, DollarSign, Activity, FileText, Target, BookOpen } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{value}</h3>
        <p className={`text-xs font-semibold ${change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
          {change} <span className="text-slate-400 font-normal ml-1">vs last month</span>
        </p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Array */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Here is what's happening at EduPro today.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
            <FileText size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="2,451" change="+12.5%" icon={GraduationCap} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" />
        <StatCard title="Teaching Staff" value="142" change="+2.4%" icon={Users} colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400" />
        <StatCard title="Monthly Revenue" value="$45,210" change="+8.1%" icon={DollarSign} colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" />
        <StatCard title="Avg Attendance" value="94.2%" change="-1.1%" icon={Activity} colorClass="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" />
      </div>

      {/* Dashboard Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Analytics</h2>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          {/* Chart Placeholder simulating Recharts */}
          <div className="w-full h-72 flex items-end justify-between gap-2 px-2 relative">
             {/* Y Axis Guides */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
               {[1,2,3,4,5].map(i => <div key={i} className="w-full border-b border-dashed border-slate-200 dark:border-slate-800 h-0" />)}
             </div>
             {/* Bars */}
             {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 45, 50].map((h, i) => (
                <div key={i} className="w-full bg-indigo-100 dark:bg-indigo-500/20 rounded-t-sm relative group hover:bg-indigo-500 transition-colors z-10" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">${h}k</div>
                </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-medium px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Side Panel Activities */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activities</h2>
          <div className="space-y-6">
            
            <div className="flex gap-4 relative">
              <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 z-10 border-[3px] border-white dark:border-slate-900">
                <Target size={14} />
              </div>
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">New admission approved</p>
                <p className="text-xs text-slate-500 mt-1">Sarah Connor enrolled in Grade 10</p>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">10 mins ago</span>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 z-10 border-[3px] border-white dark:border-slate-900">
                <DollarSign size={14} />
              </div>
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">Fee payment received</p>
                <p className="text-xs text-slate-500 mt-1">$450 received from John Doe</p>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">1 hour ago</span>
              </div>
            </div>

            <div className="flex gap-4 relative">
               <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 z-10 border-[3px] border-white dark:border-slate-900">
                <BookOpen size={14} />
              </div>
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200 font-medium">Exam schedules published</p>
                <p className="text-xs text-slate-500 mt-1">Mid-term schedules for Grade 8-12 added</p>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">3 hours ago</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
