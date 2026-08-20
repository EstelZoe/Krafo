import React from "react";
import { useInView } from "react-intersection-observer";
import CompareSlider from "./CompareSlider";

import siteBefore from "../../assets/images/site-before.webp";
import siteAfter from "../../assets/images/site-after.webp";

/**
 * Krafo's own previous site against the current one.
 *
 * Using our own redesign rather than a client's is the only defensible version
 * of this section — it's a real result we're entitled to show, and nobody has
 * to be the "before".
 *
 * Both frames are full-page captures normalised to identical dimensions
 * (1200×4400) so a single pan animation keeps them in lockstep. They scroll
 * together on a slow loop, which is what makes a full-page screenshot useful
 * here instead of showing only the top of each.
 *
 * The source PNGs were 2.1 MB and 7.1 MB; these WebP derivatives are 222 KB
 * and 296 KB. That mattered more than usual — this page commits to a
 * Performance floor a few sections further down.
 */

// The images are 1200×4400 shown at 100% frame width, so their rendered height
// is 3.667× the frame width. In a 16:10 frame only ~17% is visible at a time,
// leaving ~83% to travel — held slightly short at 82% so the loop never runs
// past the last row of pixels.
const PAN_END = "-82%";

export default function BeforeAfter() {
    // The pan only runs while the section is on screen. Two 4400px-tall images
    // translating forever in a scrolled-past section is wasted compositing, and
    // it's one of several things moving at once on this page.
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <div ref={ref} className={inView ? "" : "ba-frozen"}>
            <style>{`
                @keyframes ba-pan {
                    0%, 6%    { transform: translateY(0); }
                    94%, 100% { transform: translateY(${PAN_END}); }
                }
                .ba-pan {
                    animation: ba-pan 46s ease-in-out infinite alternate;
                    will-change: transform;
                }
                /* Held still while the divider is being dragged — a moving
                   target makes the comparison hard to read. */
                .ba-frozen .ba-pan { animation-play-state: paused; }

                @media (prefers-reduced-motion: reduce) {
                    .ba-pan { animation: none; }
                }
            `}</style>

            <CompareSlider
                chrome
                url="krafosystems.com"
                frozenClass="ba-frozen"
                rangeLabel="Slide to compare the previous site with the current one"
                caption="Our own site, before and after. Drag the handle — both pages scroll together."
                before={
                    <img
                        src={siteBefore}
                        alt="The previous Krafo Systems site"
                        loading="lazy"
                        draggable="false"
                        className="ba-pan w-full"
                    />
                }
                after={
                    <img
                        src={siteAfter}
                        alt="The Krafo Systems site today"
                        loading="lazy"
                        draggable="false"
                        className="ba-pan w-full"
                    />
                }
            />
        </div>
    );
}
