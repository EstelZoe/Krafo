// Footer.jsx
export default function Footer({ variant = "dark" }) {
  const bgClass = variant === "light" ? "bg-white text-black" : variant === "orange" ? "bg-orange-600 text-white" : "bg-black text-white";

  return (
    <footer className={`${bgClass} py-8 px-4`}>
      <div className="text-center">
        <p>&copy; 2025 KRAFO. All rights reserved.</p>
      </div>
    </footer>
  );
}
