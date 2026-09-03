import { useRef } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
  FaTiktok,
  FaFacebook,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import krafoLogo from "../images/krafo-logo1.png";

const BRAND_FONT = {
  fontFamily: 'Proxon, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const EXPLORE_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/event-page", label: "Events" },
  { to: "/consultation", label: "Consultation" },
  { to: "/assessment-toolkit", label: "Assessment Toolkit" },
];

const TRUST_BADGES = ["CSA-Licensed", "DPC-Registered", "Est. 2022", "Based in Ghana"];

const SOCIALS = [
  { href: "https://www.linkedin.com/company/krafo-systems/posts/?feedView=all", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.instagram.com/krafosystems/?hl=en", label: "Instagram", Icon: FaInstagram },
  { href: "http://tiktok.com/@krafosystems3", label: "TikTok", Icon: FaTiktok },
  { href: "https://web.facebook.com/KrafoSystems/?_rdc=1&_rdr#", label: "Facebook", Icon: FaFacebook },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export default function Footer({ variant = "dark", termsLink, privacyLink }) {
  const spotlightRef = useRef(null);

  const variants = {
    light: {
      bg: "bg-gray-100", text: "text-gray-800", link: "text-gray-600 hover:text-orange-500",
      navLink: "text-gray-600 hover:text-orange-600", brandColor: "text-orange-600",
      border: "border-gray-300", accent: "text-orange-500",
      socialBg: "bg-gray-300 hover:bg-orange-500 text-gray-800 hover:text-white",
      chip: "border-gray-300 text-gray-700", cardBg: "bg-white/70 hover:bg-white",
      tile: "bg-orange-500/10", hairline: "via-orange-500/40", wordmark: "text-gray-900",
    },
    orange: {
      bg: "bg-orange-700", text: "text-white", link: "text-white hover:text-black",
      navLink: "text-white hover:text-black", brandColor: "text-black",
      border: "border-orange-400", accent: "text-black",
      socialBg: "bg-black hover:bg-white text-orange-500",
      chip: "border-black/30 text-black", cardBg: "bg-black/10 hover:bg-black/20",
      tile: "bg-black/20", hairline: "via-black/40", wordmark: "text-black",
    },
    dark: {
      bg: "bg-black", text: "text-white", link: "text-gray-400 hover:text-orange-500",
      navLink: "text-gray-400 hover:text-white", brandColor: "text-orange-600",
      border: "border-gray-800", accent: "text-orange-500",
      socialBg: "bg-white/5 hover:bg-orange-600 text-gray-300 hover:text-white",
      chip: "border-white/15 text-gray-300", cardBg: "bg-white/[0.03] hover:bg-white/[0.06]",
      tile: "bg-orange-500/10", hairline: "via-orange-500/60", wordmark: "text-white",
    },
  };

  const style = variants[variant];
  const isDark = variant === "dark";
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleMouseMove = (e) => {
    if (!isDark || !spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(242,96,11,0.10), transparent 60%)`;
  };

  const ContactRail = ({ Icon, label, value, href, to, external }) => {
    const inner = (
      <>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.tile}`}>
          <Icon className={`${style.accent} text-base`} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide opacity-60">{label}</p>
          <p className="text-sm font-medium truncate">{value}</p>
        </div>
        <ArrowUpRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" size={15} />
      </>
    );
    const cls = `group flex items-center gap-3 p-2.5 rounded-xl border ${style.border} ${style.cardBg} transition-all duration-300 hover:border-orange-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`;
    return to
      ? <Link to={to} className={cls}>{inner}</Link>
      : <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={cls}>{inner}</a>;
  };

  return (
    <footer aria-label="Site footer" onMouseMove={handleMouseMove} className={`${style.bg} ${style.text} relative overflow-hidden`}>
      {/* Cursor spotlight (dark only) */}
      {isDark && (
        <div ref={spotlightRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-200" />
      )}

      {/* KRAFO wordmark — sits BEHIND the top block, adds no height */}
      <span
        aria-hidden="true"
        className={`pointer-events-none select-none absolute z-0 left-1/2 -translate-x-1/2 top-6 font-bold leading-none tracking-tight whitespace-nowrap ${style.wordmark} opacity-[0.10]`}
        style={{ ...BRAND_FONT, fontSize: "clamp(4rem, 16vw, 13rem)" }}
      >
        KRAFO
      </span>

      {/* Top orange hairline */}
      <div className={`relative z-10 h-px w-full bg-gradient-to-r from-transparent ${style.hairline} to-transparent`} />

      {/* Top block — Brand · Explore · Get In Touch (maintained) */}
      <motion.div {...reveal} transition={{ duration: 0.5 }} className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-5">
            <Link to="/" className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black" aria-label="KRAFO Systems home">
              <img src={krafoLogo} alt="KRAFO Systems" className="h-9 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed opacity-90 max-w-xs">
              We build it, and we secure it — cybersecurity, software, and education for a sovereign digital future.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-70 mt-3">
              <FaMapMarkerAlt className={style.accent} />
              <span>Accra, Ghana</span>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${style.brandColor}`}>Explore</h3>
            <ul className="space-y-2.5" style={BRAND_FONT}>
              {EXPLORE_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={`${style.navLink} text-sm font-medium transition-all duration-200 hover:translate-x-1 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get In Touch */}
          <div className="col-span-2 lg:col-span-4">
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${style.brandColor}`}>Get In Touch</h3>
            <p className="text-[11px] opacity-60 mb-3">We usually reply within 24 hours.</p>
            <div className="space-y-2.5">
              <ContactRail Icon={FaWhatsapp} label="WhatsApp" value="(+233) 59-319-6002" href="https://wa.me/233593196002" external />
              <ContactRail Icon={FaEnvelope} label="Email" value="info@krafosystems.com" href="mailto:info@krafosystems.com" />
              <ContactRail Icon={CalendarClock} label="Consultation" value="Book a free call" to="/consultation" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar — trust badges + socials moved here, plus copyright + legal */}
      <div className={`relative z-10 border-t ${style.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          {/* Row 1: trust badges + socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TRUST_BADGES.map((badge) => (
                <span key={badge} className={`inline-flex items-center gap-1.5 rounded-full border ${style.chip} px-3 py-1 text-xs font-medium`}>
                  <FaShieldAlt className={`${style.accent} text-[10px]`} />
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`${style.socialBg} p-2.5 rounded-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`} aria-label={label}>
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Row 2: copyright + legal */}
          <div className={`mt-4 pt-4 border-t ${style.border} flex flex-col md:flex-row justify-between items-center gap-3`}>
            <p className="text-xs opacity-70">&copy; 2026 KRAFO SYSTEMS. All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs opacity-70">
              <Link to={privacyLink || "/privacy-policy"} className={`${style.link} hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`}>Privacy Policy</Link>
              <span className="opacity-30">|</span>
              <Link to={termsLink || "/terms-and-conditions"} className={`${style.link} hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`}>Terms of Service</Link>
              <button onClick={scrollToTop} className={`inline-flex items-center gap-1.5 ${style.link} hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black`} aria-label="Back to top">
                <FaArrowUp className="text-[10px]" /> Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
