import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'admission', title: 'Admission', description: 'Manage student admissions.', icon: Layers },
    { path: 'student-profile', title: 'Student Profile', description: 'View and edit student profiles.', icon: Layers },
    { path: 'parent-guardian', title: 'Parent & Guardian', description: 'Manage parent information.', icon: Layers },
    { path: 'student-attendance', title: 'Attendance', description: 'Track student attendance.', icon: Layers },
    { path: 'student-transfer', title: 'Transfer', description: 'Manage student transfers.', icon: Layers },
    { path: 't-c-migration', title: 'TC & Migration', description: 'Manage transfer certificates.', icon: Layers },
    { path: 'dropout-management', title: 'Dropout Management', description: 'Track and manage dropouts.', icon: Layers },
    { path: 'behaviour-discipline', title: 'Behaviour & Discipline', description: 'Manage disciplinary records.', icon: Layers },
    { path: 'health-record', title: 'Health Record', description: 'Track student health records.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Students" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
