// import { useEffect, useState } from "react";

// export default function useBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch("http://your-backend.com/api/blogs"); // replace with your backend API
//         const data = await res.json();
//         setBlogs(data);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return { blogs, loading };
// }
