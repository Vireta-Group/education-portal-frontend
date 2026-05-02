import { Users, GraduationCap, DollarSign, Calendar } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-900 overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] rounded-xl border border-slate-100 dark:border-slate-800 p-6 flex items-center group hover:shadow-lg transition-all duration-300">
    <div className="flex-1">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 shadow-sm relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={48} className="absolute -right-2 -bottom-2" />
      </div>
      <Icon size={24} className="relative z-10" />
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Students', value: '3,241', change: '+12%', icon: Users, colorClass: 'bg-primary-500 text-primary-600 dark:text-primary-400' },
    { title: 'Active Teachers', value: '184', change: '+4', icon: GraduationCap, colorClass: 'bg-purple-500 text-purple-600 dark:text-purple-400' },
    { title: 'Revenue This Month', value: '$84,300', change: '+2.4%', icon: DollarSign, colorClass: 'bg-green-500 text-green-600 dark:text-green-400' },
    { title: 'Upcoming Events', value: '12', change: 'This Week', icon: Calendar, colorClass: 'bg-orange-500 text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Welcome back, Admin</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Here is what's happening with your school today.</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-[0_2px_10px_-2px_rgba(37,99,235,0.5)] transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 shadow-sm min-h-[400px] flex items-center justify-center">
          <p className="text-slate-400">Main Statistics Chart (Placeholder)</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">New admission processed</p>
                  <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
