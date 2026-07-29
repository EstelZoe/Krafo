// HeroConstellation.jsx — "galaxy" particle/nebula background for the Services
// hero. Replicates the composition used on the Assessment Toolkit landing page
// (particle network canvas + cursor-following glow + big blurred orbs + a faint
// grid), but recolored entirely to the Krafo brand orange and scoped to the hero
// section instead of fixed to the viewport.
//
// Hardened for government / locked-down / older machines:
//   - Scoped to the hero (position: absolute inset-0), NOT fixed, and
//     pointer-events-none so hero CTAs stay clickable. (R1.4, R2.6)
//   - Particles + connecting lines render in the brand-orange `color`. (R1.1, R1.3)
//   - Cursor tracking is scoped to the hero container via a LOCAL mousemove
//     listener; both the canvas and the orange cursor-glow follow the pointer. (R1.2)
//   - Particle count is capped via resolveParticleCount from quote.js. (R2.2)
//   - prefers-reduced-motion renders a Static_Fallback (orbs + grid + gradient)
//     with no canvas and no requestAnimationFrame. (R2.1)
//   - canvas.getContext('2d') + setup are guarded; on failure the component
//     renders the Static_Fallback. (R2.5)
//   - An IntersectionObserver pauses the RAF loop offscreen and resumes it on
//     re-entry; observer, listeners, and RAF handle are cleaned up on unmount.
//     (R2.3, R2.4)
//
// _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { resolveParticleCount } from "./quote";

const BRAND_ORANGE = "#F2600B";

/**
 * Parse a hex color string ("#F2600B") into an { r, g, b } triple so the canvas
 * can build rgba() strings at varying opacities. Falls back to brand orange for
 * any malformed input.
 */
function hexToRgb(hex) {
  const fallback = { r: 242, g: 96, b: 11 };
  if (typeof hex !== "string") return fallback;
  let value = hex.trim().replace(/^#/, "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (value.length !== 6 || /[^0-9a-fA-F]/.test(value)) return fallback;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

/**
 * Brand-orange nebula layers shown on both the animated and static variants:
 * three big blurred orbs + a faint grid overlay. Recolored from the toolkit's
 * orange/violet/sky palette to pure brand orange shades.
 */
function NebulaLayers() {
  return (
    <>
      <div className="absolute left-[-12%] top-[-10%] h-[360px] w-[360px] rounded-full bg-[#F2600B]/25 blur-[110px] sm:h-[480px] sm:w-[480px]" />
      <div className="absolute right-[-15%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#ff8534]/20 blur-[120px] sm:h-[520px] sm:w-[520px]" />
      <div className="absolute bottom-[-18%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#d94f00]/20 blur-[120px] sm:h-[500px] sm:w-[500px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
    </>
  );
}

/**
 * HeroConstellation — scoped galaxy/particle background.
 *
 * @param {object} props
 * @param {string} [props.color="#F2600B"] Particle/line color.
 * @param {number} [props.maxParticles=90] Hard cap on particle count.
 * @param {string} [props.className]
 */
export default function HeroConstellation({
  color = BRAND_ORANGE,
  maxParticles = 90,
  className = "",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Reduced motion: never mount the canvas / RAF loop. (R2.1)
    if (prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    // Guarded canvas acquisition + setup -> Static_Fallback on failure. (R2.5)
    let ctx;
    try {
      ctx = canvas.getContext("2d");
      if (!ctx) {
        setFailed(true);
        return undefined;
      }
    } catch {
      setFailed(true);
      return undefined;
    }

    const { r, g, b } = hexToRgb(color);
    const linkDistance = 120;
    const mouseLinkDistance = 220;

    let particles = [];
    let sparks = [];
    let rafId = null;
    let running = false;
    const mouse = { x: -9999, y: -9999 };

    const seedParticles = () => {
      const count = resolveParticleCount(canvas.width, canvas.height, maxParticles);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      seedParticles();
    };

    // Scoped pointer tracking: LOCAL listener on the hero (container's parent),
    // NOT a global window listener. Coordinates are translated into hero space
    // and drive both the canvas repulsion and the orange cursor glow. (R1.2)
    const pointerTarget = container.parentElement || container;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      // Update the cursor glow directly (no React re-render on every move).
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(${r},${g},${b},0.30), rgba(255,133,52,0.14), transparent 40%)`;
      }
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < 160 && dist > 0) {
          const force = ((160 - dist) / 160) * 0.8;
          p.x += (mx / dist) * force;
          p.y += (my / dist) * force;
        }
      });

      // Connecting lines between nearby particles, in brand color. (R1.1, R1.3)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / linkDistance) * 0.16})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Lines from nearby particles to the pointer + occasional sparks. (R1.2)
      particles.forEach((p) => {
        const mx = p.x - mouse.x;
        const my = p.y - mouse.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < mouseLinkDistance) {
          if (dist < 45 && Math.random() > 0.75) {
            sparks.push({
              x: p.x,
              y: p.y,
              life: 1,
              dx: (Math.random() - 0.5) * 1.2,
              dy: (Math.random() - 0.5) * 1.2,
            });
          }
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / mouseLinkDistance) * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      // Particle dots — a soft halo plus a bright core (white-hot like stars).
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.10)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
      });

      sparks = sparks.filter((s) => s.life > 0);
      sparks.forEach((s) => {
        s.x += s.dx;
        s.y += s.dy;
        s.life -= 0.025;

        ctx.beginPath();
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${s.life * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,210,120,${s.life * 0.65})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    try {
      resize();
    } catch {
      setFailed(true);
      return undefined;
    }

    window.addEventListener("resize", resize);
    pointerTarget.addEventListener("mousemove", handleMouseMove);
    pointerTarget.addEventListener("mouseleave", handleMouseLeave);

    // Pause offscreen, resume on re-entry. (R2.3, R2.4)
    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0 }
      );
      observer.observe(container);
    } else {
      start();
    }

    return () => {
      stop();
      if (observer) observer.disconnect();
      window.removeEventListener("resize", resize);
      pointerTarget.removeEventListener("mousemove", handleMouseMove);
      pointerTarget.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, color, maxParticles]);

  // Reduced motion or init failure -> static nebula (orbs + grid + gradient). (R2.1, R2.5)
  if (prefersReducedMotion || failed) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      >
        <NebulaLayers />
        <div
          data-testid="hero-constellation-fallback"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(242,96,11,0.16), transparent 60%)," +
              "radial-gradient(ellipse at 75% 70%, rgba(255,133,52,0.10), transparent 55%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Big blurred brand-orange orbs + faint grid (the "nebula"). */}
      <NebulaLayers />

      {/* Particle network canvas. */}
      <canvas
        ref={canvasRef}
        data-testid="hero-constellation-canvas"
        className="absolute inset-0 h-full w-full pointer-events-none opacity-80"
      />

      {/* Cursor-following orange glow (updated imperatively on mousemove). */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
