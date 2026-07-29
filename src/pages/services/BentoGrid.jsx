import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    Code2,
    GraduationCap,
    Scale,
    Lightbulb,
    Eye,
    ArrowRight,
} from "lucide-react";
import cyberVideo from "../../assets/videos/cybersecurity.mp4";
import devVideo from "../../assets/videos/software development.mp4";
import trainingVideo from "../../assets/videos/training and capacity building.mp4";
import complianceVideo from "../../assets/videos/governance.mp4";
import consultingVideo from "../../assets/videos/consulting and advisory.mp4";
import managedVideo from "../../assets/videos/managed services.mp4";

/**
 * "What We Do" Bento grid (Services page).
 *
 * Renders an asymmetric grid with one large hero tile (Cybersecurity) plus
 * supporting tiles. Each tile has:
 *   - a cursor-follow spotlight glow (disabled under reduced motion),
 *   - a per-variant decorative micro-visual (looping anim disabled under reduced motion),
 *   - a verified proof one-liner that is ALWAYS in the DOM and revealed on
 *     hover AND keyboard focus (identical content for both),
 *   - native keyboard reachability: navigable tiles are <Link>/<a>, others use tabIndex={0}.
 *
 * Content integrity (R11.1/R11.3): proof one-liners are grounded, non-numeric
 * factual capability/licensing statements only — no fabricated stats or ratings.
 */

// ── Default service tiles ────────────────────────────────────────────────────
// `area` maps to a named grid-template-area at md+ (see the scoped <style> below).
// `variant` selects the decorative micro-visual: radar | code | ring | shield.
export const SERVICE_TILES = [
    {
        id: "cybersecurity",
        area: "hero",
        large: true,
        variant: "radar",
        video: cyberVideo,
        Icon: ShieldCheck,
        title: "Cybersecurity Services",
        blurb: "Monitoring, testing, incident response and compliance to keep your operations resilient.",
        proof: "Licensed Cybersecurity Service Provider with Ghana's Cyber Security Authority.",
        to: "/expertise",
    },
    {
        id: "software",
        area: "dev",
        variant: "code",
        video: devVideo,
        Icon: Code2,
        title: "Software Development",
        blurb: "Websites, web apps, SaaS platforms and mobile apps — built to scale.",
        proof: "Full-stack delivery, from landing pages to multi-tenant SaaS platforms.",
        to: "#build",
    },
    {
        id: "training",
        area: "train",
        variant: "ring",
        video: trainingVideo,
        Icon: GraduationCap,
        title: "Training & Capacity Building",
        blurb: "Hands-on cybersecurity and digital-skills training for your team.",
        proof: "Practical, role-based training with certificates of completion.",
        to: "#training",
    },
    {
        id: "compliance",
        area: "comply",
        variant: "shield",
        video: complianceVideo,
        Icon: Scale,
        title: "Governance & Compliance",
        blurb: "Alignment with Ghana's Data Protection Act (843) and Cybersecurity Act (1038).",
        proof: "Aligned to NIST and Ghana's Acts 843, 1038 and 772.",
        to: "/expertise#governance-risk-compliance",
    },
    {
        id: "consulting",
        area: "consult",
        variant: "ring",
        video: consultingVideo,
        Icon: Lightbulb,
        title: "Consulting & Advisory",
        blurb: "Strategic guidance to reduce risk and support your business objectives.",
        proof: "Vendor-neutral advisory grounded in NIST-aligned assessment.",
        to: "/consultation",
    },
    {
        id: "managed",
        area: "managed",
        variant: "radar",
        video: managedVideo,
        Icon: Eye,
        title: "Managed Services",
        blurb: "Ongoing, managed protection and support so you can focus on your mission.",
        proof: "Continuous monitoring with a dedicated point of contact.",
        to: "/expertise#managed-security",
    },
];

// ── Per-variant decorative micro-visuals ─────────────────────────────────────
// Each is aria-hidden (decorative). `animate` gates the looping animation so a
// static snapshot remains when reduced motion is preferred.

function RadarVisual({ animate }) {
    return (
        <div className="mv mv-radar" aria-hidden="true">
            <span className="mv-radar-ring" />
            <span className="mv-radar-ring mv-radar-ring--inner" />
            <span className="mv-radar-dot" />
            <span className={`mv-radar-sweep ${animate ? "is-animating" : ""}`} />
        </div>
    );
}

