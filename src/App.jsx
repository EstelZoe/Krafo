import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./assets/components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const EventPage = lazy(() => import("./pages/EventPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const YouthCyberEd = lazy(() => import("./pages/YouthCyberEd"));
const Consultation = lazy(() => import("./pages/Consultation"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/event-page" element={<EventPage />} />
            <Route path="/blog-page" element={<BlogPage />} />
            <Route path="/youth-cyber-ed" element={<YouthCyberEd />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
