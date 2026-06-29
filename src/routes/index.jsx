import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layout/MainLayout';
import PublicLayout from '../layout/PublicLayout';
import ProtectedRoute from '../features/auth/ProtectedRoute';

// Features - Portfolio
import PortfolioHome from '../pages/public/Home';
import About from '../pages/public/About';
import AcademicLife from '../pages/public/AcademicLife';
import Admission from '../pages/public/Admission';
import CoCurricular from '../pages/public/CoCurricular';
import Newsroom from '../pages/public/Newsroom';
import Contact from '../pages/public/Contact';
import Landing from '../pages/public/Landing';

// Features - Auth
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

// Features - App Modules
import Dashboard from '../pages/private/Dashboard';

// Academic Management Modules
import ClassSection from '../pages/private/Academic-Management/ClassSection';
import Syllabus from '../pages/private/Academic-Management/Syllabus';
import ClassRoutine from '../pages/private/Academic-Management/ClassRoutine';
import Homework from '../pages/private/Academic-Management/Homework';
import StudyMaterial from '../pages/private/Academic-Management/StudyMaterial';
import OnlineClass from '../pages/private/Academic-Management/OnlineClass';
import CoCurricularAcademic from '../pages/private/Academic-Management/CoCurricular';

// Module Dashboards
import AcademicDashboard from '../pages/private/Academic-Management/Dashboard';
import StudentsDashboard from '../pages/private/students/Dashboard';
import TeachersDashboard from '../pages/private/teachers/Dashboard';
import EmployeesDashboard from '../pages/private/employees/Dashboard';
import ExamsDashboard from '../pages/private/exams/Dashboard';
import ResultsDashboard from '../pages/private/results/Dashboard';
import FeesDashboard from '../pages/private/fees/Dashboard';
import TransportDashboard from '../pages/private/transport/Dashboard';
import HostelDashboard from '../pages/private/hostel/Dashboard';
import CanteenDashboard from '../pages/private/canteen/Dashboard';
import LibraryDashboard from '../pages/private/library/Dashboard';
import HrDashboard from '../pages/private/hr/Dashboard';
import CommunicationDashboard from '../pages/private/communication/Dashboard';
import EventsDashboard from '../pages/private/events/Dashboard';
import SecurityDashboard from '../pages/private/security/Dashboard';
import HealthDashboard from '../pages/private/health/Dashboard';

