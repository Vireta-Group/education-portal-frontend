import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'teacher-profile', title: 'Teacher Profile', description: 'View and edit teacher profiles.', icon: Layers },
    { path: 'subject-section', title: 'Subject Section', description: 'Assign subjects and sections.', icon: Layers },
    { path: 'teacher-attendance', title: 'Attendance', description: 'Track teacher attendance.', icon: Layers },
    { path: 'leave-management', title: 'Leave Management', description: 'Manage teacher leaves.', icon: Layers },
    { path: 'salary-management', title: 'Salary Management', description: 'Manage teacher salaries.', icon: Layers },
    { path: 'performance-appraisal', title: 'Performance Appraisal', description: 'Evaluate teacher performance.', icon: Layers },
    { path: 'transfer-resignation', title: 'Transfer & Resignation', description: 'Manage transfers and resignations.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Teachers" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
