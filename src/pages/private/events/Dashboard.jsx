import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'event-planning', title: 'Event Planning', description: 'Plan school events.', icon: Layers },
    { path: 'event-registration', title: 'Event Registration', description: 'Manage event registrations.', icon: Layers },
    { path: 'ticket-management', title: 'Ticket Management', description: 'Manage event tickets.', icon: Layers },
    { path: 'volunteer-management', title: 'Volunteer Management', description: 'Manage event volunteers.', icon: Layers },
    { path: 'event-expense', title: 'Event Expense', description: 'Manage event expenses.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Events" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
