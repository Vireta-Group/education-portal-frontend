import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'class-section', title: 'Class & Section', description: 'Manage classes and sections.', icon: Layers },
    { path: 'syllabus', title: 'Syllabus', description: 'Manage syllabus for different classes.', icon: Layers },
    { path: 'class-routine', title: 'Class Routine', description: 'Manage class schedules.', icon: Layers },
    { path: 'homework', title: 'Homework', description: 'Assign and track homework.', icon: Layers },
    { path: 'study-material', title: 'Study Material', description: 'Upload and manage study materials.', icon: Layers },
    { path: 'online-class', title: 'Online Class', description: 'Manage virtual classrooms.', icon: Layers },
    { path: 'co-curricular', title: 'Co-Curricular', description: 'Manage co-curricular activities.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Academic Management" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
