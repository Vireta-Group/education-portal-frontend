import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'room-management', title: 'Room Management', description: 'Manage hostel rooms.', icon: Layers },
    { path: 'hostel-admission', title: 'Hostel Admission', description: 'Manage hostel admissions.', icon: Layers },
    { path: 'hostel-attendance', title: 'Attendance', description: 'Track hostel attendance.', icon: Layers },
    { path: 'visitor-management', title: 'Visitor Management', description: 'Manage hostel visitors.', icon: Layers },
    { path: 'hostel-discipline', title: 'Hostel Discipline', description: 'Manage hostel discipline.', icon: Layers },
    { path: 'hostel-maintenance', title: 'Hostel Maintenance', description: 'Manage hostel maintenance.', icon: Layers },
    { path: 'hostel-expense', title: 'Hostel Expense', description: 'Manage hostel expenses.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Hostel" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
