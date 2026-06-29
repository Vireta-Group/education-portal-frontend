import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'book-catalog', title: 'Book Catalog', description: 'Manage book catalogs.', icon: Layers },
    { path: 'digital-resource', title: 'Digital Resource', description: 'Manage digital resources.', icon: Layers },
    { path: 'member-management', title: 'Member Management', description: 'Manage library members.', icon: Layers },
    { path: 'issue-return', title: 'Issue & Return', description: 'Manage book issues and returns.', icon: Layers },
    { path: 'overdue-management', title: 'Overdue Management', description: 'Manage overdue books.', icon: Layers },
    { path: 'inventory', title: 'Inventory', description: 'Manage library inventory.', icon: Layers },
    { path: 'o-p-a-c', title: 'OPAC', description: 'Online Public Access Catalog.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Library" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
