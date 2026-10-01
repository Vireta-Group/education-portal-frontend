import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'gate-management', title: 'Gate Management', description: 'Manage gate entries and exits.', icon: Layers },
    { path: 'visitor-management', title: 'Visitor Management', description: 'Manage school visitors.', icon: Layers },
    { path: 'c-c-t-v-integration', title: 'CCTV Integration', description: 'Manage CCTV cameras.', icon: Layers },
    { path: 'emergency-management', title: 'Emergency Management', description: 'Manage emergencies.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Security" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
