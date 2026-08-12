import React from "react";
import { STARS, SHOOTING_STARS, STARFIELD_STYLES } from "./starfieldData";

/**
 * @param {boolean} shootingStars — add the occasional streak
 * @param {number}  opacity — dims the whole field, for surfaces where the
 *   stars should sit further back than they do in the hero
 * @param {boolean} withStyles — emit the keyframes. Leave true unless a
 *   parent already renders another Starfield in the same subtree.
 */
export default function Starfield({
    className = "",
    shootingStars = false,
    opacity = 1,
    withStyles = true,
}) {
    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            style={{ opacity }}
            aria-hidden="true"
        >
            {withStyles && <style>{STARFIELD_STYLES}</style>}

            {STARS.map((star) => (
                <span
                    key={`${star.left}-${star.top}`}
                    className="sf-star absolute rounded-full bg-white"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}

            {/* Rotation lives on the wrapper and travel on the child, so the
                streak flies along its own axis without the two transforms
                overwriting each other. */}
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
                            className="sf-shoot block h-px origin-left rounded-full"
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
        </div>
    );
}
