import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layout/MainLayout';
import PublicLayout from '../layout/PublicLayout';
import ProtectedRoute from '../features/auth/ProtectedRoute';

// Features - Portfolio
import PortfolioHome from '../pages/portfolio/Home';
import About from '../pages/portfolio/About';
import AcademicLife from '../pages/portfolio/AcademicLife';
import Admission from '../pages/portfolio/Admission';
import CoCurricular from '../pages/portfolio/CoCurricular';
import Newsroom from '../pages/portfolio/Newsroom';
import Contact from '../pages/portfolio/Contact';
import Landing from '../pages/Landing';

// Features - Auth
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';

// Features - App Modules
import Dashboard from '../features/dashboard/Dashboard';
import Students from '../features/students/Students';
import Teachers from '../features/teachers/Teachers';

// Placeholder for unbuilt modules
const Placeholder = ({ name }) => (
  <div className="flex h-full items-center justify-center p-8 text-slate-500">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">{name}</h2>
      <p>This module is under construction.</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Public Portfolio Routing */}
      <Route path="/pubiles" element={<PublicLayout />}>
        <Route index element={<PortfolioHome />} />
        <Route path="about" element={<About />} />
        <Route path="academic-life" element={<AcademicLife />} />
        <Route path="admission" element={<Admission />} />
        <Route path="co-curricular" element={<CoCurricular />} />
        <Route path="newsroom" element={<Newsroom />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Private Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="academics" element={<Placeholder name="Academic Management" />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="employees" element={<Placeholder name="Employee Management" />} />
        <Route path="exams" element={<Placeholder name="Exam Management" />} />
        <Route path="results" element={<Placeholder name="Result Management" />} />
        <Route path="fees" element={<Placeholder name="Fee Management" />} />
        <Route path="transport" element={<Placeholder name="Transport Management" />} />
        <Route path="hostel" element={<Placeholder name="Hostel/Residential Management" />} />
        <Route path="canteen" element={<Placeholder name="Canteen Management" />} />
        <Route path="library" element={<Placeholder name="Library Management" />} />
        <Route path="finance" element={<Placeholder name="Accounting & Finance" />} />
        <Route path="hr" element={<Placeholder name="HR Management" />} />
        <Route path="communication" element={<Placeholder name="Communication Management" />} />
        <Route path="events" element={<Placeholder name="Event Management" />} />
        <Route path="security" element={<Placeholder name="Security Management" />} />
        <Route path="health" element={<Placeholder name="Health Management" />} />
        <Route path="certificates" element={<Placeholder name="Certificate Management" />} />
        <Route path="alumni" element={<Placeholder name="Alumni Management" />} />
        <Route path="assets" element={<Placeholder name="Asset Management" />} />
        <Route path="settings" element={<Placeholder name="System Settings" />} />
        
        {/* Redirect / to /dashboard inside private layout */}
        <Route index element={<Dashboard />} />
      </Route>
      
      {/* Catch-all redirect to Landing */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
