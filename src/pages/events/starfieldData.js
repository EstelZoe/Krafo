/**
 * Star-field data and keyframes, kept out of the component file so
 * Starfield.jsx exports a component and nothing else (fast refresh needs
 * that to work).
 *
 * The shared star layer.
 *
 * Both the hero's black hole and the slider band draw from this one component
 * so the two fields are genuinely the same sky — same positions, same sizes,
 * same twinkle timing. If they were defined separately they would drift apart
 * the first time either was tweaked.
 *
 * Positions are fixed rather than random so the field is identical on every
 * render and doesn't reshuffle when React re-renders the parent.
 */
export const STARS = [
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

// Shooting stars. Each streak is visible for only ~10% of its cycle, and the
// cycles are deliberately mismatched lengths with staggered delays, so they
// never fall into a repeating pattern the eye can predict — you just catch one
// occasionally out of the corner of your eye.
export const SHOOTING_STARS = [
    { left: 12, top: 14, angle: 28, length: 130, duration: 13, delay: 1 },
    { left: 62, top: 8, angle: 34, length: 165, duration: 17, delay: 6.5 },
    { left: 78, top: 26, angle: 22, length: 110, duration: 21, delay: 12 },
    { left: 34, top: 30, angle: 31, length: 145, duration: 19, delay: 16.5 },
];

/** Keyframes + reduced-motion rules, emitted once per Starfield instance.
 *  Identical duplicate @keyframes are harmless, and keeping them local means
 *  the component works anywhere without a global stylesheet dependency. */
export const STARFIELD_STYLES = `
    @keyframes kf-twinkle {
        0%, 100% { opacity: 0.15; }
        50%      { opacity: 0.85; }
    }
    /* The streak crosses in the first ~10% of the cycle and then waits out
       the rest off-screen — that dead time is what makes the stars feel
       occasional rather than looping. */
    @keyframes kf-shoot {
        0%   { opacity: 0; transform: translateX(-10%) scaleX(0.2); }
        1.5% { opacity: 1; }
        8%   { opacity: 1; }
        11%  { opacity: 0; transform: translateX(760%) scaleX(1); }
        100% { opacity: 0; transform: translateX(760%) scaleX(1); }
    }
    .sf-star  { animation: kf-twinkle 5s ease-in-out infinite; }
    .sf-shoot { animation: kf-shoot linear infinite; }

    @media (prefers-reduced-motion: reduce) {
        .sf-star { animation: none; }
        /* Frozen mid-flight a streak is just a stray diagonal line, so hide
           it outright rather than holding it still. */
        .sf-shoot { animation: none; opacity: 0; }
    }
`;
