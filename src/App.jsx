import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";  
import EventPage from "./pages/EventPage";
import BlogPage from "./pages/BlogPage";
import YouthCyberEd from "./pages/YouthCyberEd";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Consultation from "./pages/Consultation";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  { path: "/event-page", element: <EventPage /> },
  { path: "/blog-page", element: <BlogPage /> },
  { path: "/youth-cyber-ed", element: <YouthCyberEd /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <LogIn /> },
  { path: "/consultation", element: <Consultation /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
