import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    CalendarClock,
    Shield,
    ShieldCheck,
    Users,
    Lock,
    Award,
    Star,
    Sparkles,
    PhoneCall,
    Search,
    ClipboardCheck,
    Map as MapIcon,
    Mail,
    Database,
    Globe,
    RefreshCw,
    FileCheck,
    Code,
} from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { EXPERTISE } from "./expertiseData";

// ── Assets ───────────────────────────────────────────────────────────
import bridge from "../assets/images/40128.jpg";
import studyGroup from "../assets/images/studygroup2.jpg";

import certCEH from "../assets/images/CEH.png";
import certSecurityPlus from "../assets/images/Comptia Security+.png";
import certNetworkPlus from "../assets/images/Comptia Network+.png";
import certAPlus from "../assets/images/Comptia A+.png";
import certCSIS from "../assets/images/Comptia CSIS.png";
import certCIOS from "../assets/images/Comptia CIOS.png";
import bridgeVideo from "../assets/videos/software development.mp4";

// Risk-area background images
import riskPeople from "../assets/images/hackmind.jpeg";
import riskData from "../assets/images/data2.jpg";
import riskWeb from "../assets/images/penetration testing image.jpg";
import riskContinuity from "../assets/images/Incident Response & Recovery.jpg";
import riskCompliance from "../assets/images/policy management.jpg";

const CALENDLY_URL = "https://calendly.com/krafosystems";

const certifications = [
    {
        src: certCEH,
        alt: "Certified Ethical Hacker (CEH)",
        desc: "A skilled professional who understands how to find weaknesses and vulnerabilities in target systems, using the same knowledge and tools as a malicious hacker — but lawfully, to assess an organisation's security posture.",
    },
    {
        src: certSecurityPlus,
        alt: "CompTIA Security+",
        desc: "Security+ practitioners know how to identify and address potential threats, attacks, and vulnerabilities, with advanced techniques in risk management, risk mitigation, threat management, and intrusion detection.",
    },
    {
        src: certNetworkPlus,
        alt: "CompTIA Network+",
        desc: "Network+ holders can design and implement functional networks; configure, manage, and maintain essential network devices; implement network security; and troubleshoot network problems.",
    },
    {
        src: certAPlus,
        alt: "CompTIA A+",
        desc: "A+ recipients perform critical IT support tasks — device configuration, data backup and recovery, and OS setup — with baseline security skills to detect and remove malware, address privacy concerns, and resolve core service issues.",
    },
    {
        src: certCSIS,
        alt: "Secure Infrastructure Specialist (CSIS)",
        desc: "Secure Infrastructure Specialists have the knowledge and skill to support hardware and software systems, and to protect an organisation's assets from internal and external threats.",
    },
    {
        src: certCIOS,
        alt: "IT Operations Specialist (CIOS)",
        desc: "IT Operations Specialists manage the flow of a workplace and optimise day-to-day activities, with the ability to analyse business operations and identify customer needs.",
    },
];

const testimonials = [
    {
        name: "Diana D. Osei",
        role: "",
        quote: "This course has been very useful to my career development as a young African technology professional. It has taught me that Africans need to be cybersecurity aware because there's strength in each one of us knowing how to defend ourselves online, instead of working independently to mitigate cyber risks. I've gained very practical skills in protecting data and assets, for myself and for others. Thank you, Krafo Systems.",
        avatar: "DO",
    },
    {
        name: "Godswill Akuffo",
        role: "",
        quote: "I'll say Krafo System is a perfect institution for both beginners and advanced learners. Joining and taking the Krafo Cybersecurity Capacity Building Course has been one of the best decisions I have ever made. I love that I get to accumulate more knowledge from experienced facilitators. I'll definitely recommend Krafo as a solid choice for those looking to enter or advance in the cybersecurity field.",
        avatar: "GA",
    },
    {
        name: "Raphael Kwadzo Awazi",
        role: "",
        quote: "So far so good. I am okay with the class — the facilitators Mr Elikem Komla and Miss Fafali Mamagah are excellent and very supportive.",
        avatar: "RA",
    },
];

