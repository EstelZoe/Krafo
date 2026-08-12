import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    CalendarClock,
    CalendarDays,
    ChevronDown,
    Clock,
    Compass,
    Lightbulb,
    Mail,
    MapPin,
    MessageSquare,
    Mic,
    Search,
    Users,
    X,
} from "lucide-react";

import Navbar from "../assets/components/Navbar";
import Footer from "../assets/components/Footer";
import EventCard from "../assets/components/EventCard";
import { apiClient } from "../api/client";

import BlackHole from "./events/BlackHole";
import Starfield from "./events/Starfield";
import EventSlider from "./events/EventSlider";
import SignaturePrograms from "./events/SignaturePrograms";
import PlannedEvents from "./events/PlannedEvents";
import PastEvents from "./events/PastEvents";
import { EVENT_STATS } from "./events/eventsContent";

import hostVideo from "../assets/videos/training and capacity building.mp4";

const CALENDLY_URL = "https://calendly.com/krafosystems";
const CONTACT_EMAIL = "info@krafosystems.com";
const PAGE_SIZE = 6;

// Mirrors the enum on the Event model (krafo_api/models/events_model.js).
const CATEGORIES = [
    "All",
    "Technology",
    "Business",
    "Cybersecurity",
    "Marketing",
    "AI",
    "Education",
];

// ── Shared section eyebrow (matches About / Consultation) ─────────────
const SectionEyebrow = ({ label }) => (
    <>
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#F2600B]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-[#ff8534]">
            {label}
        </span>
    </>
);

// ── Structural grid overlay (Consultation page motif) ─────────────────
const StructuralGrid = () => (
    <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <pattern id="events-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#F2600B"
                strokeOpacity="0.04"
                strokeWidth="0.5"
            />
            <circle cx="0" cy="0" r="1.5" fill="#F2600B" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#events-grid)" />
    </svg>
);

