import React from "react";

/**
 * The Events hero backdrop: a supernova collapsing into a black hole, rendered
 * entirely in CSS so it costs nothing to download and stays sharp at any size.
 *
 * Layered back to front:
 *   1. starfield          — deterministic dots, slow twinkle
 *   2. lensing arcs       — faint circles sweeping above the core
 *   3. bloom              — the wide ambient glow
 *   4. accretion ring     — the bright circle of infalling matter
 *   5. event horizon      — solid black disc that occludes the ring's centre
 *   6. lensed streak      — the white-hot bar of light bent across the front
 *   7. bottom fade        — blends the whole thing into the page below
 *
 * Rendered in Krafo orange rather than the usual sci-fi purple so the hero
 * belongs to the same palette as the rest of the site.
 */

// Fixed positions rather than Math.random(), so the field is identical on
// every render and doesn't jump around when React re-renders the hero.
const STARS = [
    { left: 6, top: 12, size: 2, delay: 0 },
    { left: 14, top: 34, size: 1, delay: 1.6 },
    { left: 19, top: 8, size: 1.5, delay: 3.1 },
    { left: 24, top: 52, size: 1, delay: 0.8 },
    { left: 31, top: 21, size: 2, delay: 2.4 },
    { left: 37, top: 6, size: 1, delay: 4.2 },
    { left: 42, top: 40, size: 1.5, delay: 1.1 },
    { left: 47, top: 15, size: 1, delay: 3.6 },
    { left: 53, top: 29, size: 2, delay: 0.4 },
    { left: 58, top: 9, size: 1, delay: 2.9 },
    { left: 63, top: 45, size: 1.5, delay: 1.9 },
    { left: 68, top: 18, size: 1, delay: 4.7 },
    { left: 73, top: 33, size: 2, delay: 0.6 },
    { left: 78, top: 11, size: 1, delay: 3.3 },
    { left: 83, top: 48, size: 1.5, delay: 2.1 },
    { left: 88, top: 24, size: 1, delay: 1.4 },
    { left: 93, top: 7, size: 2, delay: 3.9 },
    { left: 9, top: 61, size: 1, delay: 2.6 },
    { left: 27, top: 72, size: 1.5, delay: 0.9 },
    { left: 45, top: 80, size: 1, delay: 4.4 },
    { left: 61, top: 68, size: 1, delay: 1.7 },
    { left: 79, top: 76, size: 1.5, delay: 3.4 },
    { left: 91, top: 63, size: 1, delay: 2.2 },
    { left: 3, top: 41, size: 1, delay: 4.9 },
    { left: 96, top: 38, size: 1.5, delay: 1.2 },
];

// The swirl is a conic gradient rotated behind a ring-shaped mask, so the
// brightness sweeps around the accretion disc like orbiting matter.
const SWIRL_MASK =
    "radial-gradient(circle, transparent 41%, #000 47%, #000 58%, transparent 68%)";

// Shooting stars. Each streak is visible for only ~10% of its cycle, and the
// cycles are deliberately co-prime-ish lengths with staggered delays, so they
// never fall into a repeating pattern the eye can predict — you just catch one
// occasionally out of the corner of your eye.
const SHOOTING_STARS = [
    { left: 12, top: 14, angle: 28, length: 130, duration: 13, delay: 1 },
    { left: 62, top: 8, angle: 34, length: 165, duration: 17, delay: 6.5 },
    { left: 78, top: 26, angle: 22, length: 110, duration: 21, delay: 12 },
    { left: 34, top: 30, angle: 31, length: 145, duration: 19, delay: 16.5 },
];

/**
 * @param {string}  className — sizing for the composition box
 * @param {boolean} fade — draw the bottom gradient that dissolves the glow
 *   into the page. Wanted when the core sits inside the section (the hero);
 *   switched off when the core is deliberately cropped by the section edge,
 *   where a fade would just dim the brightest part.
 * @param {number} coreScale — scales the core (bloom, disc, horizon, arcs)
 *   without touching the lensed streak, which is sized independently so it can
 *   still run the full width of the screen behind a much smaller core.
 */
