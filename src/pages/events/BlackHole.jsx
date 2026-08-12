import React from "react";
import Starfield from "./Starfield";
import { STARFIELD_STYLES } from "./starfieldData";

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

// The swirl is a conic gradient rotated behind a ring-shaped mask, so the
// brightness sweeps around the accretion disc like orbiting matter.
const SWIRL_MASK =
    "radial-gradient(circle, transparent 41%, #000 47%, #000 58%, transparent 68%)";

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
                ${STARFIELD_STYLES}
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

                .bh-bloom { animation: kf-bloom 7s ease-in-out infinite; }
                .bh-flare { animation: kf-flare 5s ease-in-out infinite; }
                .bh-arcs  { animation: kf-drift 90s linear infinite; }
                .bh-ring  { animation: kf-pulse-ring 7s ease-in-out infinite; }
                /* Two counter-weighted sweeps at different speeds so the disc
                   never looks like a single rotating texture. */
                .bh-swirl-a { animation: kf-spin 16s linear infinite; }
                .bh-swirl-b { animation: kf-drift 26s linear infinite; }

                /* Anyone who has asked their OS to reduce motion gets the
                   same picture, just held still. Shooting stars are hidden
                   outright — frozen mid-flight they'd just be stray lines. */
                @media (prefers-reduced-motion: reduce) {
                    .bh-bloom, .bh-flare, .bh-arcs,
                    .bh-ring, .bh-swirl-a, .bh-swirl-b { animation: none; }
                }
            `}</style>

            <div className="relative h-full w-full">
                {/* 1 — Starfield (shared with the slider band, so the two
                   surfaces read as one continuous sky) */}
                <Starfield shootingStars={shootingStars} withStyles={false} />

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
