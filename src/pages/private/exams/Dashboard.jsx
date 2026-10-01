import React from 'react';
import ModuleDashboard from '../../../components/ModuleDashboard';
import { Layers } from 'lucide-react';

const Dashboard = () => {
  const subModules = [
    { path: 'exam-configuration', title: 'Exam Configuration', description: 'Configure exams.', icon: Layers },
    { path: 'exam-schedule', title: 'Exam Schedule', description: 'Schedule exams.', icon: Layers },
    { path: 'question-bank', title: 'Question Bank', description: 'Manage question banks.', icon: Layers },
    { path: 'question-paper', title: 'Question Paper', description: 'Generate question papers.', icon: Layers },
    { path: 'admit-card', title: 'Admit Card', description: 'Generate admit cards.', icon: Layers },
    { path: 'marks-entry', title: 'Marks Entry', description: 'Enter exam marks.', icon: Layers }
  ];

  return (
    <ModuleDashboard 
      title="Exams" 
      subModules={subModules} 
    />
  );
};

export default Dashboard;
