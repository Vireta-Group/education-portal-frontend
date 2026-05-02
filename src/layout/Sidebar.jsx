import { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, GraduationCap, BookOpen, Calculator, FileText, Settings, Bus, UserCircle2, Library, Calendar, ShieldCheck, Stethoscope, Award, Coffee, Home, UserCheck, MessageSquare, Briefcase, LogOut, ChevronDown, ChevronRight, Users, ClipboardList, Clock, PenTool, Files, Video, Activity, User, CalendarClock, CircleDollarSign, ArrowRightLeft, CalendarRange, Building, Utensils, ShieldAlert, TrendingUp, UserPlus, CircleDot
} from 'lucide-react';

const MODULES = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' },
  { 
    id: 'academics', 
    name: 'Academic', 
    icon: BookOpen, 
    path: '/academics',
    subItems: [
      { id: 'class-section', name: 'Class & Section', icon: Users, path: '/academics/class-section' },
      { id: 'syllabus', name: 'Syllabus', icon: ClipboardList, path: '/academics/syllabus' },
      { id: 'class-routine', name: 'Class Routine', icon: Clock, path: '/academics/class-routine' },
      { id: 'homework', name: 'Homework', icon: PenTool, path: '/academics/homework' },
      { id: 'study-material', name: 'Study Material', icon: Files, path: '/academics/study-material' },
      { id: 'online-class', name: 'Online Class', icon: Video, path: '/academics/online-class' },
      { id: 'co-curricular', name: 'Co-curricular Activity', icon: Activity, path: '/academics/co-curricular' },
    ]
  },
  { 
    id: 'students', 
    name: 'Students', 
    icon: GraduationCap, 
    path: '/students',
    subItems: [
      { id: 'admission', name: 'Admission', icon: CircleDot, path: '/students/admission' },
      { id: 'student-profile', name: 'Student Profile', icon: User, path: '/students/student-profile' },
      { id: 'parent-guardian', name: 'Parent Guardian', icon: User, path: '/students/parent-guardian' },
      { id: 'student-attendance', name: 'Student Attendance', icon: User, path: '/students/student-attendance' },
      { id: 'student-transfer', name: 'Student Transfer', icon: User, path: '/students/student-transfer' },
      { id: 't-c-migration', name: 'T C Migration', icon: ArrowRightLeft, path: '/students/t-c-migration' },
      { id: 'dropout-management', name: 'Dropout Management', icon: Settings, path: '/students/dropout-management' },
      { id: 'behaviour-discipline', name: 'Behaviour Discipline', icon: ShieldAlert, path: '/students/behaviour-discipline' },
      { id: 'health-record', name: 'Health Record', icon: Stethoscope, path: '/students/health-record' },
    ]
  },
  { 
    id: 'teachers', 
    name: 'Teachers', 
    icon: UserCircle2, 
    path: '/teachers',
    subItems: [
      { id: 'teacher-profile', name: 'Teacher Profile', icon: User, path: '/teachers/teacher-profile' },
      { id: 'subject-section', name: 'Subject Section', icon: CircleDot, path: '/teachers/subject-section' },
      { id: 'teacher-attendance', name: 'Teacher Attendance', icon: User, path: '/teachers/teacher-attendance' },
      { id: 'leave-management', name: 'Leave Management', icon: CalendarClock, path: '/teachers/leave-management' },
      { id: 'salary-management', name: 'Salary Management', icon: CircleDollarSign, path: '/teachers/salary-management' },
      { id: 'performance-appraisal', name: 'Performance Appraisal', icon: TrendingUp, path: '/teachers/performance-appraisal' },
      { id: 'transfer-resignation', name: 'Transfer Resignation', icon: ArrowRightLeft, path: '/teachers/transfer-resignation' },
    ]
  },
  { 
    id: 'employees', 
    name: 'Employees', 
    icon: Briefcase, 
    path: '/employees',
    subItems: [
      { id: 'employee-profile', name: 'Employee Profile', icon: User, path: '/employees/employee-profile' },
      { id: 'department-management', name: 'Department Management', icon: Settings, path: '/employees/department-management' },
      { id: 'employee-attendance', name: 'Employee Attendance', icon: User, path: '/employees/employee-attendance' },
      { id: 'leave-management', name: 'Leave Management', icon: CalendarClock, path: '/employees/leave-management' },
      { id: 'salary-management', name: 'Salary Management', icon: CircleDollarSign, path: '/employees/salary-management' },
      { id: 'loan-advance', name: 'Loan Advance', icon: CircleDollarSign, path: '/employees/loan-advance' },
      { id: 'provident-fund', name: 'Provident Fund', icon: CircleDollarSign, path: '/employees/provident-fund' },
      { id: 'recruitment', name: 'Recruitment', icon: UserPlus, path: '/employees/recruitment' },
      { id: 'training-management', name: 'Training Management', icon: Settings, path: '/employees/training-management' },
    ]
  },
  { 
    id: 'exams', 
    name: 'Examinations', 
    icon: FileText, 
    path: '/exams',
    subItems: [
      { id: 'exam-configuration', name: 'Exam Configuration', icon: Settings, path: '/exams/exam-configuration' },
      { id: 'exam-schedule', name: 'Exam Schedule', icon: CalendarClock, path: '/exams/exam-schedule' },
      { id: 'question-bank', name: 'Question Bank', icon: FileText, path: '/exams/question-bank' },
      { id: 'question-paper', name: 'Question Paper', icon: FileText, path: '/exams/question-paper' },
      { id: 'admit-card', name: 'Admit Card', icon: FileText, path: '/exams/admit-card' },
      { id: 'marks-entry', name: 'Marks Entry', icon: FileText, path: '/exams/marks-entry' },
    ]
  },
  { 
    id: 'results', 
    name: 'Results', 
    icon: Award, 
    path: '/results',
    subItems: [
      { id: 'result-calculation', name: 'Result Calculation', icon: FileText, path: '/results/result-calculation' },
      { id: 'tabulation-sheet', name: 'Tabulation Sheet', icon: FileText, path: '/results/tabulation-sheet' },
      { id: 'marksheet', name: 'Marksheet', icon: FileText, path: '/results/marksheet' },
      { id: 'grade-sheet', name: 'Grade Sheet', icon: FileText, path: '/results/grade-sheet' },
      { id: 'consolidated-result', name: 'Consolidated Result', icon: FileText, path: '/results/consolidated-result' },
      { id: 'result-publish', name: 'Result Publish', icon: FileText, path: '/results/result-publish' },
      { id: 'result-analytics', name: 'Result Analytics', icon: FileText, path: '/results/result-analytics' },
    ]
  },
  { 
    id: 'fees', 
    name: 'Fees & Acc.', 
    icon: Calculator, 
    path: '/fees',
    subItems: [
      { id: 'fee-structure', name: 'Fee Structure', icon: CircleDollarSign, path: '/fees/fee-structure' },
      { id: 'discount-scholarship', name: 'Discount Scholarship', icon: CircleDollarSign, path: '/fees/discount-scholarship' },
      { id: 'monthly-bill', name: 'Monthly Bill', icon: CircleDollarSign, path: '/fees/monthly-bill' },
      { id: 'payment-collection', name: 'Payment Collection', icon: CircleDollarSign, path: '/fees/payment-collection' },
      { id: 'late-fine', name: 'Late Fine', icon: CircleDollarSign, path: '/fees/late-fine' },
      { id: 'refund-management', name: 'Refund Management', icon: CircleDollarSign, path: '/fees/refund-management' },
      { id: 'fee-block', name: 'Fee Block', icon: CircleDollarSign, path: '/fees/fee-block' },
    ]
  },
  { 
    id: 'transport', 
    name: 'Transport', 
    icon: Bus, 
    path: '/transport',
    subItems: [
      { id: 'vehicle-management', name: 'Vehicle Management', icon: Settings, path: '/transport/vehicle-management' },
      { id: 'driver-staff', name: 'Driver Staff', icon: User, path: '/transport/driver-staff' },
      { id: 'route-management', name: 'Route Management', icon: Settings, path: '/transport/route-management' },
      { id: 'student-assignment', name: 'Student Assignment', icon: User, path: '/transport/student-assignment' },
      { id: 'transport-attendance', name: 'Transport Attendance', icon: CalendarClock, path: '/transport/transport-attendance' },
      { id: 'transport-income', name: 'Transport Income', icon: CircleDollarSign, path: '/transport/transport-income' },
      { id: 'transport-expense', name: 'Transport Expense', icon: CircleDollarSign, path: '/transport/transport-expense' },
      { id: 'transport-p-l', name: 'Transport P L', icon: Bus, path: '/transport/transport-p-l' },
    ]
  },
  { 
    id: 'hostel', 
    name: 'Hostel', 
    icon: Building2, 
    path: '/hostel',
    subItems: [
      { id: 'room-management', name: 'Room Management', icon: Settings, path: '/hostel/room-management' },
      { id: 'hostel-admission', name: 'Hostel Admission', icon: Building, path: '/hostel/hostel-admission' },
      { id: 'hostel-attendance', name: 'Hostel Attendance', icon: CalendarClock, path: '/hostel/hostel-attendance' },
      { id: 'visitor-management', name: 'Visitor Management', icon: User, path: '/hostel/visitor-management' },
      { id: 'hostel-discipline', name: 'Hostel Discipline', icon: Building, path: '/hostel/hostel-discipline' },
      { id: 'hostel-maintenance', name: 'Hostel Maintenance', icon: Building, path: '/hostel/hostel-maintenance' },
      { id: 'hostel-expense', name: 'Hostel Expense', icon: CircleDollarSign, path: '/hostel/hostel-expense' },
    ]
  },
  { 
    id: 'canteen', 
    name: 'Canteen', 
    icon: Coffee, 
    path: '/canteen',
    subItems: [
      { id: 'menu-management', name: 'Menu Management', icon: Settings, path: '/canteen/menu-management' },
      { id: 'digital-wallet', name: 'Digital Wallet', icon: CircleDollarSign, path: '/canteen/digital-wallet' },
      { id: 'p-o-s-system', name: 'P O S System', icon: CircleDot, path: '/canteen/p-o-s-system' },
      { id: 'inventory', name: 'Inventory', icon: CircleDot, path: '/canteen/inventory' },
      { id: 'vendor-management', name: 'Vendor Management', icon: Settings, path: '/canteen/vendor-management' },
      { id: 'residential-meal', name: 'Residential Meal', icon: Utensils, path: '/canteen/residential-meal' },
      { id: 'canteen-p-l', name: 'Canteen P L', icon: Utensils, path: '/canteen/canteen-p-l' },
    ]
  },
  { 
    id: 'library', 
    name: 'Library', 
    icon: Library, 
    path: '/library',
    subItems: [
      { id: 'book-catalog', name: 'Book Catalog', icon: FileText, path: '/library/book-catalog' },
      { id: 'digital-resource', name: 'Digital Resource', icon: BookOpen, path: '/library/digital-resource' },
      { id: 'member-management', name: 'Member Management', icon: User, path: '/library/member-management' },
      { id: 'issue-return', name: 'Issue Return', icon: ArrowRightLeft, path: '/library/issue-return' },
      { id: 'overdue-management', name: 'Overdue Management', icon: Settings, path: '/library/overdue-management' },
      { id: 'inventory', name: 'Inventory', icon: CircleDot, path: '/library/inventory' },
      { id: 'o-p-a-c', name: 'O P A C', icon: CircleDot, path: '/library/o-p-a-c' },
    ]
  },
  { 
    id: 'hr', 
    name: 'HR Mgr.', 
    icon: UserCheck, 
    path: '/hr',
    subItems: [
      { id: 'payroll', name: 'Payroll', icon: CircleDollarSign, path: '/hr/payroll' },
      { id: 'provident-fund', name: 'Provident Fund', icon: CircleDollarSign, path: '/hr/provident-fund' },
      { id: 'loan-management', name: 'Loan Management', icon: CircleDollarSign, path: '/hr/loan-management' },
      { id: 'recruitment', name: 'Recruitment', icon: UserPlus, path: '/hr/recruitment' },
      { id: 'onboarding', name: 'Onboarding', icon: UserPlus, path: '/hr/onboarding' },
      { id: 'training', name: 'Training', icon: UserPlus, path: '/hr/training' },
      { id: 'appraisal', name: 'Appraisal', icon: TrendingUp, path: '/hr/appraisal' },
    ]
  },
  { 
    id: 'communication', 
    name: 'Communicate', 
    icon: MessageSquare, 
    path: '/communication',
    subItems: [
      { id: 'notice-board', name: 'Notice Board', icon: FileText, path: '/communication/notice-board' },
      { id: 'messaging-system', name: 'Messaging System', icon: CircleDot, path: '/communication/messaging-system' },
      { id: 'bulk-s-m-s', name: 'Bulk S M S', icon: CircleDot, path: '/communication/bulk-s-m-s' },
      { id: 'bulk-email', name: 'Bulk Email', icon: MessageSquare, path: '/communication/bulk-email' },
      { id: 'push-notification', name: 'Push Notification', icon: MessageSquare, path: '/communication/push-notification' },
      { id: 'parent-teacher-meeting', name: 'Parent Teacher Meeting', icon: User, path: '/communication/parent-teacher-meeting' },
      { id: 'complaint-feedback', name: 'Complaint Feedback', icon: CircleDollarSign, path: '/communication/complaint-feedback' },
      { id: 'school-newsletter', name: 'School Newsletter', icon: CircleDot, path: '/communication/school-newsletter' },
    ]
  },
  { 
    id: 'events', 
    name: 'Events', 
    icon: Calendar, 
    path: '/events',
    subItems: [
      { id: 'event-planning', name: 'Event Planning', icon: CalendarRange, path: '/events/event-planning' },
      { id: 'event-registration', name: 'Event Registration', icon: CalendarRange, path: '/events/event-registration' },
      { id: 'ticket-management', name: 'Ticket Management', icon: Settings, path: '/events/ticket-management' },
      { id: 'volunteer-management', name: 'Volunteer Management', icon: Settings, path: '/events/volunteer-management' },
      { id: 'event-expense', name: 'Event Expense', icon: CircleDollarSign, path: '/events/event-expense' },
    ]
  },
  { 
    id: 'security', 
    name: 'Security', 
    icon: ShieldCheck, 
    path: '/security',
    subItems: [
      { id: 'gate-management', name: 'Gate Management', icon: Settings, path: '/security/gate-management' },
      { id: 'visitor-management', name: 'Visitor Management', icon: User, path: '/security/visitor-management' },
      { id: 'c-c-t-v-integration', name: 'C C T V Integration', icon: CircleDot, path: '/security/c-c-t-v-integration' },
      { id: 'emergency-management', name: 'Emergency Management', icon: Settings, path: '/security/emergency-management' },
    ]
  },
  { 
    id: 'health', 
    name: 'Health', 
    icon: Stethoscope, 
    path: '/health',
    subItems: [
      { id: 'medical-room', name: 'Medical Room', icon: Stethoscope, path: '/health/medical-room' },
      { id: 'student-health', name: 'Student Health', icon: User, path: '/health/student-health' },
      { id: 'medicine-inventory', name: 'Medicine Inventory', icon: Stethoscope, path: '/health/medicine-inventory' },
      { id: 'health-campaign', name: 'Health Campaign', icon: Stethoscope, path: '/health/health-campaign' },
    ]
  },
  { id: 'settings', name: 'System Settings', icon: Settings, path: '/settings' },
];


