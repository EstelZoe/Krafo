import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

/**
 * The minimum Lighthouse scores a site has to clear before hand-over.
 *
 * These are floors, not showcase numbers. Nothing here is 100 on purpose — a
 * perfect score is achievable on a demo page and quietly unrealistic once a
 * site carries real photography, a map embed, or a marketing pixel. Promising
 * 90–97 is a commitment that survives contact with an actual client site;
 * promising 100 is a commitment we'd end up explaining away.
 *
 * Performance sits lowest for the same reason: it's the score most easily
 * dragged down by content decisions made after hand-over.
 */

const TARGETS = [
    {
        label: "Performance",
        value: 90,
        note: "Loads fast on Ghanaian mobile data, not just office fibre",
    },
    { label: "SEO", value: 97, note: "Structured so Google can read and rank every page" },
    { label: "Accessibility", value: 95, note: "Usable with a keyboard and a screen reader" },
    { label: "Best Practices", value: 95, note: "HTTPS, no console errors, current libraries" },
];

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Dial({ target, delay, animate }) {
    const offset = CIRCUMFERENCE * (1 - target.value / 100);
    // Each dial needs its own gradient id — four elements sharing one id is
    // invalid markup, and every ring would resolve to whichever rendered first.
    const gradientId = `dial-${target.label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative h-32 w-32">
                {/* A faint pool of brand light behind each dial, so the ring
                    reads as lit rather than as a thin outline on black. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-full bg-[#F2600B]/10 blur-2xl"
                />
                <svg viewBox="0 0 100 100" className="relative h-full w-full -rotate-90">
                    <circle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        fill="none"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={RADIUS}
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        initial={{ strokeDashoffset: CIRCUMFERENCE }}
                        animate={{ strokeDashoffset: animate ? offset : CIRCUMFERENCE }}
                        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#F2600B" />
                            <stop offset="100%" stopColor="#ff8534" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="hero-display text-3xl font-extrabold text-white [font-variant-numeric:tabular-nums]">
                        {animate ? (
                            <CountUp end={target.value} duration={1.6} delay={delay} />
                        ) : (
                            0
                        )}
                    </span>
                </div>
            </div>

            <p className="hero-display mt-4 text-base font-bold text-white">{target.label}</p>
            <p className="mt-1.5 max-w-[15rem] text-sm leading-relaxed text-gray-300">
                {target.note}
            </p>
        </div>
    );
}

export default function PerformanceTargets() {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <div ref={ref}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {TARGETS.map((target, i) => (
                    <Dial key={target.label} target={target} delay={i * 0.12} animate={inView} />
                ))}
            </div>

            <p className="mx-auto mt-12 max-w-2xl rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm leading-relaxed text-gray-300">
                Measured with <span className="font-semibold text-white">Google Lighthouse</span>{" "}
                on the finished build. These are the floors we won&apos;t hand over below —
                most sites land higher. Scores can move afterwards depending on the images
                and third-party tools you add.
            </p>
        </div>
    );
}
