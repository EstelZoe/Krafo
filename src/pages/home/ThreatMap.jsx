import { useEffect, useRef, useState } from "react";
import { GRID, LAND } from "../WorldPresenceMap";
import { CITIES, ARCS } from "./threatData";
import { lookupCountry, AFRICAN_CODES } from "./countryMeta";

/**
 * ThreatMap — a hand-rolled rotating 3D globe (pure canvas, no 3D dependency).
 * Dotted Earth from the shared LAND grid, auto-rotating, with great-circle
 * "attack" arcs from the /threat-feed endpoint (real Cloudflare Radar data when
 * a token is configured, illustrative otherwise). Drag to spin.
 *
 * The hero caption reflects whether the feed is live or illustrative.
 */

const FEED_URL =
  (import.meta.env.VITE_BASE_URL || "https://api.krafosystems.com/api") +
  "/v1/threat-feed";

const ORANGE = [242, 96, 11];
const DEG = Math.PI / 180;

// Land dots as unit sphere vectors, computed once.
const LAND_VECTORS = (() => {
  const out = [];
  for (let r = 0; r < GRID.rows; r++) {
    for (let c = 0; c < GRID.cols; c++) {
      if (LAND[r * GRID.cols + c] !== "1") continue;
      const lon = (GRID.lon0 + (c + 0.5) * GRID.step) * DEG;
      const lat = (GRID.lat0 - (r + 0.5) * GRID.step) * DEG;
      const cosLat = Math.cos(lat);
      out.push([cosLat * Math.sin(lon), Math.sin(lat), cosLat * Math.cos(lon)]);
    }
  }
  return out;
})();

const toVec = (lon, lat) => {
  const a = lon * DEG, b = lat * DEG, cb = Math.cos(b);
  return [cb * Math.sin(a), Math.sin(b), cb * Math.cos(a)];
};
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function slerp(a, b, t) {
  const d = Math.max(-1, Math.min(1, dot3(a, b)));
  const omega = Math.acos(d);
  if (omega < 1e-4) return a;
  const s = Math.sin(omega);
  const k0 = Math.sin((1 - t) * omega) / s;
  const k1 = Math.sin(t * omega) / s;
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
}

