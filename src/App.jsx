import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./assets/components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookieConsentBanner from "./pages/CookieConsentBanner";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AssessmentProvider, useAssessmentContext } from "./pages/assessment/context/AssessmentContext";

// Auth guard for assessment-only routes
function AssessmentGuard({ children }) {
  const { token } = useAssessmentContext();
  if (!token) return <Navigate to="/assessment-toolkit/login" replace />;
  return children;
}


const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const EventPage = lazy(() => import("./pages/EventPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const YouthCyberEd = lazy(() => import("./pages/YouthCyberEd"));
const Consultation = lazy(() => import("./pages/Consultation"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Services = lazy(() => import("./pages/Services"));
const ProductDetail = lazy(() => import("./pages/services/ProductDetail"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const CybersecuritySurvey = lazy(() => import("./pages/CybersecuritySurvey"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const LogIn = lazy(() => import("./pages/LogIn"));



// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Overview = lazy(() => import("./pages/admin/Overview"));
const ManageEvents = lazy(() => import("./pages/admin/ManageEvents"));
const ManageBlogs = lazy(() => import("./pages/admin/ManageBlogs"));
const ManagePopups = lazy(() => import("./pages/admin/ManagePopups"));


// Assessment pages
const AssessmentToolkit = lazy(() => import("./pages/assessment/AssessmentToolkit"));
const AssessmentStart = lazy(() => import("./pages/assessment/pages/AssessmentStart"));
const AssessmentSignUp = lazy(() => import("./pages/assessment/pages/AssessmentSignUp"));
const AssessmentLogin = lazy(() => import("./pages/assessment/pages/AssessmentLogin"));
const AssessmentForm = lazy(() => import("./pages/assessment/pages/AssessmentForm"));
const AssessmentReport = lazy(() => import("./pages/assessment/pages/AssessmentReport"));
const AssessmentDashboard = lazy(() => import("./pages/assessment/pages/AssessmentDashboard"));
const AssessmentPrivacyPolicy = lazy(() => import("./pages/assessment/pages/AssessmentPrivacyPolicy"));
const AssessmentTermsOfUse = lazy(() => import("./pages/assessment/pages/AssessmentTermsOfUse"));
const AssessmentResources = lazy(() => import("./pages/assessment/pages/AssessmentResources"));
const AssessmentSolutions = lazy(() => import("./pages/assessment/pages/AssessmentSolutions"));
const AssessmentContact = lazy(() => import("./pages/assessment/pages/AssessmentContact"));
const AssessmentOtpVerify = lazy(() => import("./pages/assessment/pages/AssessmentOtpVerify"));
const AssessmentCheckEmail = lazy(() => import("./pages/assessment/pages/AssessmentCheckEmail"));
const AssessmentVerifyEmail = lazy(() => import("./pages/assessment/pages/AssessmentVerifyEmail"));
const AssessmentForgotPassword = lazy(() => import("./pages/assessment/pages/AssessmentForgotPassword"));
const AssessmentVerifyResetOtp = lazy(() => import("./pages/assessment/pages/AssessmentVerifyResetOtp"));
const AssessmentResetPassword = lazy(() => import("./pages/assessment/pages/AssessmentResetPassword"));
const ManageAssessments = lazy(() => import("./pages/admin/ManageAssessments"));
const ManagePromoCodes = lazy(() => import("./pages/admin/ManagePromoCodes"));

// Super Admin pages
const ManageAdmins = lazy(() => import("./pages/admin/superadmin/ManageAdmins"));
const AuditLogs = lazy(() => import("./pages/admin/superadmin/AuditLogs"));
const TransferSuperAdmin = lazy(() => import("./pages/admin/superadmin/TransferSuperAdmin"));
const SuperAdminChangePassword = lazy(() => import("./pages/admin/superadmin/ChangePassword"));
const ForceChangePassword = lazy(() => import("./pages/admin/ForceChangePassword"));
const Profile = lazy(() => import("./pages/admin/Profile"));
// Loader
function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-orange-500">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-orange-500"></div>
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
}

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsentBanner />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />
            <Route path="/event-page" element={<EventPage />} />
            <Route path="/blog-page" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/youth-cyber-ed" element={<YouthCyberEd />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cybersecurity-survey" element={<CybersecuritySurvey />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
        
            
            {/* Auth Routes */}
            <Route path="/login" element={<LogIn />} />
            {/* Public signup is closed — admins are minted by the super admin only.
                Anyone hitting /signup gets redirected to the login page. */}
            <Route path="/signup" element={<Navigate to="/login" replace />} />

            {/* Forced first-login password change — protected, but rendered standalone
                (no admin layout) so the user cannot navigate elsewhere until done. */}
            <Route
              path="/admin/change-password"
              element={
                <ProtectedRoute>
                  <ForceChangePassword />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes - Protected and Wrapped with ThemeProvider */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <ThemeProvider>
                  <AdminLayout />
                </ThemeProvider>
              </ProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="popups" element={<ManagePopups />} />
              <Route path="assessments" element={<ManageAssessments />} />
              <Route path="promo-codes" element={<ManagePromoCodes />} />
              <Route path="superadmin/admins" element={<ManageAdmins />} />
              <Route path="superadmin/audit-logs" element={<AuditLogs />} />
              <Route path="superadmin/transfer" element={<TransferSuperAdmin />} />
              <Route path="superadmin/password" element={<SuperAdminChangePassword />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Assessment Routes - wrapped in AssessmentProvider */}
            <Route path="/assessment-toolkit" element={<AssessmentProvider><AssessmentToolkit /></AssessmentProvider>} />
            <Route path="/assessment-toolkit/*" element={
              <AssessmentProvider>
                <Routes>
                  <Route path="start" element={<AssessmentStart />} />
                  <Route path="signup" element={<AssessmentSignUp />} />
                  <Route path="login" element={<AssessmentLogin />} />
                  <Route path="privacy" element={<AssessmentPrivacyPolicy />} />
                  <Route path="terms" element={<AssessmentTermsOfUse />} />
                  <Route path="resources" element={<AssessmentResources />} />
                  <Route path="solutions" element={<AssessmentSolutions />} />
                  <Route path="contact" element={<AssessmentContact />} />
                  <Route path="otp-verify" element={<AssessmentOtpVerify />} />
                  <Route path="check-email" element={<AssessmentCheckEmail />} />
                  <Route path="verify-email/:token" element={<AssessmentVerifyEmail />} />
                  <Route path="forgot-password" element={<AssessmentForgotPassword />} />
                  <Route path="verify-reset-otp" element={<AssessmentVerifyResetOtp />} />
                  <Route path="reset-password" element={<AssessmentResetPassword />} />
                  {/* Protected assessment routes */}
                  <Route path="form" element={<AssessmentGuard><AssessmentForm /></AssessmentGuard>} />
                  <Route path="report/:id" element={<AssessmentGuard><AssessmentReport /></AssessmentGuard>} />
                  <Route path="dashboard" element={<AssessmentGuard><AssessmentDashboard /></AssessmentGuard>} />
                </Routes>
              </AssessmentProvider>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