function CodeVisual({ animate }) {
    const lines = [72, 46, 60, 34, 68, 40, 54, 30];
    return (
        <div className="mv mv-code" aria-hidden="true">
            <div className={`mv-code-track ${animate ? "is-animating" : ""}`}>
                {[...lines, ...lines].map((w, i) => (
                    <span key={i} className="mv-code-line" style={{ width: `${w}%` }} />
                ))}
            </div>
        </div>
    );
}

function RingVisual({ animate }) {
    // Progress ring: circumference ≈ 2πr, r = 26 → ~163.4. Snapshot shows ~66%.
    const R = 26;
    const C = 2 * Math.PI * R;
    return (
        <div className="mv mv-ring" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="mv-ring-svg">
                <circle cx="32" cy="32" r={R} className="mv-ring-bg" />
                <circle
                    cx="32"
                    cy="32"
                    r={R}
                    className={`mv-ring-prog ${animate ? "is-animating" : ""}`}
                    style={{
                        strokeDasharray: C,
                        strokeDashoffset: animate ? undefined : C * 0.34,
                    }}
                />
            </svg>
        </div>
    );
}

function ShieldVisual({ animate }) {
    return (
        <div className="mv mv-shield" aria-hidden="true">
            <span className={`mv-shield-pulse ${animate ? "is-animating" : ""}`} />
            <ShieldCheck className="mv-shield-icon" size={40} strokeWidth={1.5} />
        </div>
    );
}

function MicroVisual({ variant, animate }) {
    switch (variant) {
        case "radar":
            return <RadarVisual animate={animate} />;
        case "code":
            return <CodeVisual animate={animate} />;
        case "ring":
            return <RingVisual animate={animate} />;
        case "shield":
            return <ShieldVisual animate={animate} />;
        default:
            return null;
    }
}