export default function EventPage() {
    // ── Upcoming events (API) ─────────────────────────────────────────
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    // ── Filters ───────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // ── Newsletter (opens the visitor's mail client — no backend yet) ──
    const [email, setEmail] = useState("");

    // ── Hero parallax (same treatment as Consultation / Services) ─────
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    useEffect(() => {
        let cancelled = false;

        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await apiClient.get("/events");
                const eventsData = response.data?.events || response.data || [];
                if (!cancelled) setEvents(Array.isArray(eventsData) ? eventsData : []);
            } catch (err) {
                console.error("Error fetching events:", err);
                if (!cancelled) {
                    setError(err.message || "Failed to load events. Please try again later.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchEvents();
        return () => {
            cancelled = true;
        };
    }, [reloadKey]);

    // The spotlight: the flagged event, else the first one we have.
    const spotlight = useMemo(
        () => events.find((e) => e.featured) || events[0] || null,
        [events]
    );

    // While browsing unfiltered, the spotlight is already shown above the
    // grid — drop it from the list so it isn't printed twice. As soon as a
    // filter or search is active, it competes on equal terms again.
    const isBrowsingAll = activeCategory === "All" && searchQuery.trim() === "";

    const filteredEvents = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return events.filter((event) => {
            if (isBrowsingAll && spotlight && event === spotlight) return false;
            if (activeCategory !== "All" && event.category !== activeCategory) return false;
            if (!query) return true;

            const haystack = `${event.title || ""} ${event.description || ""} ${
                event.location || ""
            }`.toLowerCase();
            return haystack.includes(query);
        });
    }, [events, activeCategory, searchQuery, isBrowsingAll, spotlight]);

    const visibleEvents = filteredEvents.slice(0, visibleCount);
    const hasMore = visibleCount < filteredEvents.length;

    // An empty grid means one of three different things — say the right one.
    const emptyReason = !isBrowsingAll
        ? "filtered"
        : events.length > 0
          ? "spotlight-only" // the single event we have is featured above
          : "nothing-scheduled";

    // A new filter or query starts the list over from the top.
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeCategory, searchQuery]);

    const resetFilters = () => {
        setActiveCategory("All");
        setSearchQuery("");
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const subject = "Event updates — please add me to the list";
        const body = `Please add this address to Krafo Systems event announcements:\n\n${email}\n\nThank you.`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#F2600B]/40 selection:text-white">
            {/* ── Page-scoped styles (brand face + card treatments) ──── */}
            <style>{`
                /* Brand font "Proxon" is loaded globally via index.css (@font-face). */
                .hero-display { font-family: 'Proxon', sans-serif; }

                .text-balance { text-wrap: balance; }

                .card-architect {
                    box-shadow:
                        0 4px 24px rgba(0,0,0,0.6),
                        0 0 0 1px rgba(242, 96, 11, 0.06),
                        inset 0 1px 0 rgba(242, 96, 11, 0.04);
                }

                .glow-text {
                    text-shadow: 0 0 80px rgba(242, 96, 11, 0.15), 0 0 160px rgba(242, 96, 11, 0.05);
                }
            `}</style>

            <Navbar />

            {/* ═══════════════════════════════════════════════════════════
               HERO — supernova collapsing into a black hole
            ═══════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative isolate flex min-h-[94vh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pt-28 pb-24 md:min-h-screen"
            >
                {/* The core sits low and wide, so the headline reads against
                    empty sky and the light rises to meet the copy below it. */}
                <motion.div
                    className="absolute left-1/2 top-[62%] w-[190%] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 sm:w-[150%] lg:w-[115%]"
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                >
                    <BlackHole coreScale={0.5} shootingStars className="aspect-[2/1] w-full" />
                </motion.div>

                <StructuralGrid />

                <motion.div
                    className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.h1
                        className="hero-display glow-text text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Where Africa&apos;s
                        <br />
                        <span className="text-[#F2600B]">Cyber Community</span>
                        <br />
                        <span className="text-white/90">Comes Together</span>
                    </motion.h1>

                    <motion.p
                        className="mt-6 max-w-xl text-balance text-base leading-relaxed text-gray-300 md:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                    >
                        Workshops, school halls, conference stages and cohort graduations —
                        where practical cyber knowledge changes hands, in plain language,
                        with the people who actually do the work.
                    </motion.p>

                    <motion.div
                        className="mt-9 flex flex-wrap items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        <a
                            href="#upcoming"
                            className="group inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-8 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.03] hover:bg-[#d94f00] hover:shadow-[#F2600B]/50 active:scale-95"
                        >
                            See what&apos;s coming up
                            <CalendarDays
                                size={18}
                                className="transition-transform group-hover:rotate-6"
                            />
                        </a>
                        <a
                            href="#planning"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#F2600B]/60 hover:bg-white/10"
                        >
                            What we&apos;re planning
                            <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               STAT CARD — a contained panel bridging hero and slider
            ═══════════════════════════════════════════════════════════ */}
            {/* Straddles the boundary: the negative bottom margin drops the
                card onto the orange band below, whose top padding is sized to
                clear it. */}
            <div className="relative z-20 -mb-8 bg-black px-6 pt-2 md:-mb-9">
                <motion.dl
                    className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#F2600B]/45 bg-white/10 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.9),0_0_60px_-18px_rgba(242,96,11,0.5)] sm:grid-cols-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {EVENT_STATS.map((stat) => (
                        // gap-px over a light parent background paints the
                        // hairline dividers between cells.
                        //
                        // Reversed column so the markup stays valid (dt before
                        // dd) while the figure still reads above its label.
                        <div
                            key={stat.label}
                            // Lifted off the band's own near-black — the card has
                            // to stay a distinct object now that it no longer has
                            // orange behind it.
                            className="flex flex-col-reverse items-center bg-[#1a120c] px-4 py-5 text-center"
                        >
                            <dt className="mt-1 text-[11px] uppercase tracking-wider text-gray-400">
                                {stat.label}
                            </dt>
                            <dd className="hero-display text-2xl font-extrabold text-white md:text-3xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </motion.dl>
            </div>

            {/* ═══════════════════════════════════════════════════════════
               SLIDER — work with us band
            ═══════════════════════════════════════════════════════════ */}
            <EventSlider />

            {/* ═══════════════════════════════════════════════════════════
               NEXT UP — spotlight on the featured event
            ═══════════════════════════════════════════════════════════ */}
            {!loading && !error && spotlight && (
                <section className="relative overflow-hidden py-16 md:py-20">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#F2600B08,transparent_60%)]" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
                        <motion.div
                            className="mb-10 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <SectionEyebrow label="Next Up" />
                            <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                                The one to <span className="text-[#F2600B]">put in your diary</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className="card-architect relative grid overflow-hidden rounded-2xl border border-[#F2600B]/20 lg:grid-cols-2"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Image side */}
                            <div className="relative min-h-[260px] lg:min-h-[420px]">
                                {spotlight.image ? (
                                    <img
                                        src={spotlight.image}
                                        alt={spotlight.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d05] to-[#0c0705]" />
                                )}
                                {/* Undimmed: the copy lives in its own column
                                    beside the artwork, so nothing needs a scrim
                                    to stay readable. */}

                                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                    Registration open
                                </div>

                                {/* Corner accents — the architectural motif */}
                                <div className="absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-[#F2600B]/30" />
                                <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-[#F2600B]/30" />
                            </div>

                            {/* Content side */}
                            <div className="relative bg-[#0c0705] p-7 sm:p-10">
                                {spotlight.category && (
                                    <span className="inline-flex items-center rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-3 py-1 text-xs font-semibold text-[#ff8534]">
                                        {spotlight.category}
                                    </span>
                                )}

                                <h3 className="hero-display mt-4 text-2xl font-extrabold leading-tight text-white md:text-4xl">
                                    {spotlight.title}
                                </h3>

                                {spotlight.description && (
                                    <p className="mt-4 leading-relaxed text-gray-300">
                                        {spotlight.description}
                                    </p>
                                )}

                                <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
                                    {[
                                        { Icon: CalendarDays, value: spotlight.dateRange },
                                        { Icon: Clock, value: spotlight.time },
                                        { Icon: MapPin, value: spotlight.location },
                                    ]
                                        .filter((item) => item.value)
                                        .map((item) => {
                                            const MetaIcon = item.Icon;
                                            return (
                                                <div key={item.value} className="flex items-start gap-2.5">
                                                    <MetaIcon
                                                        size={16}
                                                        className="mt-0.5 shrink-0 text-[#F2600B]"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {spotlight.registrationUrl && (
                                        <a
                                            href={spotlight.registrationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d94f00]"
                                        >
                                            Reserve your seat
                                            <ArrowUpRight
                                                size={18}
                                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </a>
                                    )}
                                    <a
                                        href="#upcoming"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#F2600B]/60 hover:text-[#ff8534]"
                                    >
                                        See all events
                                        <ChevronDown size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════════════════
               UPCOMING — the API-driven listing
            ═══════════════════════════════════════════════════════════ */}
            <section
                id="upcoming"
                className="relative scroll-mt-20 overflow-hidden border-y border-[#F2600B]/5 bg-[#0a0a0a] py-20 md:py-24"
            >
                {/* The same sky as the hero and the band, dimmed further —
                    it sits behind a grid of cards here, not open space. */}
                <Starfield opacity={0.45} shootingStars />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,#F2600B08,transparent_60%)]" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.div
                        className="mb-10 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="What's On" />
                        <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                            Upcoming <span className="text-[#F2600B]">Events</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
                            Filter by what you care about, or search for a session by name,
                            topic or venue.
                        </p>
                    </motion.div>

                    {/* Search */}
                    <div className="mx-auto mb-6 max-w-2xl">
                        <div className="relative">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search events by name, topic or venue…"
                                aria-label="Search events"
                                className="w-full rounded-full border border-white/10 bg-black/40 py-3.5 pl-12 pr-11 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/10 hover:text-white"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/*
                        The category chips lived here. Hidden so every event
                        shows by default rather than making visitors pick a
                        category first — with a handful of events at a time,
                        filtering was solving a problem the page doesn't have.

                        The state and filter logic below are untouched, so
                        restoring them is a matter of putting this block back:

                        <div className="mb-12 flex flex-wrap justify-center gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    aria-pressed={activeCategory === category}
                                    className={...}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    */}
                    <div className="mb-12" />

                    {/* Loading */}
                    {loading && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(PAGE_SIZE)].map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-[#0c0705]"
                                >
                                    <div className="h-44 bg-white/5" />
                                    <div className="space-y-3 p-5">
                                        <div className="h-4 w-24 rounded-full bg-white/10" />
                                        <div className="h-5 w-3/4 rounded bg-white/10" />
                                        <div className="h-3 w-full rounded bg-white/5" />
                                        <div className="h-3 w-5/6 rounded bg-white/5" />
                                        <div className="h-9 w-full rounded-full bg-white/5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <div className="flex justify-center py-16">
                            <div className="max-w-md rounded-2xl border border-red-500/25 bg-red-950/20 p-8 text-center backdrop-blur-sm">
                                <AlertTriangle size={40} className="mx-auto text-red-400" />
                                <h3 className="hero-display mt-4 text-xl font-bold text-white">
                                    We couldn&apos;t load the events
                                </h3>
                                <p className="mt-2 text-sm text-gray-400">{error}</p>
                                <button
                                    type="button"
                                    onClick={() => setReloadKey((k) => k + 1)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-[#F2600B] hover:bg-[#F2600B]/10"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && !error && visibleEvents.length > 0 && (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleEvents.map((event, index) => (
                                    <motion.div
                                        key={event._id || event.id || `${event.title}-${index}`}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                                        transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                                    >
                                        <EventCard {...event} />
                                    </motion.div>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="mt-14 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                        className="group inline-flex items-center gap-2 rounded-full border border-[#F2600B]/30 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/10"
                                    >
                                        Load more events
                                        <ChevronDown
                                            size={18}
                                            className="text-[#F2600B] transition-transform group-hover:translate-y-0.5"
                                        />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Empty */}
                    {!loading && !error && visibleEvents.length === 0 && (
                        <motion.div
                            className="mx-auto max-w-xl rounded-2xl border border-[#F2600B]/15 bg-[#0c0705] p-10 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F2600B]/40 bg-[#0c0705] text-[#F2600B] shadow-[0_0_18px_rgba(242,96,11,0.35)]">
                                <CalendarClock size={26} />
                            </span>
                            <h3 className="hero-display mt-6 text-2xl font-bold text-white">
                                {emptyReason === "filtered" && "No events match that"}
                                {emptyReason === "spotlight-only" && "That's everything for now"}
                                {emptyReason === "nothing-scheduled" &&
                                    "Nothing scheduled right now"}
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-balance text-gray-400">
                                {emptyReason === "filtered" &&
                                    "Try a different category or a broader search — or browse everything we have on."}
                                {emptyReason === "spotlight-only" &&
                                    "Our next session is featured just above. More dates are being confirmed — leave us your email and we'll tell you first."}
                                {emptyReason === "nothing-scheduled" &&
                                    "Our next dates are being confirmed. Look through the programmes we run below, or leave us your email and we'll tell you first."}
                            </p>
                            <div className="mt-7 flex flex-wrap justify-center gap-3">
                                {emptyReason === "filtered" && (
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#F2600B] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d94f00]"
                                    >
                                        Reset filters
                                    </button>
                                )}
                                <a
                                    href="#programmes"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-[#F2600B]/60 hover:text-[#ff8534]"
                                >
                                    See our programmes <ArrowRight size={15} />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               EVENTS WE'RE PLANNING — register interest, gauge demand
            ═══════════════════════════════════════════════════════════ */}
            <section
                id="planning"
                className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B08,transparent_60%)]" />
                <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="On The Drawing Board" />
                        <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                            Events we&apos;re <span className="text-[#F2600B]">planning</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
                            These don&apos;t have dates yet — because we&apos;d rather know
                            you want them first. Tell us you&apos;re interested and the ones
                            with real demand are the ones that get booked.
                        </p>
                    </motion.div>

                    <PlannedEvents />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               PAST EVENTS — the archive
            ═══════════════════════════════════════════════════════════ */}
            <section
                id="past"
                className="relative scroll-mt-20 overflow-hidden border-y border-[#F2600B]/5 bg-[#0a0a0a] py-20 md:py-28"
            >
                <StructuralGrid />
                {/* Same sky again, so the archive sits in the same world as
                    the hero rather than reading as a separate page. */}
                <Starfield opacity={0.45} shootingStars />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,#F2600B08,transparent_60%)]" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="The Archive" />
                        <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                            Where we&apos;ve <span className="text-[#F2600B]">already been</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
                            School halls, embassies, conference stages and cohort graduations.
                            Tap any frame to open the story behind it.
                        </p>
                    </motion.div>

                    <PastEvents />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               SIGNATURE PROGRAMMES — the series we run every year
            ═══════════════════════════════════════════════════════════ */}
            <section
                id="programmes"
                className="relative scroll-mt-20 overflow-hidden py-20 md:py-28"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#F2600B08,transparent_60%)]" />
                {/* Wider than the other sections — it now carries three columns
                    rather than two. */}
                <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="Our Programmes" />
                        <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                            The series we run <span className="text-[#F2600B]">every year</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-balance text-gray-400">
                            Four programmes, four audiences — pick the one that sounds like
                            your people.
                        </p>
                    </motion.div>

                    <SignaturePrograms />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               WHY ATTEND — the process rail
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,#F2600B08,transparent_60%)]" />
                <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
                    <motion.div
                        className="mb-14 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionEyebrow label="What To Expect" />
                        <h2 className="hero-display mt-3 text-3xl font-extrabold md:text-4xl">
                            Why people keep <span className="text-[#F2600B]">coming back</span>
                        </h2>
                    </motion.div>

                    <div className="relative grid gap-6 md:grid-cols-4">
                        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#F2600B]/40 to-transparent md:block" />
                        {[
                            {
                                Icon: Lightbulb,
                                step: "01",
                                title: "Plain language",
                                text: "No acronym soup. Everything is explained so a non-technical person leaves genuinely understanding it.",
                            },
                            {
                                Icon: Mic,
                                step: "02",
                                title: "Practitioners, not pitchers",
                                text: "The people on stage are the people doing the work — assessments, response, training, every week.",
                            },
                            {
                                Icon: MessageSquare,
                                step: "03",
                                title: "Ask anything",
                                text: "Live Q&A is part of every session. Bring the awkward question you were told was too basic.",
                            },
                            {
                                Icon: Compass,
                                step: "04",
                                title: "Leave with next steps",
                                text: "You go home with something to act on this week — not just a feeling that you should do something.",
                            },
                        ].map((item, i) => {
                            const StepIcon = item.Icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    className="group relative"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F2600B]/40 bg-[#0c0705] text-[#F2600B] shadow-[0_0_18px_rgba(242,96,11,0.4)] ring-4 ring-black transition-transform duration-300 group-hover:scale-110">
                                        <StepIcon size={24} />
                                    </span>
                                    <span className="hero-display mt-5 block text-xs font-bold tracking-widest text-[#ff8534]">
                                        {item.step}
                                    </span>
                                    <h3 className="hero-display mt-1 text-xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                        {item.text}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               HOST WITH US — video band
            ═══════════════════════════════════════════════════════════ */}
            <section id="host" className="relative scroll-mt-20 overflow-hidden py-16 md:py-20">
                <div className="mx-auto max-w-6xl px-6 lg:px-12">
                    <motion.div
                        className="relative overflow-hidden rounded-2xl border border-[#F2600B]/20 p-8 md:p-12"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <video
                            className="absolute inset-0 h-full w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={hostVideo} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/70" />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
                        />

                        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-xl rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                                <div className="mb-4 flex gap-2">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                                        <Users size={18} />
                                    </span>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F2600B]/40 bg-[#F2600B]/10 text-[#F2600B]">
                                        <Mic size={18} />
                                    </span>
                                </div>
                                <h2 className="hero-display text-2xl font-extrabold text-white md:text-3xl">
                                    Bring a Krafo session to{" "}
                                    <span className="text-[#F2600B]">your people.</span>
                                </h2>
                                <p className="mt-3 text-balance text-gray-100">
                                    Staff awareness days, school assemblies, conference keynotes,
                                    private workshops for your leadership team — we&apos;ll shape
                                    the session around your room, your risks and your calendar.
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-col gap-3">
                                <Link
                                    to="/contact"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d94f00]"
                                >
                                    Request a session
                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </Link>
                                <a
                                    href={CALENDLY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 hover:border-[#F2600B] hover:bg-[#F2600B]/20"
                                >
                                    Book a call
                                    <CalendarClock size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
               STAY IN THE LOOP + closing CTA
            ═══════════════════════════════════════════════════════════ */}
            {/* Bookends the page: the same core that opens the hero rises back
                out of the bottom edge here, cropped by the footer. */}
            <section className="relative overflow-hidden bg-black pt-24 md:pt-32">
                {/* Section-wide rather than only inside the black hole's own
                    box at the foot — that box is a couple of hundred pixels
                    tall, so streaks confined to it would never be seen. This
                    puts them in the open sky above the copy. */}
                <Starfield opacity={0.5} shootingStars />

                <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="hero-display glow-text text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                            Never miss the <span className="text-[#F2600B]">next one</span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-lg text-balance text-gray-400 md:text-lg">
                            Dates go out to our list before they go anywhere else.
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Mail
                                    size={18}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    aria-label="Your email address"
                                    className="w-full rounded-full border border-white/10 bg-black/40 py-3.5 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F2600B]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2600B] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d94f00]"
                            >
                                Keep me posted
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <p className="mt-3 text-xs text-gray-500">
                            Opens your mail app addressed to {CONTACT_EMAIL}. No account needed.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                            <span>CSA-Licensed</span>
                            <span className="text-[#F2600B]">·</span>
                            <span>DPC-Registered</span>
                            <span className="text-[#F2600B]">·</span>
                            <span>Based in Ghana</span>
                            <span className="text-[#F2600B]">·</span>
                            <span>Est. 2022</span>
                        </div>
                    </motion.div>
                </div>

                {/* The core, centred exactly on the section's bottom edge, so
                    only its upper arc shows and the light stops dead where the
                    footer begins. `fade` is off — the crop is the effect. */}
                {/* Heights are cut to roughly the arc's own reach above the
                    bottom edge. Any taller and the extra is pure empty sky
                    between the copy and the light. */}
                <div className="relative mt-4 h-[150px] sm:h-[200px] md:h-[240px]">
                    <div className="absolute bottom-0 left-1/2 w-[200%] max-w-[1600px] -translate-x-1/2 translate-y-1/2 sm:w-[150%] lg:w-[115%]">
                        <BlackHole coreScale={0.5} fade={false} className="aspect-[2/1] w-full" />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
