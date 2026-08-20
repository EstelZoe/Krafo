import React, { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Drag-to-compare frame. Takes whatever two things you want set against each
 * other — screenshots on the Websites page, rendered panels on Web Apps — and
 * handles only the comparison mechanics.
 *
 * Extracted because the drag behaviour has a few non-obvious details worth
 * having in exactly one place: listeners bound to the window rather than the
 * element, a keyboard-accessible range fallback, and labels that fade as their
 * side is squeezed away.
 *
 * @param {node}    before      what's revealed on the left
 * @param {node}    after       what sits underneath, revealed on the right
 * @param {string}  beforeLabel / afterLabel  chip text
 * @param {string}  aspect      Tailwind aspect class for the stage
 * @param {boolean} chrome      wrap it in browser chrome
 * @param {string}  url         address shown in the chrome
 * @param {string}  frozenClass class applied to the stage while dragging, so
 *                              callers can pause their own animations
 * @param {string}  caption     line under the control
 */
export default function CompareSlider({
    before,
    after,
    beforeLabel = "Before",
    afterLabel = "After",
    aspect = "aspect-[16/10]",
    chrome = false,
    url = "",
    frozenClass = "",
    caption,
    rangeLabel = "Slide to compare",
}) {
    const [pos, setPos] = useState(50);
    const [dragging, setDragging] = useState(false);
    const frameRef = useRef(null);

    const setFromClientX = useCallback((clientX) => {
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return;
        const pct = ((clientX - rect.left) / rect.width) * 100;
        setPos(Math.min(100, Math.max(0, pct)));
    }, []);

    // Bound to the window rather than the frame, so the drag survives the
    // pointer leaving the element — otherwise the handle sticks the moment you
    // move faster than the re-render.
    useEffect(() => {
        if (!dragging) return undefined;
        const move = (e) => setFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
        const stop = () => setDragging(false);

        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
        window.addEventListener("touchmove", move, { passive: true });
        window.addEventListener("touchend", stop);
        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", stop);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", stop);
        };
    }, [dragging, setFromClientX]);

    const stage = (
        <div
            ref={frameRef}
            className={`relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-black ${aspect} ${
                chrome ? "rounded-xl" : "rounded-2xl border border-white/15"
            } ${dragging ? frozenClass : ""}`}
            onPointerDown={(e) => {
                setDragging(true);
                setFromClientX(e.clientX);
            }}
        >
            {/* After sits underneath, revealed as the cover slides away */}
            <div className="absolute inset-0 overflow-hidden">{after}</div>

            {/* Before is clipped to the handle position */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
                {before}
            </div>

            {/* Labels — each fades out as its side is squeezed away */}
            <span
                className={`pointer-events-none absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-opacity duration-200 ${
                    pos < 16 ? "opacity-0" : "opacity-100"
                }`}
            >
                {beforeLabel}
            </span>
            <span
                className={`pointer-events-none absolute right-3 top-3 rounded-full bg-[#F2600B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white transition-opacity duration-200 ${
                    pos > 84 ? "opacity-0" : "opacity-100"
                }`}
            >
                {afterLabel}
            </span>

            {/* Handle */}
            <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_18px_rgba(0,0,0,0.7)]"
                style={{ left: `${pos}%` }}
            >
                <span
                    className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#F2600B] text-white shadow-xl transition-transform ${
                        dragging ? "scale-110" : ""
                    }`}
                >
                    <MoveHorizontal size={18} />
                </span>
            </div>
        </div>
    );

    return (
        <div>
            {chrome ? (
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0c0705] p-2 shadow-2xl shadow-black/70">
                    <div className="flex items-center gap-2 px-2 py-2">
                        <span className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        </span>
                        <span className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-2.5 w-2.5 shrink-0 text-emerald-400"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z" />
                            </svg>
                            <span className="truncate text-[10px] font-medium text-gray-400">
                                {url}
                            </span>
                        </span>
                    </div>
                    {stage}
                </div>
            ) : (
                stage
            )}

            {/* Keyboard-accessible equivalent of the drag */}
            <label className="mt-5 block">
                <span className="sr-only">{rangeLabel}</span>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(pos)}
                    onChange={(e) => setPos(Number(e.target.value))}
                    aria-label={rangeLabel}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#F2600B]"
                />
            </label>

            {caption && <p className="mt-3 text-center text-xs text-gray-400">{caption}</p>}
        </div>
    );
}
