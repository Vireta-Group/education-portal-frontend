import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'notice-board', title: 'Notice Board', description: 'Manage notice boards.', icon: Layers },
    { path: 'messaging-system', title: 'Messaging System', description: 'Internal messaging system.', icon: Layers },
    { path: 'bulk-s-m-s', title: 'Bulk SMS', description: 'Send bulk SMS.', icon: Layers },
    { path: 'bulk-email', title: 'Bulk Email', description: 'Send bulk emails.', icon: Layers },
    { path: 'push-notification', title: 'Push Notification', description: 'Send push notifications.', icon: Layers },
    { path: 'parent-teacher-meeting', title: 'Parent Teacher Meeting', description: 'Schedule PTMs.', icon: Layers },
    { path: 'complaint-feedback', title: 'Complaint Feedback', description: 'Manage complaints and feedback.', icon: Layers },
    { path: 'school-newsletter', title: 'School Newsletter', description: 'Manage school newsletters.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Communication" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
