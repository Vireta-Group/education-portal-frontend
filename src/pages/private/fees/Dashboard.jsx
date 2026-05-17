import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'fee-structure', title: 'Fee Structure', description: 'Manage fee structures.', icon: Layers },
    { path: 'discount-scholarship', title: 'Discount & Scholarship', description: 'Manage discounts and scholarships.', icon: Layers },
    { path: 'monthly-bill', title: 'Monthly Bill', description: 'Generate monthly bills.', icon: Layers },
    { path: 'payment-collection', title: 'Payment Collection', description: 'Collect fee payments.', icon: Layers },
    { path: 'late-fine', title: 'Late Fine', description: 'Manage late fines.', icon: Layers },
    { path: 'refund-management', title: 'Refund Management', description: 'Manage fee refunds.', icon: Layers },
    { path: 'fee-block', title: 'Fee Block', description: 'Manage fee blocks.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Fees" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
