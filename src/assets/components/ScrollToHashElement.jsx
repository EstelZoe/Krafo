// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function ScrollToHashElement() {
//   const { pathname, hash } = useLocation();

//   useEffect(() => {
//     if (hash) {
//       // delay ensures DOM has rendered
//       setTimeout(() => {
//         const element = document.querySelector(hash);
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 100);
//     }
//   }, [pathname, hash]);

//   return null;
// }
