import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Globe,
    LayoutDashboard,
    Zap,
    Smartphone,
    ShieldCheck,
    Code2,
    GraduationCap,
    Scale,
    Lightbulb,
    Eye,
    Check,
    ArrowRight,
    CalendarClock,
    Star,
} from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FeaturedCourses from "../components/FeaturedCourses";

// Hero background — PLACEHOLDER (swap for a gov/business + digital services image).
import heroImg from "../assets/images/desk-scene-with-laptop.jpg";

const CALENDLY_URL = "https://calendly.com/krafosystems";

// ── High-level service categories (overview grid) ────────────────────────────
const SERVICE_OVERVIEW = [
    { Icon: ShieldCheck, title: "Cybersecurity Services", desc: "Monitoring, testing, incident response and compliance to keep your operations resilient.", to: "/expertise" },
    { Icon: Code2, title: "Software Development", desc: "Websites, web apps, SaaS platforms and mobile apps — built to scale.", to: "#build" },
    { Icon: GraduationCap, title: "Training & Capacity Building", desc: "Hands-on cybersecurity and digital-skills training for your team.", to: "#training" },
    { Icon: Scale, title: "Governance & Compliance", desc: "Alignment with Ghana's Data Protection Act (843) and Cybersecurity Act (1038).", to: "/expertise#governance-risk-compliance" },
    { Icon: Lightbulb, title: "Consulting & Advisory", desc: "Strategic guidance to reduce risk and support your business objectives.", to: "/consultation" },
    { Icon: Eye, title: "Managed Services", desc: "Ongoing, managed protection and support so you can focus on your mission.", to: "/expertise#managed-security" },
];

// ── Development services pricing (SERVICES.CFG terminal selector) ─────────────
// Website / Web App / SaaS pricing supplied by the team. Mobile App is a
// placeholder ("Custom quote") pending confirmed figures.
const DEV_CATEGORIES = [
    {
        key: "websites", label: "WEBSITES", Icon: Globe,
        tagline: "From landing pages to full corporate sites",
        tiers: [
            { name: "Starter", price: "GHS 3,500+", bestFor: "Small businesses, personal brands", features: ["Up to 6 pages", "Mobile responsive", "Contact form", "Basic SEO setup", "CMS access"] },
            { name: "Professional", price: "GHS 7,000+", bestFor: "Corporate orgs, NGOs, schools", features: ["8–15 pages", "Blog / news section", "Testimonials", "Payment integration", "Performance optimized"] },
            { name: "Enterprise", price: "GHS 18,000+", bestFor: "Established brands competing widely", best: true, features: ["Conversion-focused UI/UX", "CRM integrations", "Multi-language support", "Advanced SEO architecture", "Security hardening"] },
        ],
    },
    {
        key: "webapps", label: "WEB APPS", Icon: LayoutDashboard,
        tagline: "Dashboards, portals, internal tools",
        tiers: [
            { name: "Business", price: "GHS 20,000+", bestFor: "Bookings, dashboards, internal tools", features: ["Auth system", "Role-based access", "Admin dashboard", "Custom workflows", "API integrations"] },
            { name: "Enterprise", price: "GHS 45,000+", bestFor: "Advanced business systems", best: true, features: ["Complex multi-role systems", "Real-time features", "Advanced analytics", "Deep third-party integrations", "Scalable backend"] },
        ],
    },
    {
        key: "saas", label: "SAAS PLATFORMS", Icon: Zap,
        tagline: "Multi-tenant products built to scale",
        tiers: [
            { name: "MVP", price: "GHS 70,000+", bestFor: "Startups launching products", features: ["Multi-user system", "Subscription & payment logic", "Role management", "Core MVP features", "Scalable architecture"] },
            { name: "Scale", price: "GHS 140,000+", bestFor: "Serious product businesses", best: true, features: ["AI integrations", "Real-time systems", "Marketplace logic", "Advanced analytics", "Growth infrastructure"] },
        ],
    },
    {
        key: "mobile", label: "MOBILE APPS", Icon: Smartphone,
        tagline: "iOS & Android apps for your audience",
        tiers: [
            { name: "Standard", price: "Custom quote", bestFor: "MVP mobile apps", features: ["iOS & Android (cross-platform)", "User accounts & auth", "Push notifications", "Core feature set", "App-store deployment"] },
            { name: "Advanced", price: "Custom quote", bestFor: "Feature-rich products", best: true, features: ["Native performance", "Offline support", "Payments & subscriptions", "Real-time sync", "Analytics & crash reporting"] },
        ],
    },
];