export default function BlackHole({
    className = "",
    fade = true,
    coreScale = 1,
    shootingStars = false,
}) {
    return (
        <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
            <style>{`
                @keyframes kf-twinkle {
                    0%, 100% { opacity: 0.15; }
                    50%      { opacity: 0.85; }
                }
                /* Animated layers only ever touch scale/rotate/opacity — the
                   centring lives on a static wrapper, so the two never fight
                   over the transform property. */
                @keyframes kf-bloom {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50%      { opacity: 1;   transform: scale(1.09); }
                }
                @keyframes kf-flare {
                    0%, 100% { opacity: 0.75; transform: scaleX(0.97); }
                    50%      { opacity: 1;    transform: scaleX(1.03); }
                }
                @keyframes kf-drift {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes kf-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes kf-pulse-ring {
                    0%, 100% { opacity: 0.85; }
                    50%      { opacity: 1; }
                }
                /* The streak crosses in the first ~10% of the cycle and then
                   waits out the rest off-screen — that dead time is what makes
                   the stars feel occasional rather than looping. */
                @keyframes kf-shoot {
                    0%        { opacity: 0; transform: translateX(-10%) scaleX(0.2); }
                    1.5%      { opacity: 1; }
                    8%        { opacity: 1; }
                    11%       { opacity: 0; transform: translateX(760%) scaleX(1); }
                    100%      { opacity: 0; transform: translateX(760%) scaleX(1); }
                }

                .bh-star  { animation: kf-twinkle 5s ease-in-out infinite; }
                .bh-bloom { animation: kf-bloom 7s ease-in-out infinite; }
                .bh-flare { animation: kf-flare 5s ease-in-out infinite; }
                .bh-arcs  { animation: kf-drift 90s linear infinite; }
                .bh-ring  { animation: kf-pulse-ring 7s ease-in-out infinite; }
                /* Two counter-weighted sweeps at different speeds so the disc
                   never looks like a single rotating texture. */
                .bh-swirl-a { animation: kf-spin 16s linear infinite; }
                .bh-swirl-b { animation: kf-drift 26s linear infinite; }
                .bh-shoot   { animation: kf-shoot linear infinite; }

                /* Anyone who has asked their OS to reduce motion gets the
                   same picture, just held still. Shooting stars are hidden
                   outright — frozen mid-flight they'd just be stray lines. */
                @media (prefers-reduced-motion: reduce) {
                    .bh-star, .bh-bloom, .bh-flare, .bh-arcs,
                    .bh-ring, .bh-swirl-a, .bh-swirl-b { animation: none; }
                    .bh-shoot { animation: none; opacity: 0; }
                }
            `}</style>

            <div className="relative h-full w-full">
                {/* 1 — Starfield */}
                {STARS.map((star) => (
                    <span
                        key={`${star.left}-${star.top}`}
                        className="bh-star absolute rounded-full bg-white"
                        style={{
                            left: `${star.left}%`,
                            top: `${star.top}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}

                {/* 1b — Shooting stars.
                   The rotation lives on the wrapper and the travel on the
                   child, so the streak flies along its own axis without the
                   two transforms overwriting each other. */}
                {shootingStars &&
                    SHOOTING_STARS.map((s) => (
                        <span
                            key={`${s.left}-${s.top}`}
                            className="absolute"
                            style={{
                                left: `${s.left}%`,
                                top: `${s.top}%`,
                                transform: `rotate(${s.angle}deg)`,
                            }}
                        >
                            <span
                                className="bh-shoot block h-px origin-left rounded-full"
                                style={{
                                    width: `${s.length}px`,
                                    animationDuration: `${s.duration}s`,
                                    animationDelay: `${s.delay}s`,
                                    background:
                                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,214,160,0.5) 60%, rgba(255,255,255,0.95) 100%)",
                                    boxShadow: "0 0 6px 1px rgba(255,214,160,0.5)",
                                }}
                            />
                        </span>
                    ))}

                {/* ── CORE GROUP (2–5) ──────────────────────────────────
                   Everything that belongs to the body of the black hole is
                   scaled together by coreScale. The streak below deliberately
                   sits outside this group. */}
                <div
                    className="absolute left-1/2 top-1/2 h-full w-full"
                    style={{ transform: `translate(-50%, -50%) scale(${coreScale})` }}
                >
                    {/* 2 — Gravitational lensing arcs */}
                    <div className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2">
                        <svg className="bh-arcs h-full w-full" viewBox="0 0 200 200" fill="none">
                            {[46, 58, 70, 84].map((r, i) => (
                                <circle
                                    key={r}
                                    cx="100"
                                    cy="100"
                                    r={r}
                                    stroke="#F2600B"
                                    strokeOpacity={0.1 - i * 0.018}
                                    strokeWidth="0.35"
                                    strokeDasharray={i % 2 ? "2 6" : undefined}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* 3 — Ambient bloom */}
                    <div className="absolute left-1/2 top-1/2 h-[85%] w-[75%] -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="bh-bloom h-full w-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(242,96,11,0.34) 0%, rgba(242,96,11,0.10) 42%, rgba(242,96,11,0) 70%)",
                                filter: "blur(60px)",
                            }}
                        />
                    </div>

                    {/* 4 — Accretion ring */}
                    <div
                        className="bh-ring absolute left-1/2 top-1/2 aspect-square w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,0,0,0) 43%, rgba(255,196,132,0.55) 46.5%, rgba(242,96,11,0.95) 50%, rgba(242,96,11,0.30) 57%, rgba(242,96,11,0) 69%)",
                            filter: "blur(10px)",
                        }}
                    />

                    {/* 4b — Orbiting matter: two conic sweeps behind a ring
                        mask, turning in opposite directions at different
                        speeds so the disc reads as churning, not spinning. */}
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="bh-swirl-a h-full w-full rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, rgba(242,96,11,0) 0deg, rgba(255,214,160,0.75) 55deg, rgba(242,96,11,0.20) 130deg, rgba(242,96,11,0) 190deg, rgba(255,180,110,0.55) 265deg, rgba(242,96,11,0) 340deg)",
                                maskImage: SWIRL_MASK,
                                WebkitMaskImage: SWIRL_MASK,
                                filter: "blur(9px)",
                            }}
                        />
                    </div>
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="bh-swirl-b h-full w-full rounded-full"
                            style={{
                                background:
                                    "conic-gradient(from 140deg, rgba(242,96,11,0) 0deg, rgba(255,255,255,0.45) 40deg, rgba(242,96,11,0) 110deg, rgba(255,196,132,0.35) 200deg, rgba(242,96,11,0) 280deg)",
                                maskImage: SWIRL_MASK,
                                WebkitMaskImage: SWIRL_MASK,
                                filter: "blur(12px)",
                            }}
                        />
                    </div>

                    {/* 5 — Event horizon: solid black, with the hot rim as its shadow */}
                    <div
                        className="absolute left-1/2 top-1/2 aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                        style={{
                            boxShadow:
                                "0 0 40px 14px rgba(0,0,0,0.95), 0 0 70px 22px rgba(242,96,11,0.30)",
                        }}
                    />
                </div>

                {/* 6 — Lensed light bent across the front of the core.
                   Kept outside the core group, and measured in viewport width
                   rather than a share of this box: however small the core gets
                   and however wide the screen is, the line still runs off both
                   edges. The page root clips the overflow. */}
                <div className="absolute left-1/2 top-1/2 h-[9%] w-[210vw] -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="bh-flare h-full w-full rounded-[50%]"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,214,160,0.8) 5%, rgba(242,96,11,0.62) 14%, rgba(242,96,11,0.20) 34%, rgba(242,96,11,0.07) 55%, rgba(242,96,11,0) 76%)",
                            filter: "blur(6px)",
                        }}
                    />
                </div>

                {/* 7 — Fade the whole composition into the page */}
                {fade && (
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
                )}
            </div>
        </div>
    );
}
