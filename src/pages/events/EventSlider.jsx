import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The orange call-to-action band beneath the hero.
 *
 * Auto-advances, pauses on hover or keyboard focus, and shows how long is
 * left on the current slide via the progress rail at the foot of the band —
 * so the rotation never feels like it moved without warning.
 *
 * The generous top padding is deliberate: the stats card on the Events page
 * overlaps this band's upper edge, and the content has to clear it.
 */

const ROTATE_MS = 7000;

/** Two groups converging — co-hosting, partnership. */
const PartnerMark = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 170 96" fill="none" aria-hidden="true">
        <g fill="currentColor">
            {/* Left group */}
            {[
                [16, 52, 7], [34, 46, 8.5], [52, 54, 6.5],
            ].map(([x, y, r]) => (
                <g key={`l${x}`}>
                    <circle cx={x} cy={y} r={r} />
                    <path d={`M${x - r - 4} 96V${y + r + 5}a${r + 4} ${r + 4} 0 0 1 ${2 * r + 8} 0V96z`} />
                </g>
            ))}
            {/* Right group */}
            {[
                [118, 54, 6.5], [136, 46, 8.5], [154, 52, 7],
            ].map(([x, y, r]) => (
                <g key={`r${x}`}>
                    <circle cx={x} cy={y} r={r} />
                    <path d={`M${x - r - 4} 96V${y + r + 5}a${r + 4} ${r + 4} 0 0 1 ${2 * r + 8} 0V96z`} />
                </g>
            ))}
        </g>
        {/* The handshake in the middle — two arms meeting */}
        <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.9">
            <path d="M64 62 82 54" />
            <path d="M106 62 88 54" />
        </g>
        <circle cx="85" cy="52" r="7" fill="currentColor" />
        {/* Connecting arc overhead */}
        <path
            d="M30 34C48 12 122 12 140 34"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="5 7"
            opacity="0.45"
        />
    </svg>
);

/** A speaker under stage lights facing a crowd — booking us to present. */
const StageMark = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 170 96" fill="none" aria-hidden="true">
        {/* Light rays */}
        <g opacity="0.3">
            {[-40, -26, -13, 0, 13, 26, 40].map((angle) => (
                <rect
                    key={angle}
                    x="83"
                    y="-2"
                    width="4"
                    height="54"
                    rx="2"
                    fill="currentColor"
                    transform={`rotate(${angle} 85 4)`}
                />
            ))}
        </g>

        {/* Speaker at a mic, arms raised */}
        <g fill="currentColor">
            <circle cx="85" cy="30" r="7" />
            <path d="M85 38c-6 0-9 4.5-9 10v18h18V48c0-5.5-3-10-9-10z" />
            <path d="M77 42 64 27l-3.5 3.5L74 47zM93 42l13-15 3.5 3.5L96 47z" />
        </g>

        {/* Crowd */}
        <g fill="currentColor">
            {[
                [10, 70], [28, 66], [46, 72], [64, 68],
                [106, 68], [124, 72], [142, 66], [160, 70],
            ].map(([x, y]) => (
                <g key={x}>
                    <circle cx={x} cy={y} r="6" />
                    <path d={`M${x - 10} 96V${y + 10}a10 10 0 0 1 20 0V96z`} />
                </g>
            ))}
        </g>
    </svg>
);

const SLIDES = [
    {
        key: "partner",
        eyebrow: "Collaboration",
        title: "Partner With Us For An Event",
        subtitle: "Co-host, sponsor, or bring your community into the room — let's build it together.",
        cta: "Become a partner",
        to: "/contact",
        Art: PartnerMark,
    },
    {
        key: "book",
        eyebrow: "Speaking",
        title: "Book Us For An Event",
        subtitle: "Keynotes, workshops and awareness days, shaped around your team and your risks.",
        cta: "Book a session",
        to: "/contact",
        Art: StageMark,
    },
];

