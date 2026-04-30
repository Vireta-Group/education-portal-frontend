import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from '../components/Header';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    let timeoutId;
    if (window.innerWidth < 1024) {
      timeoutId = setTimeout(() => setIsSidebarOpen(false), 0);
    }
    return () => clearTimeout(timeoutId);
  }, [location]);

  // Handle default state based on window size on mount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
