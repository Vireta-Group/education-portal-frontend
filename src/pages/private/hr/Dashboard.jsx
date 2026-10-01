import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'payroll', title: 'Payroll', description: 'Manage payroll.', icon: Layers },
    { path: 'provident-fund', title: 'Provident Fund', description: 'Manage provident funds.', icon: Layers },
    { path: 'loan-management', title: 'Loan Management', description: 'Manage employee loans.', icon: Layers },
    { path: 'recruitment', title: 'Recruitment', description: 'Manage recruitment.', icon: Layers },
    { path: 'onboarding', title: 'Onboarding', description: 'Manage employee onboarding.', icon: Layers },
    { path: 'training', title: 'Training', description: 'Manage employee training.', icon: Layers },
    { path: 'appraisal', title: 'Appraisal', description: 'Manage employee appraisals.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="HR" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
