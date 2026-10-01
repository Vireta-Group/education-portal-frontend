import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'employee-profile', title: 'Employee Profile', description: 'View and edit employee profiles.', icon: Layers },
    { path: 'department-management', title: 'Department Management', description: 'Manage departments.', icon: Layers },
    { path: 'employee-attendance', title: 'Attendance', description: 'Track employee attendance.', icon: Layers },
    { path: 'leave-management', title: 'Leave Management', description: 'Manage employee leaves.', icon: Layers },
    { path: 'salary-management', title: 'Salary Management', description: 'Manage employee salaries.', icon: Layers },
    { path: 'loan-advance', title: 'Loan & Advance', description: 'Manage employee loans.', icon: Layers },
    { path: 'provident-fund', title: 'Provident Fund', description: 'Manage provident funds.', icon: Layers },
    { path: 'recruitment', title: 'Recruitment', description: 'Manage recruitment processes.', icon: Layers },
    { path: 'training-management', title: 'Training Management', description: 'Manage employee training.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Employees" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
