import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'medical-room', title: 'Medical Room', description: 'Manage medical rooms.', icon: Layers },
    { path: 'student-health', title: 'Student Health', description: 'Track student health.', icon: Layers },
    { path: 'medicine-inventory', title: 'Medicine Inventory', description: 'Manage medicine inventory.', icon: Layers },
    { path: 'health-campaign', title: 'Health Campaign', description: 'Manage health campaigns.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Health" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
