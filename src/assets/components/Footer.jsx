import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope,FaWhatsapp } from "react-icons/fa";

export default function Footer({ variant = "dark" }) {
  const variants = {
    light: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      link: "text-gray-600 hover:text-orange-500",
      border: "border-gray-300",
      accent: "text-orange-500",
      socialBg: "bg-gray-300 hover:bg-orange-500 text-gray-800",
    },
    orange: {
      bg: "bg-orange-700",
      text: "text-white",
      link: "text-white hover:text-black",
      border: "border-orange-400 hover:border-black",
      accent: "text-black",
      socialBg: "bg-black hover:bg-white text-orange-500",
    },
    dark: {
      bg: "bg-black",
      text: "text-white",
      link: "text-gray-400 hover:text-orange-500",
      border: "border-gray-700",
      accent: "text-orange-500",
      socialBg: "bg-orange-600 hover:bg-orange-500 text-white",
    },
  };

  const style = variants[variant];

  return (
    <footer className={`${style.bg} ${style.text} py-12 px-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Section - Logo + About */}
        <div>
          <h2 className={`text-2xl font-bold ${style.accent}`}>KRAFO</h2>
          <p className="mt-4 text-sm">
            Empowering the future with cybersecurity education and awareness.
          </p>
          <div className="flex space-x-3 mt-6">
            <a href="#" className={`${style.socialBg} p-2 rounded-sm`}>
              <FaFacebookF />
            </a>
            <a href="#" className={`${style.socialBg} p-2 rounded-sm`}>
              <FaTwitter />
            </a>
            <a href="#" className={`${style.socialBg} p-2 rounded-sm`}>
              <FaInstagram />
            </a>
            <a href="#" className={`${style.socialBg} p-2 rounded-sm`}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Menu */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <div className="flex flex-wrap gap-6">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Blog Post</a>
            <a href="#">Services</a>
            {/* <a href="#">Services Single</a> */}
            {/* <a href="#">Shop</a> */}
            {/* <a href="#">Shop Single</a> */}
            {/* <a href="#">Projects</a> */}
            {/* <a href="#">Projects Single</a> */}
            <a href="#">Contact</a>
          </div>
        </div>

        {/* Utility Pages */}
        {/* <div>
          <h3 className="font-bold mb-4">Utility Pages</h3>
          <ul className="space-y-2">
            <li><a href="#" className={style.link}>Start Here</a></li>
            <li><a href="#" className={style.link}>Password Protected</a></li>
            <li><a href="#" className={style.link}>404 Not Found</a></li>
            <li><a href="#" className={style.link}>Licenses</a></li>
            <li><a href="#" className={style.link}>Styleguide</a></li>
            <li><a href="#" className={style.link}>Changelog</a></li>
          </ul>
        </div> */}

        {/* Contact Us */}
        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <div className={`flex items-center space-x-4 p-2 mb-2 border  ${style.border}`}>
            <FaWhatsapp className={`${style.accent} text-xl`} />
            <div>
              <p className="font-semibold">Send Us A Message</p>
              <p className="text-sm">(+233) 123-456-789</p>
            </div>
          </div>
          <div className={`flex items-center space-x-2 p-2 border ${style.border}`}>
            <FaEnvelope className={`${style.accent} text-xl`} />
            <div>
              <p className="font-semibold">Email us</p>
              <p className="text-sm">info@krafo.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={`mt-10 pt-6 text-center text-sm border-t ${style.border}`}>
        <p>&copy; 2025 KRAFO. All rights reserved.</p>
      </div>
    </footer>
  );
}
