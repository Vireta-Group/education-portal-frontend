import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers, CalendarRange, BookOpen, CircleDot } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'academic-years', title: 'Academic Years', description: 'Manage academic years, activation and archiving.', icon: CalendarRange },
    { path: 'classes', title: 'Classes', description: 'Manage class levels with type and ordering.', icon: Layers },
    { path: 'sections', title: 'Sections', description: 'Manage class sections with shift and capacity.', icon: CircleDot },
    { path: 'subjects', title: 'Subjects', description: 'Manage subjects with type and credit hours.', icon: BookOpen }
  ];

  return (
    <ModuleDashboard
      title="Academic Management"
      subModules={subModules}
    />
  );
};

export default Dashboard;
