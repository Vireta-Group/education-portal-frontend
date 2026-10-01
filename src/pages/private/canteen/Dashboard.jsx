import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'menu-management', title: 'Menu Management', description: 'Manage canteen menus.', icon: Layers },
    { path: 'digital-wallet', title: 'Digital Wallet', description: 'Manage digital wallets.', icon: Layers },
    { path: 'p-o-s-system', title: 'POS System', description: 'Manage point of sale system.', icon: Layers },
    { path: 'inventory', title: 'Inventory', description: 'Manage canteen inventory.', icon: Layers },
    { path: 'vendor-management', title: 'Vendor Management', description: 'Manage canteen vendors.', icon: Layers },
    { path: 'residential-meal', title: 'Residential Meal', description: 'Manage residential meals.', icon: Layers },
    { path: 'canteen-p-l', title: 'Canteen P&L', description: 'Canteen profit and loss.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Canteen" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