// Dynamic Modules
import StudentsAdmission from '../pages/private/students/Admission';
import StudentsStudentProfile from '../pages/private/students/StudentProfile';
import StudentsParentGuardian from '../pages/private/students/ParentGuardian';
import StudentsStudentAttendance from '../pages/private/students/StudentAttendance';
import StudentsStudentTransfer from '../pages/private/students/StudentTransfer';
import StudentsTCMigration from '../pages/private/students/TCMigration';
import StudentsDropoutManagement from '../pages/private/students/DropoutManagement';
import StudentsBehaviourDiscipline from '../pages/private/students/BehaviourDiscipline';
import StudentsHealthRecord from '../pages/private/students/HealthRecord';
import TeachersTeacherProfile from '../pages/private/teachers/TeacherProfile';
import TeachersSubjectSection from '../pages/private/teachers/SubjectSection';
import TeachersTeacherAttendance from '../pages/private/teachers/TeacherAttendance';
import TeachersLeaveManagement from '../pages/private/teachers/LeaveManagement';
import TeachersSalaryManagement from '../pages/private/teachers/SalaryManagement';
import TeachersPerformanceAppraisal from '../pages/private/teachers/PerformanceAppraisal';
import TeachersTransferResignation from '../pages/private/teachers/TransferResignation';
import EmployeesEmployeeProfile from '../pages/private/employees/EmployeeProfile';
import EmployeesDepartmentManagement from '../pages/private/employees/DepartmentManagement';
import EmployeesEmployeeAttendance from '../pages/private/employees/EmployeeAttendance';
import EmployeesLeaveManagement from '../pages/private/employees/LeaveManagement';
import EmployeesSalaryManagement from '../pages/private/employees/SalaryManagement';
import EmployeesLoanAdvance from '../pages/private/employees/LoanAdvance';
import EmployeesProvidentFund from '../pages/private/employees/ProvidentFund';
import EmployeesRecruitment from '../pages/private/employees/Recruitment';
import EmployeesTrainingManagement from '../pages/private/employees/TrainingManagement';
import ExamsExamConfiguration from '../pages/private/exams/ExamConfiguration';
import ExamsExamSchedule from '../pages/private/exams/ExamSchedule';
import ExamsQuestionBank from '../pages/private/exams/QuestionBank';
import ExamsQuestionPaper from '../pages/private/exams/QuestionPaper';
import ExamsAdmitCard from '../pages/private/exams/AdmitCard';
import ExamsMarksEntry from '../pages/private/exams/MarksEntry';
import ResultsResultCalculation from '../pages/private/results/ResultCalculation';
import ResultsTabulationSheet from '../pages/private/results/TabulationSheet';
import ResultsMarksheet from '../pages/private/results/Marksheet';
import ResultsGradeSheet from '../pages/private/results/GradeSheet';
import ResultsConsolidatedResult from '../pages/private/results/ConsolidatedResult';
import ResultsResultPublish from '../pages/private/results/ResultPublish';
import ResultsResultAnalytics from '../pages/private/results/ResultAnalytics';
import FeesFeeStructure from '../pages/private/fees/FeeStructure';
import FeesDiscountScholarship from '../pages/private/fees/DiscountScholarship';
import FeesMonthlyBill from '../pages/private/fees/MonthlyBill';
import FeesPaymentCollection from '../pages/private/fees/PaymentCollection';
import FeesLateFine from '../pages/private/fees/LateFine';
import FeesRefundManagement from '../pages/private/fees/RefundManagement';
import FeesFeeBlock from '../pages/private/fees/FeeBlock';
import TransportVehicleManagement from '../pages/private/transport/VehicleManagement';
import TransportDriverStaff from '../pages/private/transport/DriverStaff';
import TransportRouteManagement from '../pages/private/transport/RouteManagement';
import TransportStudentAssignment from '../pages/private/transport/StudentAssignment';
import TransportTransportAttendance from '../pages/private/transport/TransportAttendance';
import TransportTransportIncome from '../pages/private/transport/TransportIncome';
import TransportTransportExpense from '../pages/private/transport/TransportExpense';
import TransportTransportPL from '../pages/private/transport/TransportPL';
import HostelRoomManagement from '../pages/private/hostel/RoomManagement';
import HostelHostelAdmission from '../pages/private/hostel/HostelAdmission';
import HostelHostelAttendance from '../pages/private/hostel/HostelAttendance';
import HostelVisitorManagement from '../pages/private/hostel/VisitorManagement';
import HostelHostelDiscipline from '../pages/private/hostel/HostelDiscipline';
import HostelHostelMaintenance from '../pages/private/hostel/HostelMaintenance';
import HostelHostelExpense from '../pages/private/hostel/HostelExpense';
import CanteenMenuManagement from '../pages/private/canteen/MenuManagement';
import CanteenDigitalWallet from '../pages/private/canteen/DigitalWallet';
import CanteenPOSSystem from '../pages/private/canteen/POSSystem';
import CanteenInventory from '../pages/private/canteen/Inventory';
import CanteenVendorManagement from '../pages/private/canteen/VendorManagement';
import CanteenResidentialMeal from '../pages/private/canteen/ResidentialMeal';
import CanteenCanteenPL from '../pages/private/canteen/CanteenPL';
import LibraryBookCatalog from '../pages/private/library/BookCatalog';
import LibraryDigitalResource from '../pages/private/library/DigitalResource';
import LibraryMemberManagement from '../pages/private/library/MemberManagement';
import LibraryIssueReturn from '../pages/private/library/IssueReturn';
import LibraryOverdueManagement from '../pages/private/library/OverdueManagement';
import LibraryInventory from '../pages/private/library/Inventory';
import LibraryOPAC from '../pages/private/library/OPAC';
import HrPayroll from '../pages/private/hr/Payroll';
import HrProvidentFund from '../pages/private/hr/ProvidentFund';
import HrLoanManagement from '../pages/private/hr/LoanManagement';
import HrRecruitment from '../pages/private/hr/Recruitment';
import HrOnboarding from '../pages/private/hr/Onboarding';
import HrTraining from '../pages/private/hr/Training';
import HrAppraisal from '../pages/private/hr/Appraisal';
import CommunicationNoticeBoard from '../pages/private/communication/NoticeBoard';
import CommunicationMessagingSystem from '../pages/private/communication/MessagingSystem';
import CommunicationBulkSMS from '../pages/private/communication/BulkSMS';
import CommunicationBulkEmail from '../pages/private/communication/BulkEmail';
import CommunicationPushNotification from '../pages/private/communication/PushNotification';
import CommunicationParentTeacherMeeting from '../pages/private/communication/ParentTeacherMeeting';
import CommunicationComplaintFeedback from '../pages/private/communication/ComplaintFeedback';
import CommunicationSchoolNewsletter from '../pages/private/communication/SchoolNewsletter';
import EventsEventPlanning from '../pages/private/events/EventPlanning';
import EventsEventRegistration from '../pages/private/events/EventRegistration';
import EventsTicketManagement from '../pages/private/events/TicketManagement';
import EventsVolunteerManagement from '../pages/private/events/VolunteerManagement';
import EventsEventExpense from '../pages/private/events/EventExpense';
import SecurityGateManagement from '../pages/private/security/GateManagement';
import SecurityVisitorManagement from '../pages/private/security/VisitorManagement';
import SecurityCCTVIntegration from '../pages/private/security/CCTVIntegration';
import SecurityEmergencyManagement from '../pages/private/security/EmergencyManagement';
import HealthMedicalRoom from '../pages/private/health/MedicalRoom';
import HealthStudentHealth from '../pages/private/health/StudentHealth';
import HealthMedicineInventory from '../pages/private/health/MedicineInventory';
import HealthHealthCampaign from '../pages/private/health/HealthCampaign';

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
      <Route path="/public" element={<PublicLayout />}>
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
        <Route path="academics">
          <Route index element={<AcademicDashboard />} />
          <Route path="class-section" element={<ClassSection />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="class-routine" element={<ClassRoutine />} />
          <Route path="homework" element={<Homework />} />
          <Route path="study-material" element={<StudyMaterial />} />
          <Route path="online-class" element={<OnlineClass />} />
          <Route path="co-curricular" element={<CoCurricularAcademic />} />
        </Route>
        <Route path="students">
          <Route index element={<StudentsDashboard />} />
          <Route path="admission" element={<StudentsAdmission />} />
          <Route path="student-profile" element={<StudentsStudentProfile />} />
          <Route path="parent-guardian" element={<StudentsParentGuardian />} />
          <Route path="student-attendance" element={<StudentsStudentAttendance />} />
          <Route path="student-transfer" element={<StudentsStudentTransfer />} />
          <Route path="t-c-migration" element={<StudentsTCMigration />} />
          <Route path="dropout-management" element={<StudentsDropoutManagement />} />
          <Route path="behaviour-discipline" element={<StudentsBehaviourDiscipline />} />
          <Route path="health-record" element={<StudentsHealthRecord />} />
        </Route>
        <Route path="teachers">
          <Route index element={<TeachersDashboard />} />
          <Route path="teacher-profile" element={<TeachersTeacherProfile />} />
          <Route path="subject-section" element={<TeachersSubjectSection />} />
          <Route path="teacher-attendance" element={<TeachersTeacherAttendance />} />
          <Route path="leave-management" element={<TeachersLeaveManagement />} />
          <Route path="salary-management" element={<TeachersSalaryManagement />} />
          <Route path="performance-appraisal" element={<TeachersPerformanceAppraisal />} />
          <Route path="transfer-resignation" element={<TeachersTransferResignation />} />
        </Route>
        <Route path="employees">
          <Route index element={<EmployeesDashboard />} />
          <Route path="employee-profile" element={<EmployeesEmployeeProfile />} />
          <Route path="department-management" element={<EmployeesDepartmentManagement />} />
          <Route path="employee-attendance" element={<EmployeesEmployeeAttendance />} />
          <Route path="leave-management" element={<EmployeesLeaveManagement />} />
          <Route path="salary-management" element={<EmployeesSalaryManagement />} />
          <Route path="loan-advance" element={<EmployeesLoanAdvance />} />
          <Route path="provident-fund" element={<EmployeesProvidentFund />} />
          <Route path="recruitment" element={<EmployeesRecruitment />} />
          <Route path="training-management" element={<EmployeesTrainingManagement />} />
        </Route>
        <Route path="exams">
          <Route index element={<ExamsDashboard />} />
          <Route path="exam-configuration" element={<ExamsExamConfiguration />} />
          <Route path="exam-schedule" element={<ExamsExamSchedule />} />
          <Route path="question-bank" element={<ExamsQuestionBank />} />
          <Route path="question-paper" element={<ExamsQuestionPaper />} />
          <Route path="admit-card" element={<ExamsAdmitCard />} />
          <Route path="marks-entry" element={<ExamsMarksEntry />} />
        </Route>
        <Route path="results">
          <Route index element={<ResultsDashboard />} />
          <Route path="result-calculation" element={<ResultsResultCalculation />} />
          <Route path="tabulation-sheet" element={<ResultsTabulationSheet />} />
          <Route path="marksheet" element={<ResultsMarksheet />} />
          <Route path="grade-sheet" element={<ResultsGradeSheet />} />
          <Route path="consolidated-result" element={<ResultsConsolidatedResult />} />
          <Route path="result-publish" element={<ResultsResultPublish />} />
          <Route path="result-analytics" element={<ResultsResultAnalytics />} />
        </Route>
        <Route path="fees">
          <Route index element={<FeesDashboard />} />
          <Route path="fee-structure" element={<FeesFeeStructure />} />
          <Route path="discount-scholarship" element={<FeesDiscountScholarship />} />
          <Route path="monthly-bill" element={<FeesMonthlyBill />} />
          <Route path="payment-collection" element={<FeesPaymentCollection />} />
          <Route path="late-fine" element={<FeesLateFine />} />
          <Route path="refund-management" element={<FeesRefundManagement />} />
          <Route path="fee-block" element={<FeesFeeBlock />} />
        </Route>
        <Route path="transport">
          <Route index element={<TransportDashboard />} />
          <Route path="vehicle-management" element={<TransportVehicleManagement />} />
          <Route path="driver-staff" element={<TransportDriverStaff />} />
          <Route path="route-management" element={<TransportRouteManagement />} />
          <Route path="student-assignment" element={<TransportStudentAssignment />} />
          <Route path="transport-attendance" element={<TransportTransportAttendance />} />
          <Route path="transport-income" element={<TransportTransportIncome />} />
          <Route path="transport-expense" element={<TransportTransportExpense />} />
          <Route path="transport-p-l" element={<TransportTransportPL />} />
        </Route>
        <Route path="hostel">
          <Route index element={<HostelDashboard />} />
          <Route path="room-management" element={<HostelRoomManagement />} />
          <Route path="hostel-admission" element={<HostelHostelAdmission />} />
          <Route path="hostel-attendance" element={<HostelHostelAttendance />} />
          <Route path="visitor-management" element={<HostelVisitorManagement />} />
          <Route path="hostel-discipline" element={<HostelHostelDiscipline />} />
          <Route path="hostel-maintenance" element={<HostelHostelMaintenance />} />
          <Route path="hostel-expense" element={<HostelHostelExpense />} />
        </Route>
        <Route path="canteen">
          <Route index element={<CanteenDashboard />} />
          <Route path="menu-management" element={<CanteenMenuManagement />} />
          <Route path="digital-wallet" element={<CanteenDigitalWallet />} />
          <Route path="p-o-s-system" element={<CanteenPOSSystem />} />
          <Route path="inventory" element={<CanteenInventory />} />
          <Route path="vendor-management" element={<CanteenVendorManagement />} />
          <Route path="residential-meal" element={<CanteenResidentialMeal />} />
          <Route path="canteen-p-l" element={<CanteenCanteenPL />} />
        </Route>
        <Route path="library">
          <Route index element={<LibraryDashboard />} />
          <Route path="book-catalog" element={<LibraryBookCatalog />} />
          <Route path="digital-resource" element={<LibraryDigitalResource />} />
          <Route path="member-management" element={<LibraryMemberManagement />} />
          <Route path="issue-return" element={<LibraryIssueReturn />} />
          <Route path="overdue-management" element={<LibraryOverdueManagement />} />
          <Route path="inventory" element={<LibraryInventory />} />
          <Route path="o-p-a-c" element={<LibraryOPAC />} />
        </Route>
        <Route path="hr">
          <Route index element={<HrDashboard />} />
          <Route path="payroll" element={<HrPayroll />} />
          <Route path="provident-fund" element={<HrProvidentFund />} />
          <Route path="loan-management" element={<HrLoanManagement />} />
          <Route path="recruitment" element={<HrRecruitment />} />
          <Route path="onboarding" element={<HrOnboarding />} />
          <Route path="training" element={<HrTraining />} />
          <Route path="appraisal" element={<HrAppraisal />} />
        </Route>
        <Route path="communication">
          <Route index element={<CommunicationDashboard />} />
          <Route path="notice-board" element={<CommunicationNoticeBoard />} />
          <Route path="messaging-system" element={<CommunicationMessagingSystem />} />
          <Route path="bulk-s-m-s" element={<CommunicationBulkSMS />} />
          <Route path="bulk-email" element={<CommunicationBulkEmail />} />
          <Route path="push-notification" element={<CommunicationPushNotification />} />
          <Route path="parent-teacher-meeting" element={<CommunicationParentTeacherMeeting />} />
          <Route path="complaint-feedback" element={<CommunicationComplaintFeedback />} />
          <Route path="school-newsletter" element={<CommunicationSchoolNewsletter />} />
        </Route>
        <Route path="events">
          <Route index element={<EventsDashboard />} />
          <Route path="event-planning" element={<EventsEventPlanning />} />
          <Route path="event-registration" element={<EventsEventRegistration />} />
          <Route path="ticket-management" element={<EventsTicketManagement />} />
          <Route path="volunteer-management" element={<EventsVolunteerManagement />} />
          <Route path="event-expense" element={<EventsEventExpense />} />
        </Route>
        <Route path="security">
          <Route index element={<SecurityDashboard />} />
          <Route path="gate-management" element={<SecurityGateManagement />} />
          <Route path="visitor-management" element={<SecurityVisitorManagement />} />
          <Route path="c-c-t-v-integration" element={<SecurityCCTVIntegration />} />
          <Route path="emergency-management" element={<SecurityEmergencyManagement />} />
        </Route>
        <Route path="health">
          <Route index element={<HealthDashboard />} />
          <Route path="medical-room" element={<HealthMedicalRoom />} />
          <Route path="student-health" element={<HealthStudentHealth />} />
          <Route path="medicine-inventory" element={<HealthMedicineInventory />} />
          <Route path="health-campaign" element={<HealthHealthCampaign />} />
        </Route>
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
