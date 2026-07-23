import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    CalendarClock,
    Shield,
    Users,
    Lock,
    Award,
    Star,
    Sparkles,
} from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import { EXPERTISE } from "./expertiseData";

// ── Assets ───────────────────────────────────────────────────────────
import bridge from "../assets/images/40128.jpg";
import studyGroup from "../assets/images/studygroup2.jpg";

import certPlaceholder1 from "../assets/images/cyberdefense.jpeg";
import certPlaceholder2 from "../assets/images/africadefense.jpeg";
import certPlaceholder3 from "../assets/images/cyberart.jpg";
import certPlaceholder4 from "../assets/images/hacking.jpeg";

const CALENDLY_URL = "https://calendly.com/krafosystems";

const certifications = [
    { src: certPlaceholder1, alt: "Certification 1" },
    { src: certPlaceholder2, alt: "Certification 2" },
    { src: certPlaceholder3, alt: "Certification 3" },
    { src: certPlaceholder4, alt: "Certification 4" },
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
                            className="mt-8 flex items-center gap-6 text-xs text-gray-500"
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
                        <h2 className="text-3xl md:text-4xl font-extrabold">
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
                            <div key={i} className="mx-4 shrink-0">
                                <div className="w-56 h-40 rounded-xl overflow-hidden border border-[#F2600B]/20 bg-[#111] shadow-lg">
                                    <img src={cert.src} alt={cert.alt} className="w-full h-full object-cover" />
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
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
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
                                            <h3 className="text-sm md:text-base font-semibold text-white leading-tight group-hover:text-[#F2600B] transition-colors">
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
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
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
                        <h2 className="text-3xl md:text-4xl font-extrabold">
                            What Our <span className="text-[#F2600B]">Clients Say</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative glass-card rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F2600B]/5"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                            >
                                {/* Avatar */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-[#F2600B]/10 border border-[#F2600B]/20 flex items-center justify-center font-bold text-[#F2600B] text-sm">
                                            {t.avatar}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#F2600B]/20 border border-[#F2600B]/30 flex items-center justify-center">
                                            <span className="text-[8px] text-[#F2600B]">★</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{t.name}</h4>
                                        {t.role && <p className="text-xs text-gray-400">{t.role}</p>}
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-[#F2600B] text-[#F2600B] opacity-70" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                                    "{t.quote}"
                                </p>

                                {/* Decorative line */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2600B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile dots */}
                    <div className="flex justify-center gap-2 mt-8 md:hidden">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    activeTestimonial === i ? "bg-[#F2600B] w-6" : "bg-[#F2600B]/30"
                                }`}
                            />
                        ))}
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
                        <h2 className="text-3xl md:text-4xl font-extrabold">
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
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F2600B10,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,#F2600B06,transparent_50%)]" />

                <div className="max-w-3xl mx-auto px-6 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >

                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            Not sure where to{" "}
                            <span className="text-[#F2600B] relative">
                                start?
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F2600B]/30" />
                            </span>
                        </h2>

                        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-balance text-base md:text-lg">
                            Book a free consultation and we'll help you identify your biggest risks
                            and the fastest wins — no jargon, no pressure. Just clarity.
                        </p>

                        <motion.div
                            className="mt-8 flex flex-wrap justify-center gap-4"
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
                                className="inline-flex items-center gap-2 border border-[#F2600B]/30 hover:border-[#F2600B] text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 group"
                            >
                                Explore Expertise
                                <Sparkles size={16} className="text-[#F2600B] group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Trust badge */}
                        <motion.div
                            className="mt-10 flex justify-center items-center gap-6 text-xs text-gray-500"
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