import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives the product-page hero toggles (device / role / tenant / platform).
 *
 * Two behaviours matter here and both are about not being irritating:
 *
 *  1. It stops permanently the moment the visitor picks something. A demo that
 *     keeps moving while you're using it is worse than no demo.
 *
 *  2. It settles on its own after a couple of full rounds. Perpetual motion in
 *     the corner of your eye competes with the headline you're trying to read,
 *     and by then the point has been made — anyone who wants to see it again
 *     has the toggle.
 *
 * @param {number} length      how many options to cycle through
 * @param {number} intervalMs  dwell time on each
 * @param {number} rounds      full passes before it settles
 * @returns {[number, (i: number) => void]} current index, and a setter that
 *          also stops the cycle
 */
export function useAutoCycle(length, { intervalMs = 3400, rounds = 2 } = {}) {
    const [index, setIndex] = useState(0);
    const [stopped, setStopped] = useState(false);
    const advances = useRef(0);

    useEffect(() => {
        if (stopped || length < 2) return undefined;

        const timer = setInterval(() => {
            advances.current += 1;
            setIndex((i) => (i + 1) % length);
            if (advances.current >= length * rounds) setStopped(true);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [stopped, length, intervalMs, rounds]);

    const select = useCallback((i) => {
        setStopped(true);
        setIndex(i);
    }, []);

    return [index, select];
}

export default useAutoCycle;
