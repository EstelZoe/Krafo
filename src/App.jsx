import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";  
import EventPage from "./pages/EventPage";
import BlogPage from "./pages/BlogPage";
import YouthCyberEd from "./pages/YouthCyberEd";
import Consultation from "./pages/Consultation";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </>
  );
}

export default App;
