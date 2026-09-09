import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import krafoLogo from "../images/krafo-logo1.png";
import AnnouncementBar from "./AnnouncementBar";

const NAV_ITEMS = [
    { to: "/services", label: "Services" },
    { to: "/event-page", label: "Events" },
    { to: "/consultation", label: "Consultation" },
    { to: "/about", label: "About" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const reduceMotion = useReducedMotion();

    // Deepen the pill's glass/shadow once the user scrolls past the top.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const isActive = (to) =>
        location.pathname === to || location.pathname.startsWith(to + "/");

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Sitewide announcement. Renders nothing when none is live, so the
                nav sits at the top exactly as before whenever the bar is off. */}
            <AnnouncementBar />

            <div className="px-4 pt-3 sm:pt-4">
            {/* Floating glass pill */}
            <nav
                aria-label="Primary navigation"
                className={[
                    "mx-auto max-w-5xl rounded-full border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out",
                    scrolled
                        ? "bg-black/60 border-white/15 shadow-xl shadow-black/40 ring-1 ring-[#F2600B]/10"
                        : "bg-black/30 border-white/10 shadow-lg shadow-black/20",
                ].join(" ")}
            >
                <div className="relative flex h-16 items-center justify-between px-2.5 sm:px-3">
                    {/* Logo — on its own pill */}
                    <Link
                        to="/"
                        aria-label="KRAFO Systems home"
                        className="flex items-center shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors duration-200 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        <img src={krafoLogo} alt="KRAFO Systems" className="h-7 w-auto" />
                    </Link>

                    {/* Nav links (absolutely centered on desktop) with sliding highlight */}
                    <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.to);
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 rounded-full bg-[#F2600B]/15 ring-1 ring-inset ring-[#F2600B]/40"
                                            transition={
                                                reduceMotion
                                                    ? { duration: 0 }
                                                    : { type: "spring", stiffness: 420, damping: 34 }
                                            }
                                        />
                                    )}
                                    <span
                                        className={[
                                            "relative z-10 transition-colors duration-200",
                                            active
                                                ? "text-[#F2600B]"
                                                : "text-gray-300 group-hover:text-white",
                                        ].join(" ")}
                                    >
                                        {item.label}
                                    </span>
                                    {/* subtle hover backdrop for non-active items */}
                                    {!active && (
                                        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Right cluster: Toolkit CTA (desktop) + hamburger (mobile) */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/assessment-toolkit"
                            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#d94f00] hover:scale-105 hover:glow-orange-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            <ShieldCheck size={16} />
                            Assessment Toolkit
                        </Link>

                        <button
                            onClick={() => setIsOpen((v) => !v)}
                            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu — matching rounded glass panel */}
            {isOpen && (
                <div className="nav-type lg:hidden mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-xl shadow-black/40 p-3">
                    <div className="flex flex-col">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.to);
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={[
                                        "px-4 py-3 rounded-xl text-center text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                                        active
                                            ? "text-[#F2600B] bg-[#F2600B]/15 ring-1 ring-inset ring-[#F2600B]/40"
                                            : "text-gray-200 hover:text-white hover:bg-white/5",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </NavLink>
                            );
                        })}

                        <Link
                            to="/assessment-toolkit"
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2600B] px-5 py-3 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#d94f00] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8534] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            <ShieldCheck size={18} />
                            Assessment Toolkit
                        </Link>
                    </div>
                </div>
            )}
            </div>
        </header>
    );
}
