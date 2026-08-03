import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import FeaturedCourses from "../components/FeaturedCourses";
import BentoGrid from "./services/BentoGrid";
import ProductShowcase from "./services/ProductShowcase";
import QuoteConfigurator from "./services/QuoteConfigurator";
import CybersecuritySection from "./services/CybersecuritySection";
import heroImg from "../assets/images/hero 3.jpg";

// Primary CTA across the site (Home, Expertise, Consultation, etc.) opens the
// shared Calendly booking link in a new tab. Kept consistent here.
const CALENDLY_URL = "https://calendly.com/krafosystems";

export default function Services() {
    // Parallax hero — mirrors the Consultation page: the background image scales,
    // drifts, and fades as the user scrolls past the hero.
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <style>{`
                .hero-display { font-family: 'Proxon', sans-serif; }
            `}</style>

            <Navbar />

            {/* ── HERO — parallax image (hero 3), mirroring the Consultation hero ─── */}
            <section
                ref={heroRef}
                className="relative w-full min-h-[88vh] md:min-h-[92vh] overflow-hidden isolate bg-black"
            >
                {/* Background image with parallax scroll. */}
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                >
                    <img
                        src={heroImg}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/95" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B15,transparent_60%)]" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center min-h-[88vh] md:min-h-[92vh]">
                    <motion.div
                        className="relative max-w-2xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
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
                            <a href="#build" className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/15 hover:border-[#F2600B]/60 text-white font-semibold py-3.5 px-8 rounded-full shadow-lg shadow-black/20 transition-all duration-300">
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

            {/* ── "WHAT WE DO" — interactive Bento grid ────────────────────── */}
            <section className="py-16 bg-gradient-to-b from-black to-[#0a0503]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-12">
                        <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
                        <h2 className="hero-display text-3xl md:text-4xl font-bold">
                            What We <span className="text-[#F2600B]">Do</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                            One partner across security, software, and skills.
                        </p>
                    </div>

                    <BentoGrid />
                </div>
            </section>

            {/* ── CYBERSECURITY — expertise-sourced section ────────────────── */}
            <CybersecuritySection />

            {/* ── BUILD SERVICES — interactive Quote Configurator ──────────── */}
            <section id="build" className="py-20 bg-black scroll-mt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <div className="w-12 h-1 bg-[#F2600B] mx-auto mb-4 rounded-full" />
                        <h2 className="hero-display text-3xl md:text-4xl font-bold">
                            Software <span className="text-[#F2600B]">Development</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                            Explore what we build — tap any product to see the full offering, or
                            configure a live estimate below.
                        </p>
                    </div>

                    {/* Clickable product cards → full product pages (/services/:slug) */}
                    <ProductShowcase />

                    {/* Live estimate builder */}
                    <div className="text-center mt-16 mb-8">
                        <h3 className="hero-display text-2xl md:text-3xl font-bold">
                            Build a <span className="text-[#F2600B]">live estimate</span>
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-3">
                            Configure your project and see a transparent starting price.
                        </p>
                    </div>

                    <QuoteConfigurator />
                </div>
            </section>

            {/* ── TRAINING — reused Featured Courses section ───────────────── */}
            <section id="training" className="scroll-mt-20">
                <FeaturedCourses
                    title="Training for"
                    titleAccent="Your Team"
                    subtitle="Upskill your personnel with practical, high-demand cybersecurity and digital training — for individuals and organisations."
                />
            </section>

            {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-[#F2600B]/10 via-black to-black border-t border-[#F2600B]/10">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="hero-display text-3xl md:text-4xl font-bold mb-3">
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
