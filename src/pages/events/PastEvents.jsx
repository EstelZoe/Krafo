import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, MapPin, X } from "lucide-react";
import { PAST_EVENTS, PAST_EVENT_YEARS } from "./eventsContent";

/**
 * The archive. A year-filtered editorial grid where the first tile runs
 * double-width as the "lead" photo, and any tile opens a lightbox with the
 * full frame, the story, and arrow-key navigation through the filtered set.
 */
export default function PastEvents() {
    const [year, setYear] = useState("All");
    const [openIndex, setOpenIndex] = useState(-1);
    const closeButtonRef = useRef(null);
    // Where focus was before the lightbox opened, so we can hand it back.
    const restoreFocusRef = useRef(null);

    const events = useMemo(
        () => (year === "All" ? PAST_EVENTS : PAST_EVENTS.filter((e) => e.year === year)),
        [year]
    );

    const isOpen = openIndex >= 0 && openIndex < events.length;
    const active = isOpen ? events[openIndex] : null;

    const close = useCallback(() => setOpenIndex(-1), []);
    const step = useCallback(
        (delta) =>
            setOpenIndex((i) => (i < 0 ? i : (i + delta + events.length) % events.length)),
        [events.length]
    );

    // Keyboard: Escape closes, arrows walk the filtered set.
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKeyDown = (e) => {
            if (e.key === "Escape") close();
            else if (e.key === "ArrowRight") step(1);
            else if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, close, step]);

    // Freeze the page behind the lightbox, and move focus into (then back
    // out of) the dialog.
    useEffect(() => {
        if (!isOpen) return undefined;
        restoreFocusRef.current = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            restoreFocusRef.current?.focus?.();
        };
    }, [isOpen]);

    // Changing the filter invalidates the open index — close first.
    const selectYear = (value) => {
        setOpenIndex(-1);
        setYear(value);
    };

    return (
        <div>
            {/* ── Year filter ── */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
                {["All", ...PAST_EVENT_YEARS].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => selectYear(value)}
                        aria-pressed={year === value}
                        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                            year === value
                                ? "bg-[#F2600B] text-white shadow-[0_0_20px_rgba(242,96,11,0.4)]"
                                : "border border-white/15 text-gray-300 hover:border-[#F2600B]/50 hover:text-white"
                        }`}
                    >
                        {value === "All" ? "All years" : value}
                    </button>
                ))}
            </div>

            {/* ── Grid ── */}
            <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                    <motion.button
                        key={event.id}
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                        transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05 }}
                        className={`group relative overflow-hidden rounded-2xl border border-[#F2600B]/15 bg-[#0c0705] text-left transition-colors duration-500 hover:border-[#F2600B]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B] ${
                            index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                        }`}
                    >
                        <img
                            src={event.image}
                            alt={event.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

                        {/* Year + tag */}
                        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                                {event.tag}
                            </span>
                            <span className="hero-display text-sm font-bold text-[#ff8534]">
                                {event.year}
                            </span>
                        </div>

                        {/* Caption */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                            <h3
                                className={`hero-display font-bold leading-snug text-white ${
                                    index === 0 ? "text-xl sm:text-2xl" : "text-base"
                                }`}
                            >
                                {event.title}
                            </h3>
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-300">
                                <MapPin size={12} className="shrink-0 text-[#F2600B]" />
                                <span className="truncate">{event.location}</span>
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400">
                                <span>{event.date}</span>
                                <span className="h-1 w-1 rounded-full bg-[#F2600B]/60" />
                                <span>{event.stat}</span>
                            </div>
                        </div>

                        {/* Expand affordance */}
                        <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                            <Expand size={15} />
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-label={active.title}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#F2600B]/25 bg-[#0c0705] shadow-2xl shadow-black/70"
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: 8 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={close}
                                aria-label="Close"
                                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:border-[#F2600B] hover:bg-[#F2600B]"
                            >
                                <X size={18} />
                            </button>

                            <div className="max-h-[85vh] overflow-y-auto">
                                <div className="relative">
                                    <img
                                        src={active.image}
                                        alt={active.title}
                                        className="max-h-[55vh] w-full bg-black object-contain"
                                    />
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <span className="rounded-full border border-[#F2600B]/30 bg-[#F2600B]/10 px-3 py-1 font-semibold text-[#ff8534]">
                                            {active.tag}
                                        </span>
                                        <span className="text-gray-400">{active.date}</span>
                                        <span className="h-1 w-1 rounded-full bg-[#F2600B]/60" />
                                        <span className="text-gray-400">{active.stat}</span>
                                    </div>

                                    <h3 className="hero-display mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                                        {active.title}
                                    </h3>
                                    <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-300">
                                        <MapPin size={14} className="shrink-0 text-[#F2600B]" />
                                        {active.location}
                                    </p>
                                    <p className="mt-4 leading-relaxed text-gray-300">{active.blurb}</p>

                                    {/* Walk the filtered set */}
                                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                                        <button
                                            type="button"
                                            onClick={() => step(-1)}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-[#F2600B]/60 hover:text-white"
                                        >
                                            <ArrowLeft size={15} /> Previous
                                        </button>
                                        <span className="text-xs text-gray-500">
                                            {openIndex + 1} / {events.length}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => step(1)}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-[#F2600B]/60 hover:text-white"
                                        >
                                            Next <ArrowRight size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