export default function EventSlider() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const go = useCallback(
        (delta) => setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length),
        []
    );

    useEffect(() => {
        if (paused) return undefined;
        const timer = setInterval(() => go(1), ROTATE_MS);
        return () => clearInterval(timer);
        // `index` is a dependency so manual navigation restarts the countdown
        // rather than cutting the new slide short.
    }, [paused, go, index]);

    const slide = SLIDES[index];
    const SlideArt = slide.Art;

    return (
        <section
            className="relative overflow-hidden border-y border-[#F2600B]/25"
            style={{
                // Near-black at the top so the overlapping stats card still has
                // something to sit against, warming toward the bottom where the
                // glow comes up.
                background: "linear-gradient(180deg, #0a0705 0%, #150c06 100%)",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Work with Krafo on an event"
        >
            {/* Depth: the structural grid motif plus a glow rising from the
                foot of the band, so it reads as lit rather than as a flat
                panel — orange is the only colour doing any pointing here. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(#F2600B 1px, transparent 1px), linear-gradient(90deg, #F2600B 1px, transparent 1px)",
                    backgroundSize: "52px 52px",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(60% 140% at 50% 100%, rgba(242,96,11,0.22) 0%, rgba(242,96,11,0) 65%)",
                }}
            />

            <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-2 pt-12 pb-6 sm:gap-4 sm:px-4 md:pt-14 md:pb-7">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous slide"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#F2600B]/50 hover:bg-[#F2600B]/15 hover:text-[#ff8534] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B]"
                >
                    <ChevronLeft size={22} strokeWidth={1.75} />
                </button>

                <div className="min-w-0 flex-1 overflow-hidden">
                    {/* Announce slide changes for screen-reader users without
                        stealing focus. */}
                    <div aria-live="polite" aria-atomic="true">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.key}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.06 } },
                                    exit: { transition: { staggerChildren: 0.03 } },
                                }}
                                className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-7 md:text-left"
                            >
                                {[
                                    <SlideArt
                                        key="art"
                                        className="h-16 w-28 shrink-0 text-[#F2600B]/85 sm:h-[70px] sm:w-32"
                                    />,
                                    <div key="copy" className="min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff8534]">
                                            {slide.eyebrow}
                                        </span>
                                        <h2 className="hero-display mt-0.5 text-xl font-extrabold leading-tight text-white sm:text-2xl">
                                            {slide.title}
                                        </h2>
                                        <p className="mt-1 max-w-md text-sm text-gray-400">
                                            {slide.subtitle}
                                        </p>
                                    </div>,
                                    <Link
                                        key="cta"
                                        to={slide.to}
                                        className="group/cta inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#F2600B] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#F2600B]/30 transition-all duration-300 hover:bg-[#d94f00] md:ml-2"
                                    >
                                        {slide.cta}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover/cta:translate-x-1"
                                        />
                                    </Link>,
                                ].map((child, i) => (
                                    <motion.div
                                        key={child.key || i}
                                        variants={{
                                            hidden: { opacity: 0, y: 14 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                                            exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                                        }}
                                        className="shrink-0 last:shrink-0"
                                    >
                                        {child}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next slide"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#F2600B]/50 hover:bg-[#F2600B]/15 hover:text-[#ff8534] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2600B]"
                >
                    <ChevronRight size={22} strokeWidth={1.75} />
                </button>
            </div>

            {/* Slide counter */}
            <span className="absolute right-4 top-4 hidden text-xs font-bold tracking-[0.2em] text-gray-600 sm:block">
                {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {SLIDES.map((s, i) => (
                    <button
                        key={s.key}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Show slide ${i + 1}: ${s.title}`}
                        aria-current={i === index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === index
                                ? "w-6 bg-[#F2600B]"
                                : "w-1.5 bg-[#F2600B]/30 hover:bg-[#F2600B]/60"
                        }`}
                    />
                ))}
            </div>

            {/* Autoplay progress rail — keyed on the index so it restarts with
                each slide, and frozen while the band is paused. */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
                <motion.div
                    key={`${slide.key}-${paused}`}
                    className="h-full bg-[#F2600B]"
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                />
            </div>
        </section>
    );
}
