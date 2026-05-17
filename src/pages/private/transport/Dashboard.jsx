import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'vehicle-management', title: 'Vehicle Management', description: 'Manage transport vehicles.', icon: Layers },
    { path: 'driver-staff', title: 'Driver & Staff', description: 'Manage transport staff.', icon: Layers },
    { path: 'route-management', title: 'Route Management', description: 'Manage transport routes.', icon: Layers },
    { path: 'student-assignment', title: 'Student Assignment', description: 'Assign students to routes.', icon: Layers },
    { path: 'transport-attendance', title: 'Attendance', description: 'Track transport attendance.', icon: Layers },
    { path: 'transport-income', title: 'Transport Income', description: 'Manage transport income.', icon: Layers },
    { path: 'transport-expense', title: 'Transport Expense', description: 'Manage transport expenses.', icon: Layers },
    { path: 'transport-p-l', title: 'Transport P&L', description: 'Transport profit and loss.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Transport" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