const faqs = [
    {
        question: "How quickly can we start after requesting consultation?",
        answer: "We typically schedule within 24–48 hours of receiving your request. For urgent security matters, we offer expedited scheduling with same-day availability.",
    },
    {
        question: "What information do I need to prepare for the consultation?",
        answer: "We recommend having information about your current security tools, recent security incidents, compliance requirements, and business objectives. If you're not sure, our experts will guide you through the process during the session.",
    },
    {
        question: "Can you help implement your recommendations?",
        answer: "Yes, we offer implementation support ranging from guidance to fully managed execution, depending on your needs and resources. Our team can work alongside your internal staff or handle the entire implementation.",
    },
    {
        question: "What industries do you specialize in?",
        answer: "We have deep experience across financial services, healthcare, government, e-commerce, and critical infrastructure sectors, with frameworks tailored to each industry's unique risk profile and regulatory requirements.",
    },
];

// ── Decorative SVG Components ──────────────────────────────────────
const BridgeCable = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 200 C100 80 300 20 600 40 C900 60 1100 120 1200 180"
            stroke="url(#cableGrad)"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            opacity="0.3"
        />
        <path
            d="M0 180 C150 60 350 10 600 30 C850 50 1050 110 1200 170"
            stroke="url(#cableGrad2)"
            strokeWidth="1"
            strokeDasharray="4 16"
            opacity="0.2"
        />
        <defs>
            <linearGradient id="cableGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F2600B" />
                <stop offset="50%" stopColor="#ff8534" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F2600B" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="cableGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B75D3A" />
                <stop offset="50%" stopColor="#ff8534" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#B75D3A" stopOpacity="0.1" />
            </linearGradient>
        </defs>
    </svg>
);

const StructuralGrid = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F2600B" strokeOpacity="0.04" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill="#F2600B" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
);