const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (e, id, hasSubItems) => {
    if (hasSubItems) {
      e.preventDefault();
      setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/60
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-sky-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg">EP</span>
          </div>
          <span className={`font-bold text-slate-800 dark:text-white text-lg whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}>
            EduPro
          </span>
        </Link>
        
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-4 px-3 flex flex-col gap-1">
        {MODULES.map((module) => {
          const isParentActive = location.pathname.startsWith(module.path);
          const isExpanded = expandedMenus[module.id];
          
          return (
            <div key={module.id} className="flex flex-col">
              <NavLink
                to={module.subItems ? '#' : module.path}
                title={!isOpen ? module.name : undefined}
                onClick={(e) => toggleMenu(e, module.id, !!module.subItems)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${(module.subItems ? isParentActive : isActive) 
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'}
                `}
              >
                <module.icon 
                  size={20} 
                  strokeWidth={2}
                  className={`shrink-0 transition-colors ${!isOpen ? 'mx-auto' : ''}`}
                />
                <span className={`whitespace-nowrap flex-1 transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden lg:block pointer-events-none'}`}>
                  {module.name}
                </span>
                
                {isOpen && module.subItems && (
                  isExpanded ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />
                )}
                
                {/* Active Indicator Line */}
                {isOpen && (module.subItems ? isParentActive : location.pathname === module.path) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-indigo-600 rounded-r-md transition-all duration-300 group-[.active]:h-6" />
                )}
              </NavLink>
              
              {/* Sub-menu rendering */}
              {isOpen && module.subItems && isExpanded && (
                <div className="flex flex-col gap-1 mt-1 ml-9 mb-1">
                  {module.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.id}
                      to={subItem.path}
                      className={({ isActive }) => `
                        flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-all duration-200
                        ${isActive 
                          ? 'bg-indigo-50/50 dark:bg-indigo-500/5 text-indigo-700 dark:text-indigo-400 font-medium' 
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                      `}
                    >
                      {subItem.icon && <subItem.icon size={16} strokeWidth={2} className="shrink-0" />}
                      <span>{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 shrink-0">
        <button 
          onClick={handleLogout}
          className={`
            w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
            text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium
            ${!isOpen ? 'px-0' : ''}
          `}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