export default function ThreatMap({ className = "", onMeta }) {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const [feedArcs, setFeedArcs] = useState(null);
  const dragRef = useRef({ dragging: false, lastX: 0, offset: 0, vel: 0 });

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    fetch(FEED_URL, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const arcs = Array.isArray(data?.arcs) ? data.arcs : [];
        if (arcs.length) setFeedArcs(arcs);
        onMeta?.({
          source: data?.source || "illustrative",
          updatedAt: data?.updatedAt,
          count: arcs.length || ARCS.length,
        });
      })
      .catch(() => onMeta?.({ source: "illustrative", count: ARCS.length }))
      .finally(() => clearTimeout(timer));
    return () => { clearTimeout(timer); controller.abort(); };
  }, [onMeta]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const source = feedArcs
      ? feedArcs
          .filter((a) => Array.isArray(a.from) && Array.isArray(a.to))
          .map((a, i) => ({ from: a.from, to: a.to, delay: a.delay ?? (i * 0.6) % 6 }))
      : ARCS.map((a, i) => ({
          from: CITIES[a.from], to: CITIES[a.to], delay: a.delay ?? (i * 0.6) % 6,
        })).filter((a) => a.from && a.to);

    const SAMPLES = 40;
    const arcs = source.map((a) => {
      const va = toVec(a.from[0], a.from[1]);
      const vb = toVec(a.to[0], a.to[1]);
      const pts = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const t = i / SAMPLES;
        const p = slerp(va, vb, t);
        const alt = 1 + 0.35 * Math.sin(Math.PI * t);
        pts.push([p[0] * alt, p[1] * alt, p[2] * alt]);
      }
      // Reverse-map the endpoints to country names for the hover/tap readout.
      const fromC = lookupCountry(a.from);
      const toC = lookupCountry(a.to);
      const label = fromC && toC ? `${fromC.name} → ${toC.name}` : null;
      const targetAfrican = toC ? AFRICAN_CODES.has(toC.code) : false;
      return { pts, source: pts[0], target: vb, delay: a.delay, label, targetAfrican };
    });

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cx = 0, cy = 0, R = 0, raf = 0, start = performance.now();
    let stars = [];
    let hotspots = []; // front-hemisphere endpoints, refreshed each frame for hover
    const shooters = [];
    const TILT = -0.32;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W > 900 ? W * 0.72 : W * 0.5;
      cy = H * 0.5;
      // Globe sitting in space, tuned up another 20%.
      R = Math.min(H * 0.24, W * (W > 900 ? 0.1486 : 0.228));
      // Starfield scaled to the canvas area, with depth tiers: most are faint
      // dust, a few are bright foreground stars, and a handful carry a cool or
      // warm tint so the black backdrop reads as deep space, not flat fill.
      stars = Array.from({ length: Math.round((W * H) / 7000) }, () => {
        const bright = Math.random() < 0.08; // a few standout stars
        const tint = Math.random();
        const color =
          tint < 0.1 ? "180,205,255" // cool blue-white
          : tint > 0.94 ? "255,205,160" // faint warm
          : "255,255,255";
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: (bright ? 1.4 + Math.random() * 1.1 : Math.random() * 0.9 + 0.2),
          base: bright ? 0.55 : 0.18,
          amp: bright ? 0.45 : 0.4,
          color,
          ph: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 1.6,
        };
      });
    };

    const rotate = (v, spin) => {
      const cosS = Math.cos(spin), sinS = Math.sin(spin);
      const x = v[0] * cosS + v[2] * sinS;
      const z = -v[0] * sinS + v[2] * cosS;
      const y = v[1];
      const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
      return [x, y * cosT - z * sinT, y * sinT + z * cosT];
    };

    const render = (now) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);
      hotspots = [];

      // ── Deep-space glow behind the globe (distant light, no hard edge) ──
      const deep = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 3.2);
      deep.addColorStop(0, "rgba(40,52,80,0.28)");
      deep.addColorStop(0.55, "rgba(20,26,44,0.12)");
      deep.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = deep;
      ctx.fillRect(0, 0, W, H);

      // ── Space backdrop: twinkling stars ──
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.base + s.amp * tw})`;
        ctx.fill();
      }

      // ── Shooting stars: occasional streaks ──
      if (!reduce && Math.random() < 0.014 && shooters.length < 3) {
        const ang = Math.PI * 0.16 + Math.random() * 0.14; // down-right
        const speed = 7 + Math.random() * 5;
        shooters.push({
          x: Math.random() * W * 0.7,
          y: Math.random() * H * 0.4,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          life: 55 + Math.random() * 25,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx; sh.y += sh.vy; sh.life -= 1;
        const tx = sh.x - sh.vx * 5, ty = sh.y - sh.vy * 5;
        const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, "rgba(255,240,220,0.95)");
        grad.addColorStop(1, "rgba(255,240,220,0)");
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        if (sh.life <= 0 || sh.x > W + 40 || sh.y > H + 40) shooters.splice(i, 1);
      }

      const drag = dragRef.current;
      if (!drag.dragging) { drag.offset += drag.vel; drag.vel *= 0.95; }
      const spin = (reduce ? 0.6 : t * 0.12) + drag.offset;

      // Atmosphere
      const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.25);
      glow.addColorStop(0, `rgba(${ORANGE},0.10)`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx.fill();

      // Sphere face shading
      const face = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      face.addColorStop(0, "rgba(255,255,255,0.06)");
      face.addColorStop(1, "rgba(255,255,255,0.015)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = face; ctx.fill();

      // Land dots (front hemisphere)
      for (const v of LAND_VECTORS) {
        const [x, y, z] = rotate(v, spin);
        if (z <= 0) continue;
        const depth = 0.3 + z * 0.7;
        ctx.beginPath();
        ctx.arc(cx + x * R, cy - y * R, 1.5 * depth + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,240,${0.5 * depth})`;
        ctx.fill();
      }

      // Attack arcs
      for (const arc of arcs) {
        ctx.beginPath();
        let started = false;
        for (const p of arc.pts) {
          const [x, y, z] = rotate(p, spin);
          if (z <= 0) { started = false; continue; }
          const sx = cx + x * R, sy = cy - y * R;
          if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${ORANGE},0.35)`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        if (!reduce) {
          const p = ((t + arc.delay) % 4) / 4;
          const idx = Math.min(SAMPLES, Math.floor(p * SAMPLES));
          const [x, y, z] = rotate(arc.pts[idx], spin);
          if (z > 0) {
            const sx = cx + x * R, sy = cy - y * R;
            const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 9);
            g.addColorStop(0, "rgba(255,190,130,1)");
            g.addColorStop(0.4, `rgba(${ORANGE},0.9)`);
            g.addColorStop(1, `rgba(${ORANGE},0)`);
            ctx.beginPath(); ctx.arc(sx, sy, 9, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
          }
        }
      }

      // Source origins — faint dots, and hover hotspots.
      arcs.forEach((arc) => {
        const [x, y, z] = rotate(arc.source, spin);
        if (z <= 0) return;
        const sx = cx + x * R, sy = cy - y * R;
        ctx.beginPath(); ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,190,130,0.8)"; ctx.fill();
        if (arc.label) hotspots.push({ x: sx, y: sy, label: arc.label });
      });

      // Target markers — pulsing, brighter/larger when the target is African.
      arcs.forEach((arc, i) => {
        const [x, y, z] = rotate(arc.target, spin);
        if (z <= 0) return;
        const sx = cx + x * R, sy = cy - y * R;
        const african = arc.targetAfrican;
        if (!reduce) {
          const pulse = ((t + i * 0.4) % 2.2) / 2.2;
          ctx.beginPath();
          ctx.arc(sx, sy, 3 + pulse * (african ? 16 : 12), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${ORANGE},${(african ? 0.85 : 0.6) * (1 - pulse)})`;
          ctx.lineWidth = african ? 1.7 : 1.3; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(sx, sy, african ? 3.2 : 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ORANGE},1)`; ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
        if (arc.label) hotspots.push({ x: sx, y: sy, label: arc.label });
      });

      raf = requestAnimationFrame(render);
    };

    resize();
    render(performance.now());

    const onResize = () => resize();
    const onDown = (e) => { dragRef.current.dragging = true; dragRef.current.lastX = e.clientX; dragRef.current.vel = 0; };
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.dragging) return;
      const dx = (e.clientX - d.lastX) * 0.005;
      d.offset += dx; d.vel = dx; d.lastX = e.clientX;
    };
    const onUp = () => { dragRef.current.dragging = false; };

    // ── Hover / tap readout ──────────────────────────────────────────
    // Find the nearest arc endpoint to a point and show "ORIGIN → TARGET".
    // Updated imperatively so it never triggers a React re-render on move.
    let hideTipTimer = 0;
    const HIT_RADIUS = 18;
    const nearestLabel = (px, py) => {
      let best = null, bestD = HIT_RADIUS * HIT_RADIUS;
      for (const h of hotspots) {
        const dx = h.x - px, dy = h.y - py;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = h; }
      }
      return best;
    };
    const showTip = (px, py, label) => {
      const tip = tooltipRef.current;
      if (!tip) return;
      tip.textContent = label;
      tip.style.transform = `translate(${px + 14}px, ${py + 14}px)`;
      tip.style.opacity = "1";
      canvas.style.cursor = "pointer";
    };
    const hideTip = () => {
      const tip = tooltipRef.current;
      if (tip) tip.style.opacity = "0";
      canvas.style.cursor = "";
    };
    const onHover = (e) => {
      if (dragRef.current.dragging) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      const hit = nearestLabel(px, py);
      if (hit) showTip(px, py, hit.label);
      else hideTip();
    };
    const onLeave = () => hideTip();
    const onTouch = (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const px = touch.clientX - rect.left, py = touch.clientY - rect.top;
      const hit = nearestLabel(px, py);
      if (!hit) return;
      showTip(px, py, hit.label);
      clearTimeout(hideTipTimer);
      hideTipTimer = window.setTimeout(hideTip, 2500);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { start = performance.now(); raf = requestAnimationFrame(render); }
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mousemove", onHover);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouch, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTipTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mousemove", onHover);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [feedArcs]);

  return (
    <div className={`relative block h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full cursor-grab active:cursor-grabbing"
      />
      {/* Imperatively-updated hover/tap readout: "ORIGIN → TARGET". */}
      <div
        ref={tooltipRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-[#F2600B]/40 bg-black/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg shadow-black/50 backdrop-blur-md transition-opacity duration-150"
        style={{ willChange: "transform, opacity" }}
      />
    </div>
  );
}