// ── Testimonial as a phone mockup (reused by desktop grid + mobile) ─
const TestimonialCard = ({ t, className = "" }) => (
    <div className={`group relative mx-auto w-full max-w-[300px] transition-transform duration-500 ${className}`}>
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -inset-3 rounded-[3rem] bg-[#F2600B]/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Phone bezel */}
        <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] p-2.5 shadow-2xl shadow-black/60">
            {/* Notch */}
            <div className="absolute left-1/2 top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-black" />

            {/* Screen */}
            <div className="relative flex min-h-[430px] flex-col overflow-hidden rounded-[2rem] bg-[#0c0705]">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[10px] font-medium text-gray-400">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                        <span className="h-2 w-2.5 rounded-sm bg-gray-500" />
                        <span className="h-2 w-2.5 rounded-sm bg-gray-500" />
                        <span className="h-2 w-4 rounded-[3px] border border-gray-500" />
                    </div>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2600B]/15 border border-[#F2600B]/30 text-xs font-bold text-[#F2600B]">
                        {t.avatar}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1">
                            <h4 className="hero-display truncate text-sm font-semibold text-white">{t.name}</h4>
                            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#F2600B] text-[8px] text-white">✓</span>
                        </div>
                        <p className="flex items-center gap-1 text-[10px] text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> online
                        </p>
                    </div>
                </div>

                {/* Body — quote as an incoming chat bubble */}
                <div className="flex-1 space-y-3 px-4 py-5">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-[#F2600B] text-[#F2600B]" />
                        ))}
                    </div>
                    <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-[#F2600B]/20 bg-[#F2600B]/10 p-3.5 text-[13px] leading-relaxed text-gray-100">
                        &ldquo;{t.quote}&rdquo;
                    </div>
                    <span className="block pl-1 text-[10px] text-gray-500">Delivered · just now</span>
                </div>

                {/* Input mock */}
                <div className="border-t border-white/5 px-3 py-3">
                    <div className="flex items-center justify-between rounded-full bg-white/5 px-4 py-2 text-[11px] text-gray-500">
                        Message…
                        <span className="text-[#F2600B]">➤</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ── Shared section eyebrow (matches the About page system) ─────────
const SectionEyebrow = ({ label }) => (
    <>
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">{label}</span>
    </>
);

// ── Common risks we solve — interactive switcher (About-style) ─────
const RISK_AREAS = [
    {
        key: "people",
        Icon: Mail,
        image: riskPeople,
        label: "Phishing & People",
        headline: "Your people are the front line",
        text: "Most breaches start with a convincing email, not a clever hack. We train your team to spot and stop social engineering before it lands.",
        help: ["Phishing simulations & coaching", "Security-awareness training", "Clear reporting playbooks"],
    },
    {
        key: "data",
        Icon: Database,
        image: riskData,
        label: "Data & Privacy",
        headline: "Protect what you can't afford to lose",
        text: "Customer records, financials, IP — we help you know where sensitive data lives, who can touch it, and how it's protected under Ghana's Data Protection Act.",
        help: ["Data mapping & access reviews", "Encryption & backup strategy", "DPC-aligned privacy practices"],
    },
    {
        key: "web",
        Icon: Globe,
        image: riskWeb,
        label: "Web & App Security",
        headline: "Ship without leaving the door open",
        text: "Your website and apps are your storefront and your attack surface. We assess and harden them against the common exploits that take businesses down.",
        help: ["Vulnerability assessments", "Secure configuration & hardening", "Ongoing monitoring"],
    },
    {
        key: "continuity",
        Icon: RefreshCw,
        image: riskContinuity,
        label: "Business Continuity",
        headline: "Bounce back, fast",
        text: "It's not if, but when. We help you prepare so an incident is a bad day — not the end of the business — with tested backups and a response plan.",
        help: ["Incident response planning", "Tested backup & recovery", "Tabletop exercises"],
    },
    {
        key: "compliance",
        Icon: FileCheck,
        image: riskCompliance,
        label: "Compliance",
        headline: "Meet the bar with confidence",
        text: "Regulatory and client security requirements don't have to be a scramble. We translate the requirements into a practical, prioritised plan.",
        help: ["Gap assessments", "Policy & control development", "Audit readiness"],
    },
];

function RiskSwitcher() {
    const [active, setActive] = useState(0);
    const a = RISK_AREAS[active];
    return (
        <div>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
                {RISK_AREAS.map((r, i) => {
                    const TabIcon = r.Icon;
                    return (
                        <button
                            key={r.key}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                i === active
                                    ? "bg-[#F2600B] text-white shadow-[0_0_20px_rgba(242,96,11,0.4)]"
                                    : "border border-white/15 text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
                            }`}
                        >
                            <TabIcon size={15} /> {r.label}
                        </button>
                    );
                })}
            </div>

            <motion.div
                key={a.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-[#F2600B]/20"
            >
                {/* Background image */}
                <img
                    src={a.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/65" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                />

                {/* Glass content */}
                <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-8 md:p-10">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                            <a.Icon size={24} />
                        </span>
                        <h3 className="hero-display mt-4 text-2xl font-bold text-white md:text-3xl">{a.headline}</h3>
                        <p className="mt-3 leading-relaxed text-gray-100">{a.text}</p>
                    </div>
                    <ul className="space-y-3 self-center rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        {a.help.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-gray-100">
                                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#F2600B]" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────
export default function Consultation() {
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden selection:bg-[#F2600B]/40 selection:text-white">
            {/* ── Custom Font & Global Styles ──────────────────────── */}
            <style>{`
                /* Brand font "Proxon" is loaded globally via index.css (@font-face). */
                
                :root {
                    --amber: #F2600B;
                    --amber-glow: rgba(242, 96, 11, 0.15);
                    --copper: #B75D3A;
                    --charcoal: #000000;
                    --warm-black: #000000;
                }
                
                /* Hero headline uses the Krafo brand face (same as the navbar). */
                .hero-display {
                    font-family: 'Proxon', sans-serif;
                }
                
                /* Scrollbar left at the site default (no global override). */

                .glow-text {
                    text-shadow: 0 0 80px rgba(242, 96, 11, 0.15), 0 0 160px rgba(242, 96, 11, 0.05);
                }

                .bridge-glow {
                    box-shadow: 0 0 60px rgba(242, 96, 11, 0.06), inset 0 0 60px rgba(242, 96, 11, 0.02);
                }

                .card-architect {
                    box-shadow: 
                        0 4px 24px rgba(0,0,0,0.6),
                        0 0 0 1px rgba(242, 96, 11, 0.06),
                        inset 0 1px 0 rgba(242, 96, 11, 0.04);
                }

                .glass-card {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    background: rgba(10, 10, 10, 0.6);
                    border: 1px solid rgba(242, 96, 11, 0.08);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242, 96, 11, 0.06);
                }

                .text-balance {
                    text-wrap: balance;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(0.5deg); }
                }
                .float-slow {
                    animation: float 6s ease-in-out infinite;
                }
                .float-medium {
                    animation: float 8s ease-in-out infinite;
                }
                .float-fast {
                    animation: float 4s ease-in-out infinite;
                }

                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                .pulse-ring {
                    animation: pulse-ring 3s ease-out infinite;
                }

                .truss-line {
                    stroke-dasharray: 8 12;
                    animation: trussMove 20s linear infinite;
                }
                @keyframes trussMove {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -40; }
                }


                .cert-tilt {
                    transform: perspective(800px) rotateY(var(--tilt, 0deg)) rotateX(2deg);
                    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .cert-tilt:hover {
                    --tilt: 4deg;
                    transform: perspective(800px) rotateY(var(--tilt, 0deg)) rotateX(2deg) translateY(-4px);
                }
            `}</style>

            <Navbar />

            {/* ════════════════════════════════════════════════════════
               HERO — The Bridge
            ════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative w-full min-h-[92vh] md:min-h-[100vh] overflow-hidden isolate"
            >
                {/* Background with parallax */}
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                >
                    <img
                        src={bridge}
                        alt="A bridge at dusk connecting two worlds"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/60 to-[#000000]/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B15,transparent_60%)]" />
                </motion.div>

                {/* Structural grid overlay */}
                <StructuralGrid />

                {/* Bridge cable decorations */}
                <BridgeCable className="absolute bottom-[30%] left-0 w-full h-32 opacity-60" />

                {/* Glow orbs */}
                <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-[#F2600B]/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-[#F2600B]/3 blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center min-h-[92vh] md:min-h-[100vh]">
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Main headline with architectural feel */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#F2600B] opacity-40" />
                            <h1 className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight glow-text">
                                The Bridge
                                <br />
                                <span className="text-[#F2600B] relative">
                                    Between Business
                                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#F2600B]/30" />
                                </span>
                                <br />
                                <span className="text-white/90">and Cyber Resilience</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed mt-6 text-balance"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Expert cybersecurity consultation for organisations that can't afford
                            to gamble with their data. We help you cross safely from risk to
                            resilience — with precision, clarity, and human-centred expertise.
                        </motion.p>

                        <motion.div
                            className="mt-8 flex flex-wrap items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <a
                                href={CALENDLY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 hover:shadow-[#F2600B]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95"
                            >
                                Book a Consultation
                                <CalendarClock size={18} className="group-hover:rotate-6 transition-transform" />
                            </a>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
                                    Available now
                                </span>
                            </div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="flex items-center gap-1.5">
                                <Award size={14} className="text-[#F2600B]" />
                                CSA Licensed
                            </span>
                            <span className="w-px h-4 bg-gray-800" />
                            <span className="flex items-center gap-1.5">
                                <Shield size={14} className="text-[#F2600B]" />
                                DPC Registered
                            </span>
                            <span className="w-px h-4 bg-gray-800" />
                            <span className="flex items-center gap-1.5">
                                <Globe size={14} className="text-[#F2600B]" />
                                Based in Ghana
                            </span>
                            <span className="w-px h-4 bg-gray-800" />
                            <span className="flex items-center gap-1.5">
                                <CalendarClock size={14} className="text-[#F2600B]" />
                                Est. 2022
                            </span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator — architectural */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">
                        Scroll
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#F2600B]/60 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2600B]/40 animate-bounce" />
                </motion.div>
            </section>

            {/* ════════════════════════════════════════════════════════
               INTRO — The Manifesto
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-6 md:py-10 overflow-hidden border-t border-[#F2600B]/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F2600B08,transparent_70%)]" />
                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <motion.div
                        className="w-16 h-[2px] bg-[#F2600B]/40 mx-auto mb-4 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-balance">
                            <span className="text-white font-semibold">Krafo Systems</span> is a
                            licensed Cybersecurity Service Provider with Ghana's Cyber Security
                            Authority and registered with the Data Protection Commission.
                            <br className="hidden md:block" />
                            We deliver <span className="text-[#F2600B] font-medium">practical, human‑centred</span> security —
                            tailored to SMEs and institutions across the West African region.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex justify-center gap-8 mt-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {["Licensed", "Certified", "Trusted"].map((label, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F2600B]" />
                                {label}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               CERTIFICATIONS — Accreditation carousel
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-16 md:py-20 bg-black border-y border-[#F2600B]/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F2600B08,transparent_70%)]" />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Credentials" />
                        <h2 className="hero-display mt-3 text-3xl md:text-4xl font-extrabold">
                            Certifications &amp; <span className="text-[#F2600B]">Accreditations</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto mt-3 text-balance">
                            Credentials that back our expertise and validate our approach.
                        </p>
                    </motion.div>
                </div>

                {/* Seamless auto-scrolling marquee (duplicated list for a smooth loop). */}
                <div className="group relative w-full">
                    <div className="flex w-max animate-cert-scroll group-hover:[animation-play-state:paused]">
                        {[...certifications, ...certifications].map((cert, i) => (
                            <div key={i} className="mx-4 shrink-0 py-2">
                                <div className="group/cert relative">
                                    {/* Info tooltip — frosted glass bubble above the badge on hover */}
                                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 rounded-xl border border-white/15 bg-black/40 backdrop-blur-xl p-4 text-left opacity-0 translate-y-2 transition-all duration-300 group-hover/cert:opacity-100 group-hover/cert:translate-y-0 shadow-2xl shadow-black/60 z-30">
                                        <p className="text-[#ff8534] text-sm font-semibold mb-1.5">{cert.alt}</p>
                                        <p className="text-gray-200 text-xs leading-relaxed">{cert.desc}</p>
                                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10" />
                                    </div>

                                    {/* Badge tile — frosted glass, scales up on hover */}
                                    <div className="w-52 h-40 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center p-5 transition-all duration-300 group-hover/cert:scale-110 group-hover/cert:border-[#F2600B]/60 group-hover/cert:bg-white/15 group-hover/cert:shadow-[#F2600B]/20">
                                        <img
                                            src={cert.src}
                                            alt={cert.alt}
                                            title={cert.alt}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                    @keyframes cert-scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    .animate-cert-scroll {
                        animation: cert-scroll 30s linear infinite;
                    }
                `}</style>
            </section>

            {/* ════════════════════════════════════════════════════════
               EXPERTISE — Structural Grid
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 bg-gradient-to-b from-black via-black to-[#160b02] overflow-hidden">
                <StructuralGrid />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Our Practice" />
                        <h2 className="hero-display mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
                            Architectural <span className="text-[#F2600B]">Expertise</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-balance">
                            Explore the pillars of our security practice — each one a structural
                            component of your cyber resilience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                        {EXPERTISE.map((item, i) => {
                            const Icon = item.Icon;
                            return (
                                <motion.div
                                    key={item.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.04 }}
                                >
                                    <Link
                                        to={`/expertise#${item.slug}`}
                                        className="group relative block h-full card-architect rounded-2xl p-5 md:p-6 overflow-hidden bg-[#111111] border border-[#F2600B]/10 hover:border-[#F2600B]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F2600B]/5"
                                    >
                                        {/* Dimmed background image */}
                                        <img
                                            src={item.image}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-colors duration-500" />

                                        {/* Structural accent bar */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#F2600B]/0 group-hover:bg-[#F2600B]/60 transition-colors duration-500 z-10" />

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="relative mb-4">
                                                <div className="w-14 h-14 rounded-xl bg-[#F2600B]/10 border border-[#F2600B]/20 flex items-center justify-center group-hover:bg-[#F2600B]/20 group-hover:border-[#F2600B]/40 transition-all duration-300">
                                                    <Icon className="text-[#F2600B]" size={24} />
                                                </div>
                                                <div className="absolute -inset-1 rounded-xl bg-[#F2600B]/0 group-hover:bg-[#F2600B]/5 blur-xl transition-all duration-500" />
                                            </div>
                                            <h3 className="hero-display text-sm md:text-base font-semibold text-white leading-tight group-hover:text-[#F2600B] transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="mt-2 text-[10px] font-medium text-[#F2600B]/40 uppercase tracking-wider group-hover:text-[#F2600B]/70 transition-colors">
                                                →
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/expertise"
                            className="inline-flex items-center gap-2 border border-[#F2600B]/30 hover:border-[#F2600B] hover:bg-[#F2600B]/10 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 group"
                        >
                            Explore Full Expertise
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               RISK AREAS — Interactive switcher
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B08,transparent_60%)]" />
                <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Where We Help" />
                        <h2 className="hero-display mt-3 text-3xl md:text-4xl font-extrabold">
                            Common risks we <span className="text-[#F2600B]">solve</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-balance">
                            Pick the area that keeps you up at night and see exactly how we help.
                        </p>
                    </motion.div>
                    <RiskSwitcher />
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               STRATEGY — Split Architectural
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#F2600B08,transparent_60%)]" />

                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left — Image with architectural overlay */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-[#F2600B]/10 card-architect">
                                <img
                                    src={studyGroup}
                                    alt="Krafo team collaborating"
                                    className="w-full h-[420px] object-cover"
                                />
                                {/* Overlay with structural lines */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />
                                <div className="absolute inset-0">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="grid-strategy" width="30" height="30" patternUnits="userSpaceOnUse">
                                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F2600B" strokeOpacity="0.06" strokeWidth="0.5" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#grid-strategy)" />
                                    </svg>
                                </div>
                                {/* Corner accent */}
                                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#F2600B]/20" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#F2600B]/20" />
                            </div>
                        </motion.div>

                        {/* Right — Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
                            <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
                                Strategy
                            </span>
                            <h2 className="hero-display mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                Building Cyber Resilience Through{" "}
                                <span className="text-[#F2600B] relative">
                                    Strategic Partnership
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F2600B]/30" />
                                </span>
                            </h2>

                            <p className="text-gray-400 mt-4 text-balance leading-relaxed">
                                We don't just identify vulnerabilities — we help you build a comprehensive
                                security strategy aligned with your business objectives and risk tolerance.
                                Every recommendation is grounded in your unique operational reality.
                            </p>

                            <div className="mt-6 space-y-3">
                                {[
                                    ["Threat-Centric Methodology", "Focused on your specific adversary landscape"],
                                    ["Business-Aligned Security", "Solutions that support your operational goals"],
                                    ["Measurable Outcomes", "Clear metrics to track security ROI"],
                                ].map(([title, desc], idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#F2600B]/5 hover:border-[#F2600B]/20 transition-all"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.08 }}
                                    >
                                        <span className="w-5 h-5 rounded-full border border-[#F2600B]/30 flex items-center justify-center text-[#F2600B] text-xs font-bold flex-shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <span className="text-white font-medium">{title}</span>
                                            <span className="text-gray-400 text-sm block">{desc}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <a
                                    href={CALENDLY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 bg-[#F2600B] hover:bg-[#d94f00] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#F2600B]/20 hover:shadow-[#F2600B]/40"
                                >
                                    Schedule Strategy Session
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               PROCESS — How a consultation works
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-[#0a0a0a] border-y border-[#F2600B]/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,#F2600B08,transparent_60%)]" />
                <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="What To Expect" />
                        <h2 className="hero-display mt-3 text-3xl md:text-4xl font-extrabold">
                            How a consultation <span className="text-[#F2600B]">works</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-balance">
                            No jargon, no pressure — just a clear path from first call to a plan you can act on.
                        </p>
                    </motion.div>

                    <div className="relative grid gap-6 md:grid-cols-4">
                        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#F2600B]/40 to-transparent md:block" />
                        {[
                            { Icon: CalendarClock, step: "01", title: "Book", text: "Grab a free slot that suits you. It takes under a minute and there's no commitment." },
                            { Icon: PhoneCall, step: "02", title: "Discovery Call", text: "We listen — your setup, your worries, your goals. You do most of the talking." },
                            { Icon: Search, step: "03", title: "Findings & Quick Wins", text: "We surface your biggest risks in plain language, plus fixes you can act on right away." },
                            { Icon: MapIcon, step: "04", title: "Your Roadmap", text: "A prioritised plan for what to tackle next — and how we can help if you'd like us to." },
                        ].map((s, i) => {
                            const StepIcon = s.Icon;
                            return (
                                <motion.div
                                    key={s.step}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group relative"
                                >
                                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F2600B]/40 bg-[#0c0705] text-[#F2600B] shadow-[0_0_18px_rgba(242,96,11,0.4)] ring-4 ring-[#0a0a0a] transition-transform duration-300 group-hover:scale-110">
                                        <StepIcon size={24} />
                                    </span>
                                    <span className="hero-display mt-5 block text-xs font-bold tracking-widest text-[#ff8534]">
                                        {s.step}
                                    </span>
                                    <h3 className="hero-display mt-1 text-xl font-bold text-white">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               TESTIMONIALS — Illuminated Cards
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#F2600B08,transparent_60%)]" />

                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Proof" />
                        <h2 className="hero-display mt-3 text-3xl md:text-4xl font-extrabold">
                            What Our <span className="text-[#F2600B]">Clients Say</span>
                        </h2>
                    </motion.div>

                    {/* Desktop grid — staggered phones */}
                    <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8 items-center">
                        {testimonials.map((t, idx) => {
                            const tilt = idx === 0 ? "md:-rotate-3 md:translate-y-4" : idx === 2 ? "md:rotate-3 md:translate-y-4" : "md:-translate-y-2";
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                >
                                    <TestimonialCard t={t} className={`${tilt} hover:rotate-0 hover:translate-y-0`} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile carousel — one card, driven by the dots (auto-rotates) */}
                    <div className="md:hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.35 }}
                            >
                                <TestimonialCard t={testimonials[activeTestimonial]} />
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Show testimonial ${i + 1}`}
                                    onClick={() => setActiveTestimonial(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeTestimonial === i ? "bg-[#F2600B] w-6" : "bg-[#F2600B]/30 w-2"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               FAQ — Mechanical Accordion
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 bg-[#111111] border-t border-[#F2600B]/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#F2600B08,transparent_60%)]" />

                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Questions" />
                        <h2 className="hero-display mt-3 text-3xl md:text-4xl font-extrabold">
                            Consultation <span className="text-[#F2600B]">FAQs</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                className="group card-architect rounded-xl overflow-hidden border border-[#F2600B]/5 hover:border-[#F2600B]/15 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                            >
                                <button
                                    className="flex justify-between items-center w-full p-5 md:p-6 text-left bg-[#111111] hover:bg-[#1a1a1a] transition-colors"
                                    onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                                    aria-expanded={expandedIndex === idx}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-[#F2600B] opacity-40">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-base md:text-lg font-medium text-white group-hover:text-[#F2600B] transition-colors">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`h-5 w-5 text-[#F2600B] transition-all duration-500 shrink-0 ${
                                            expandedIndex === idx ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {expandedIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-6 pb-6 pt-2 border-t border-[#F2600B]/5">
                                                <div className="pl-8 md:pl-12">
                                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                    <div className="mt-3 w-12 h-[2px] bg-[#F2600B]/20 rounded-full" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               FINAL CTA — Bridge to Action
            ════════════════════════════════════════════════════════ */}
            {/* ════════════════════════════════════════════════════════
               BRIDGE — We build it too
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-16 md:py-20 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <motion.div
                        className="relative overflow-hidden rounded-2xl border border-[#F2600B]/20 p-8 md:p-12"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Background video */}
                        <video
                            className="absolute inset-0 h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={bridgeVideo} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/70" />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
                        />

                        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-xl rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                                <div className="mb-4 flex gap-2">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]"><Code size={18} /></span>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]"><ShieldCheck size={18} /></span>
                                </div>
                                <h2 className="hero-display text-2xl md:text-3xl font-extrabold text-white">
                                    We don&apos;t just secure software — <span className="text-[#F2600B]">we build it too.</span>
                                </h2>
                                <p className="mt-3 text-gray-100 text-balance">
                                    Websites, web apps and SaaS platforms — designed with security baked in from
                                    day one. One partner for building and protecting what grows your business.
                                </p>
                            </div>
                            <Link
                                to="/services"
                                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/20"
                            >
                                Explore our services
                                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════
               FINAL CTA — Bridge to Action
            ════════════════════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F2600B10,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,#F2600B06,transparent_50%)]" />

                <div className="max-w-6xl mx-auto px-6 relative">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >

                        <h2 className="hero-display text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Not sure where to{" "}
                            <span className="text-[#F2600B] relative">
                                start?
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F2600B]/30" />
                            </span>
                        </h2>

                        <p className="text-gray-400 mt-4 max-w-xl mx-auto lg:mx-0 text-balance text-base md:text-lg">
                            Book a free consultation and we'll help you identify your biggest risks
                            and the fastest wins — no jargon, no pressure. Just clarity.
                        </p>

                        <motion.div
                            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <a
                                href={CALENDLY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 hover:shadow-[#F2600B]/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                                Schedule Your Session
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <Link
                                to="/expertise"
                                className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-[#F2600B]/60 text-white font-medium py-3.5 px-8 rounded-full shadow-lg shadow-black/20 transition-all duration-300 group"
                            >
                                Explore Expertise
                                <Sparkles size={16} className="text-[#F2600B] group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Trust badge */}
                        <motion.div
                            className="mt-10 flex justify-center lg:justify-start items-center gap-6 text-xs text-gray-500"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="flex items-center gap-1.5">
                                <Lock size={12} className="text-[#F2600B]" />
                                Confidential
                            </span>
                            <span className="w-px h-3 bg-gray-800" />
                            <span className="flex items-center gap-1.5">
                                <Shield size={12} className="text-[#F2600B]" />
                                No obligation
                            </span>
                            <span className="w-px h-3 bg-gray-800" />
                            <span className="flex items-center gap-1.5">
                                <Users size={12} className="text-[#F2600B]" />
                                Human‑centred
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Creative image column */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#F2600B]/10 blur-3xl" />
                        <div className="relative overflow-hidden rounded-2xl border border-[#F2600B]/15 card-architect">
                            <img
                                src={studyGroup}
                                alt="A Krafo consultation session"
                                className="h-[300px] w-full object-cover sm:h-[380px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            {/* Structural grid overlay */}
                            <div className="absolute inset-0">
                                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                    <pattern id="grid-cta" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F2600B" strokeOpacity="0.06" strokeWidth="0.5" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid-cta)" />
                                </svg>
                            </div>
                            {/* Corner accents */}
                            <div className="absolute top-4 right-4 h-12 w-12 border-t-2 border-r-2 border-[#F2600B]/30" />
                            <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-[#F2600B]/30" />

                            {/* Live availability chip */}
                            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Available now
                            </div>

                            {/* Floating caption card */}
                            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <CalendarClock size={16} className="text-[#F2600B]" />
                                    <p className="hero-display text-sm font-semibold text-white">Free 30-minute consultation</p>
                                </div>
                                <p className="mt-1 text-xs text-gray-300">Talk to a real expert — no bots, no pressure.</p>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* ── Floating Booking Button ──────────────────────────── */}
            <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a consultation"
                className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#F2600B] hover:bg-[#d94f00] text-white p-3.5 rounded-full shadow-2xl shadow-[#F2600B]/30 hover:shadow-[#F2600B]/50 transition-all duration-300 hover:scale-105"
            >
                <CalendarClock size={20} className="group-hover:rotate-6 transition-transform" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[140px] transition-all duration-300 font-medium text-sm">
                    Book now
                </span>
            </a>
        </div>
    );
}