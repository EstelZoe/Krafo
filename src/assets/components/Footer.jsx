import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaWhatsapp, FaTiktok, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer({ variant = "dark" }) {
  const variants = {
    light: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      link: "text-gray-600 hover:text-orange-500",
      navLink: "text-grey-600 hover:text-orange-800",
      brandColor: "text-orange-600",
      border: "border-gray-300",
      accent: "text-orange-500",
      socialBg: "bg-gray-300 hover:bg-orange-500 text-gray-800 hover:text-white",
    },
    orange: {
      bg: "bg-orange-700",
      text: "text-white",
      link: "text-white hover:text-black",
      navLink: "text-white hover:text-black",
      brandColor: "text-black",
      border: "border-orange-400 hover:border-black",
      accent: "text-black",
      socialBg: "bg-black hover:bg-white text-orange-500",
    },
    dark: {
      bg: "bg-black",
      text: "text-white",
      link: "text-gray-400 hover:text-orange-500",
      navLink: "text-white hover:text-orange-600",
      brandColor: "text-orange-600",
      border: "border-gray-700",
      accent: "text-orange-500",
      socialBg: "bg-orange-600 hover:bg-orange-500 text-white",
    },
  };

  const style = variants[variant];

  return (
    <footer className={`${style.bg} ${style.text} relative`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h2 
              className={`text-3xl font-bold ${style.brandColor} mb-6 tracking-tight`} 
              style={{ fontFamily: 'Proxon, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              KRAFO SYSTEMS
            </h2>
            <p className="text-sm leading-relaxed mb-8 opacity-90">
              Empowering the future with cybersecurity education and awareness.
            </p>
            
            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-4">Connect With Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://www.linkedin.com/company/krafo-systems/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${style.socialBg} p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-lg" />
                </a>
                <a 
                  href="https://www.instagram.com/krafosystems/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${style.socialBg} p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a 
                  href="http://tiktok.com/@krafosystems3" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${style.socialBg} p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  aria-label="TikTok"
                >
                  <FaTiktok className="text-lg" />
                </a>
                <a 
                  href="https://web.facebook.com/KrafoSystems/?_rdc=1&_rdr#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${style.socialBg} p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <nav className="lg:col-span-5" aria-label="Footer Navigation">
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 ${style.brandColor}`}>MENU</h3>
            <div 
              className="grid grid-cols-2 gap-x-8 gap-y-4" 
              style={{ fontFamily: 'Proxon, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              <Link 
                to="/" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                About
              </Link>
              <Link 
                to="/courses" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Courses
              </Link>
              <Link 
                to="/event-page" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Events
              </Link>
              <Link 
                to="/youth-cyber-ed" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Youth Cyber Ed
              </Link>
              <Link 
                to="/consultation" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Consultation
              </Link>
              <Link 
                to="/contact" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Contact Us
              </Link>
              <Link 
                to="/privacy-policy" 
                className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block`}
              >
                Privacy Policy
              </Link>
            </div>
          </nav>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-6 ${style.brandColor}`}>Get In Touch</h3>
            <div className="space-y-4">
              
              {/* WhatsApp */}
              <div className={`group flex items-start space-x-4 p-4 border ${style.border} transition-all duration-300 hover:border-opacity-60 hover:shadow-md`}>
                <FaWhatsapp className={`${style.accent} text-2xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">WhatsApp</p>
                  <a 
                    href="https://wa.me/233593196002" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:underline transition-all duration-200 block"
                  >
                    (+233) 59-319-6002
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className={`group flex items-start space-x-4 p-4 border ${style.border} transition-all duration-300 hover:border-opacity-60 hover:shadow-md`}>
                <FaEnvelope className={`${style.accent} text-2xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Email</p>
                  <a 
                    href="mailto:info@krafosystems.com"
                    className="text-sm hover:underline transition-all duration-200 block break-all"
                  >
                    info@krafosystems.com
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${style.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-80">
              &copy; 2025 KRAFO SYSTEMS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs opacity-70">
              <Link to="/privacy-policy" className={`${style.link} hover:opacity-100 transition-opacity duration-200`}>
                Privacy Policy
              </Link>
              <span className="opacity-30">|</span>
              <Link to="/terms" className={`${style.link} hover:opacity-100 transition-opacity duration-200`}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