// ── Bento tile ───────────────────────────────────────────────────────────────
export function BentoTile({ item }) {
    const prefersReducedMotion = useReducedMotion();
    const animate = !prefersReducedMotion;
    const ref = useRef(null);
    const videoRef = useRef(null);

    const { id, area, large, variant, video, Icon, title, blurb, proof, to } = item;

    // Scroll-based lazy play: only play the background video while the tile is in
    // view, and pause it when it scrolls away. Combined with preload="none", this
    // means a video isn't fetched or decoded until the user actually reaches it,
    // and stops consuming CPU/GPU once it leaves the viewport. Reduced-motion users
    // never auto-play (the first frame stays static).
    useEffect(() => {
        const el = videoRef.current;
        if (!el || !video || prefersReducedMotion) return undefined;
        if (typeof IntersectionObserver === "undefined") {
            el.play?.().catch(() => {});
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.play?.().catch(() => {});
                else el.pause?.();
            },
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [video, prefersReducedMotion]);

    // Cursor-follow spotlight: update CSS custom props on pointer move.
    // Disabled under reduced motion (no pointer tracking, static surface).
    const handlePointerMove = useCallback(
        (e) => {
            if (prefersReducedMotion) return;
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        },
        [prefersReducedMotion]
    );

    const isHash = typeof to === "string" && to.startsWith("#");
    const isNavigable = typeof to === "string" && to.length > 0;

    const rootClass = [
        "bento-tile group relative isolate flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-[#F2600B]/15 bg-[#0c0705] p-6 md:p-7",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[#F2600B]/45",
        "focus-visible:outline-none focus-visible:border-[#F2600B] focus-visible:ring-2 focus-visible:ring-[#F2600B]/50",
        `bento-area-${area}`,
        large ? "bento-tile--large min-h-[15rem] md:min-h-[22rem]" : "min-h-[12rem]",
    ].join(" ");

    const inner = (
        <>
            {/* Looping background video (when provided). Plays near full brightness
                (not dimmed); text legibility comes from the frosted glass panel below
                rather than a heavy overlay. Muted + playsInline + loop; play/pause is
                driven by the IntersectionObserver above, and preload="none" defers the
                download until the tile is reached. */}
            {video && (
                <>
                    <video
                        ref={videoRef}
                        className="bento-video"
                        src={video}
                        loop
                        muted
                        playsInline
                        preload="none"
                        aria-hidden="true"
                        tabIndex={-1}
                    />
                    <span aria-hidden="true" className="bento-video-edge" />
                </>
            )}

            {/* Cursor-follow spotlight glow (motion only) */}
            {!prefersReducedMotion && (
                <span aria-hidden="true" className="bento-spotlight" />
            )}

            {/* Decorative per-tile micro-visual (hidden when a video backs the tile) */}
            {!video && (
                <div className="bento-visual" aria-hidden="true">
                    <MicroVisual variant={variant} animate={animate} />
                </div>
            )}

            {/* Content — icon badge floats over the video; the text sits inside a
                frosted glass panel anchored to the bottom so it stands out clearly
                against the moving footage without dimming the video itself. */}
            <div className="relative z-10 flex h-full flex-col">
                <div
                    className={`flex items-center justify-center rounded-xl border border-white/15 bg-black/25 text-[#F2600B] backdrop-blur-md transition-colors group-hover:border-[#F2600B]/40 ${
                        large ? "h-16 w-16" : "h-14 w-14"
                    }`}
                >
                    <Icon size={large ? 30 : 24} />
                </div>

                <div className={`bento-glass mt-auto rounded-xl ${large ? "p-5" : "p-4"}`}>
                    <h3
                        className={`hero-display font-bold text-white transition-colors group-hover:text-[#ff8534] ${
                            large ? "text-2xl md:text-3xl" : "text-lg"
                        }`}
                    >
                        {title}
                    </h3>
                    <p
                        className={`mt-2 leading-relaxed text-gray-200 ${
                            large ? "text-base max-w-md" : "text-sm"
                        }`}
                    >
                        {blurb}
                    </p>

                    {/* Proof one-liner: ALWAYS present in the DOM for assistive tech,
                        visually revealed on hover AND keyboard focus (identical content). */}
                    <p className="bento-proof mt-3 text-sm font-medium text-[#ff8534]">
                        <span className="bento-proof-marker text-[#F2600B]">✓ </span>
                        {proof}
                    </p>

                    {isNavigable && (
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#F2600B] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                            Learn more <ArrowRight size={14} />
                        </span>
                    )}
                </div>
            </div>
        </>
    );

    if (isNavigable && isHash) {
        return (
            <a ref={ref} href={to} onPointerMove={handlePointerMove} className={rootClass}>
                {inner}
            </a>
        );
    }
    if (isNavigable) {
        return (
            <Link ref={ref} to={to} onPointerMove={handlePointerMove} className={rootClass}>
                {inner}
            </Link>
        );
    }
    // Non-navigable tile: focusable container so focus can still reveal proof.
    return (
        <div
            ref={ref}
            tabIndex={0}
            onPointerMove={handlePointerMove}
            className={rootClass}
        >
            {inner}
        </div>
    );
}

// ── Bento grid ───────────────────────────────────────────────────────────────
export default function BentoGrid({ items = SERVICE_TILES }) {
    return (
        <>
            <style>{BENTO_STYLES}</style>
            <div className="bento-grid">
                {items.map((item) => (
                    <BentoTile key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}

// Scoped styles: grid template areas, spotlight, proof reveal, micro-visual keyframes.
const BENTO_STYLES = `
    /* ── Layout: single-column stack on narrow viewports, asymmetric areas at md+ ── */
    .bento-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
        width: 100%;
    }
    @media (min-width: 768px) {
        .bento-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-auto-rows: minmax(11rem, auto);
            grid-template-areas:
                "hero hero dev"
                "hero hero train"
                "comply consult managed";
        }
        .bento-area-hero    { grid-area: hero; }
        .bento-area-dev     { grid-area: dev; }
        .bento-area-train   { grid-area: train; }
        .bento-area-comply  { grid-area: comply; }
        .bento-area-consult { grid-area: consult; }
        .bento-area-managed { grid-area: managed; }
    }

    /* ── Looping background video ── */
    /* Plays near full brightness; legibility comes from the glass panel, not a
       heavy overlay. A light edge vignette just anchors the tile to the grid. */
    .bento-video {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.9;
        pointer-events: none;
        transition: opacity 0.4s ease, transform 0.6s ease;
    }
    .bento-tile:hover .bento-video { opacity: 1; transform: scale(1.04); }
    .bento-video-edge {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        /* subtle darkening only at the very edges + a touch at the bottom */
        background:
            radial-gradient(130% 130% at 50% 40%, transparent 62%, rgba(6,3,2,0.55) 100%),
            linear-gradient(180deg, transparent 55%, rgba(6,3,2,0.35) 100%);
    }

    /* ── Frosted glass content panel ── */
    .bento-glass {
        position: relative;
        background: rgba(10, 6, 4, 0.42);
        backdrop-filter: blur(14px) saturate(120%);
        -webkit-backdrop-filter: blur(14px) saturate(120%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        transition: border-color 0.3s ease, background 0.3s ease;
    }
    .bento-tile:hover .bento-glass {
        border-color: rgba(242, 96, 11, 0.35);
        background: rgba(10, 6, 4, 0.5);
    }

    /* ── Cursor-follow spotlight ── */
    .bento-tile { --mx: 50%; --my: 0%; }
    .bento-spotlight {
        position: absolute;
        inset: 0;
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: radial-gradient(
            240px circle at var(--mx) var(--my),
            rgba(242, 96, 11, 0.18),
            transparent 65%
        );
        pointer-events: none;
    }
    .bento-tile:hover .bento-spotlight { opacity: 1; }

    /* ── Proof reveal: always in DOM; hidden visually until hover/focus ── */
    .bento-proof {
        opacity: 0;
        transform: translateY(6px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .bento-tile:hover .bento-proof,
    .bento-tile:focus-within .bento-proof,
    .bento-tile:focus .bento-proof {
        opacity: 1;
        transform: translateY(0);
    }

    /* ── Micro-visual container ── */
    .bento-visual {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        width: 8rem;
        height: 8rem;
        z-index: 0;
        opacity: 0.35;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    .bento-tile--large .bento-visual { width: 11rem; height: 11rem; opacity: 0.4; }
    .bento-tile:hover .bento-visual { opacity: 0.6; }
    .mv { position: absolute; inset: 0; }

    /* Radar */
    .mv-radar-ring {
        position: absolute; inset: 12%;
        border: 1px solid rgba(242, 96, 11, 0.35);
        border-radius: 9999px;
    }
    .mv-radar-ring--inner { inset: 30%; border-color: rgba(242, 96, 11, 0.25); }
    .mv-radar-dot {
        position: absolute; top: 50%; left: 50%;
        width: 4px; height: 4px; margin: -2px 0 0 -2px;
        border-radius: 9999px; background: #ff8534;
    }
    .mv-radar-sweep {
        position: absolute; inset: 12%;
        border-radius: 9999px;
        background: conic-gradient(from 0deg, rgba(242,96,11,0.45), transparent 90deg);
        transform: rotate(45deg);
        transform-origin: center;
    }
    .mv-radar-sweep.is-animating { animation: bento-radar-sweep 4s linear infinite; }
    @keyframes bento-radar-sweep { to { transform: rotate(405deg); } }

    /* Code lines */
    .mv-code { overflow: hidden; }
    .mv-code-track {
        position: absolute; inset: 0;
        display: flex; flex-direction: column; gap: 8px;
        padding: 14% 12%;
        transform: translateY(0);
    }
    .mv-code-track.is-animating { animation: bento-code-drift 9s linear infinite; }
    .mv-code-line {
        height: 4px; border-radius: 9999px;
        background: linear-gradient(90deg, rgba(242,96,11,0.55), rgba(255,133,52,0.15));
        flex: 0 0 auto;
    }
    @keyframes bento-code-drift { to { transform: translateY(-50%); } }

    /* Progress ring */
    .mv-ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .mv-ring-bg {
        fill: none; stroke: rgba(242, 96, 11, 0.15); stroke-width: 4;
    }
    .mv-ring-prog {
        fill: none; stroke: #F2600B; stroke-width: 4; stroke-linecap: round;
    }
    .mv-ring-prog.is-animating { animation: bento-ring-progress 5s ease-in-out infinite; }
    @keyframes bento-ring-progress {
        0%   { stroke-dashoffset: 163.4; }
        50%  { stroke-dashoffset: 40; }
        100% { stroke-dashoffset: 163.4; }
    }

    /* Shield / seal */
    .mv-shield { display: flex; align-items: center; justify-content: center; }
    .mv-shield-icon { color: #F2600B; }
    .mv-shield-pulse {
        position: absolute; top: 50%; left: 50%;
        width: 46px; height: 46px; margin: -23px 0 0 -23px;
        border-radius: 9999px;
        border: 1px solid rgba(242, 96, 11, 0.5);
        opacity: 0.5;
    }
    .mv-shield-pulse.is-animating { animation: bento-seal-pulse 3s ease-out infinite; }
    @keyframes bento-seal-pulse {
        0%   { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(2); opacity: 0; }
    }

    /* Respect reduced motion at the CSS layer too (belt-and-suspenders). */
    @media (prefers-reduced-motion: reduce) {
        .mv-radar-sweep.is-animating,
        .mv-code-track.is-animating,
        .mv-ring-prog.is-animating,
        .mv-shield-pulse.is-animating {
            animation: none;
        }
    }
`;
