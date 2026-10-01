import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'result-calculation', title: 'Result Calculation', description: 'Calculate results.', icon: Layers },
    { path: 'tabulation-sheet', title: 'Tabulation Sheet', description: 'Generate tabulation sheets.', icon: Layers },
    { path: 'marksheet', title: 'Marksheet', description: 'Generate marksheets.', icon: Layers },
    { path: 'grade-sheet', title: 'Grade Sheet', description: 'Generate grade sheets.', icon: Layers },
    { path: 'consolidated-result', title: 'Consolidated Result', description: 'Generate consolidated results.', icon: Layers },
    { path: 'result-publish', title: 'Result Publish', description: 'Publish results.', icon: Layers },
    { path: 'result-analytics', title: 'Result Analytics', description: 'Analyze results.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Results" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
