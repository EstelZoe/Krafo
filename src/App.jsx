import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./assets/components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookieConsentBanner from "./pages/CookieConsentBanner";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";


const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const EventPage = lazy(() => import("./pages/EventPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const YouthCyberEd = lazy(() => import("./pages/YouthCyberEd"));
const Consultation = lazy(() => import("./pages/Consultation"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const CybersecuritySurvey = lazy(() => import("./pages/CybersecuritySurvey"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const LogIn = lazy(() => import("./pages/LogIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Overview = lazy(() => import("./pages/admin/Overview"));
const ManageEvents = lazy(() => import("./pages/admin/ManageEvents"));
const ManageBlogs = lazy(() => import("./pages/admin/ManageBlogs"));
const ManagePopups = lazy(() => import("./pages/admin/ManagePopups"));

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
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cybersecurity-survey" element={<CybersecuritySurvey />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            
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
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