const ADDONS = [
    ["User Authentication", "GHS 2,300+"],
    ["Admin Dashboard", "GHS 6,000+"],
    ["Payment Integration", "GHS 3,800+"],
    ["Third-party APIs", "GHS 2,000+"],
    ["Role-based Access", "GHS 4,500+"],
    ["Real-time Features", "GHS 4,000+"],
    ["AI / ML Integration", "GHS 8,000+"],
    ["Advanced Security", "GHS 4,000+"],
];

export default function Services() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const [activeTab, setActiveTab] = useState("websites");
    const active = DEV_CATEGORIES.find((c) => c.key === activeTab);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <style>{`
                .hero-display { font-family: 'Proxon', sans-serif; }
                .terminal { font-family: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }
            `}</style>

            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section ref={heroRef} className="relative w-full min-h-[88vh] md:min-h-[92vh] overflow-hidden isolate">
                <motion.div className="absolute inset-0" style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}>
                    <img src={heroImg} alt="Digital services workspace" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B22,transparent_60%)]" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center min-h-[88vh] md:min-h-[92vh]">
                    <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#F2600B] opacity-40 hidden md:block" />
                        <h1 className="hero-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
                            Digital Solutions for
                            <br />
                            <span className="text-[#F2600B]">Government &amp; Business</span>
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed mt-6">
                            From secure software to cyber resilience and skilled teams — Krafo builds,
                            secures, and trains, so your organisation can operate with confidence.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 hover:shadow-[#F2600B]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95">
                                Book a Consultation <CalendarClock size={20} />
                            </a>
                            <a href="#build" className="inline-flex items-center gap-2 border border-[#F2600B]/40 hover:border-[#F2600B] hover:bg-[#F2600B]/10 text-white font-semibold py-3.5 px-8 rounded-full transition">
                                View Build Services <ArrowRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#F2600B]/60 to-transparent" />
                </div>
            </section>

            {/* ── INTRO ────────────────────────────────────────────────────── */}
            <section className="relative py-10 md:py-14 border-t border-[#F2600B]/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="w-12 h-1 bg-[#F2600B]/50 mx-auto mb-5 rounded-full" />
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        A licensed Ghanaian cybersecurity and technology partner, Krafo Systems helps
                        institutions and businesses <span className="text-[#F2600B] font-medium">build secure digital products</span>,
                        strengthen their defences, and upskill their people.
                    </p>
                </div>
            </section>

            {/* ── SERVICES OVERVIEW GRID ───────────────────────────────────── */}
            <section className="py-16 bg-gradient-to-b from-black to-[#0a0503]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
                        <h2 className="text-3xl md:text-4xl font-bold">
                            What We <span className="text-[#F2600B]">Do</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                            One partner across security, software, and skills.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICE_OVERVIEW.map(({ Icon, title, desc, to }, i) => {
                            const isHash = to.startsWith("#");
                            const inner = (
                                <>
                                    <div className="w-14 h-14 rounded-xl bg-[#F2600B]/10 border border-[#F2600B]/25 flex items-center justify-center mb-4 group-hover:bg-[#F2600B]/20 transition-colors">
                                        <Icon className="text-[#F2600B]" size={26} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F2600B] transition-colors">{title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-[#F2600B] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Learn more <ArrowRight size={14} />
                                    </span>
                                </>
                            );
                            const cls = "group block h-full bg-[#111] border border-[#F2600B]/10 rounded-2xl p-6 hover:border-[#F2600B]/40 hover:-translate-y-1 transition-all duration-300";
                            return (
                                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }}>
                                    {isHash ? <a href={to} className={cls}>{inner}</a> : <Link to={to} className={cls}>{inner}</Link>}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── BUILD SERVICES — SERVICES.CFG terminal selector ──────────── */}
            <section id="build" className="py-20 bg-black scroll-mt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Software <span className="text-[#F2600B]">Development</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                            Websites, web apps, SaaS platforms and mobile apps — transparent starting prices.
                        </p>
                    </div>

                    {/* Terminal card */}
                    <div className="terminal relative rounded-2xl border border-[#F2600B]/25 bg-[#050505] overflow-hidden shadow-2xl shadow-black/60">
                        {/* dotted grid backdrop */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(#F2600B_1px,transparent_1px)] [background-size:22px_22px]" />

                        {/* header bar */}
                        <div className="relative flex items-center gap-2 px-5 py-3 border-b border-[#F2600B]/20 bg-black/40">
                            <span className="text-[#F2600B] font-bold tracking-widest text-sm">&gt; SERVICES.CFG</span>
                            <span className="ml-auto flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-[#F2600B]/30" />
                                <span className="w-3 h-3 rounded-full bg-[#F2600B]/50" />
                                <span className="w-3 h-3 rounded-full bg-[#F2600B]/80" />
                            </span>
                        </div>

                        {/* tabs */}
                        <div className="relative flex flex-wrap gap-2 p-4 border-b border-[#F2600B]/10">
                            {[...DEV_CATEGORIES.map((c) => ({ key: c.key, label: c.label })), { key: "addons", label: "ADD-ONS" }].map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => setActiveTab(t.key)}
                                    className={`px-4 py-2 rounded-md text-xs md:text-sm font-bold tracking-wider transition-all ${
                                        activeTab === t.key
                                            ? "bg-[#F2600B] text-black shadow-lg shadow-[#F2600B]/30"
                                            : "text-[#F2600B]/70 border border-[#F2600B]/20 hover:border-[#F2600B]/50 hover:text-[#F2600B]"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* body */}
                        <div className="relative p-5 md:p-8">
                            {activeTab === "addons" ? (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg border border-[#F2600B]/40 flex items-center justify-center text-[#F2600B]">
                                            <Zap size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[#F2600B] font-bold tracking-wider">ADD-ONS</p>
                                            <p className="text-gray-500 text-xs">Bolt-on features for any project</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {ADDONS.map(([name, price]) => (
                                            <div key={name} className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-[#F2600B]/10 bg-black/40 hover:border-[#F2600B]/30 transition-colors">
                                                <span className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <Check size={14} className="text-[#F2600B]" /> {name}
                                                </span>
                                                <span className="text-[#F2600B] font-bold text-sm whitespace-nowrap">{price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg border border-[#F2600B]/40 flex items-center justify-center text-[#F2600B]">
                                            <active.Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[#F2600B] font-bold tracking-wider">{active.label}</p>
                                            <p className="text-gray-500 text-xs">{active.tagline}</p>
                                        </div>
                                    </div>

                                    <div className={`grid gap-5 ${active.tiers.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                                        {active.tiers.map((tier) => (
                                            <div
                                                key={tier.name}
                                                className={`relative rounded-xl p-6 bg-black/40 transition-all ${
                                                    tier.best ? "border-2 border-[#F2600B] shadow-lg shadow-[#F2600B]/20" : "border border-[#F2600B]/15 hover:border-[#F2600B]/40"
                                                }`}
                                            >
                                                {tier.best && (
                                                    <span className="absolute -top-3 right-4 inline-flex items-center gap-1 bg-[#F2600B] text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
                                                        <Star size={11} className="fill-black" /> BEST VALUE
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-extrabold text-white">{tier.name}</h3>
                                                <p className="text-2xl font-extrabold text-[#F2600B] mt-1">{tier.price}</p>
                                                <p className="text-gray-500 text-xs italic mt-2 mb-4">Best for: {tier.bestFor}</p>
                                                <ul className="space-y-2.5">
                                                    {tier.features.map((f) => (
                                                        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                                                            <Check size={15} className="text-[#F2600B] mt-0.5 shrink-0" /> {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <p className="text-gray-500 text-xs mt-6 text-center">
                                Prices are starting points and scale with scope. <span className="text-[#F2600B]">Contact us for a tailored quote.</span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 transition-all hover:scale-[1.02]">
                            Request a Quote <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── TRAINING — reused Featured Courses section ───────────────── */}
            <div id="training" className="scroll-mt-20">
                <FeaturedCourses
                    title="Training for"
                    titleAccent="Your Team"
                    subtitle="Upskill your personnel with practical, high-demand cybersecurity and digital training — for individuals and organisations."
                />
            </div>

            {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-[#F2600B]/10 via-black to-black border-t border-[#F2600B]/10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Let&apos;s build something <span className="text-[#F2600B]">secure.</span>
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Tell us what you need — a website, a platform, security, or a trained team — and
                        we&apos;ll shape the right solution with you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-white bg-[#F2600B] hover:bg-[#d94f00] shadow-lg shadow-[#F2600B]/30 transition-all hover:scale-[1.02]">
                            Book a Consultation <CalendarClock size={18} />
                        </a>
                        <Link to="/expertise" className="inline-flex items-center gap-2 border border-[#F2600B]/40 hover:border-[#F2600B] text-white font-semibold py-3.5 px-8 rounded-full transition">
                            Explore Expertise <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
