import { memo, useId, useMemo, useRef, useState } from "react";

/* ============================================================================
   <WorldPresenceMap />
   A dotted world map for a hero section. Pulsing markers sit on the countries
   you operate in; hovering (or keyboard-focusing) one pops a card with the
   country name and its flag, and lights up the surrounding dots.

   Usage:
     import WorldPresenceMap from "./WorldPresenceMap";
     <WorldPresenceMap accent="#7C5CFC" />

   Requires: React 18+, Tailwind CSS. No other dependencies.
   ==========================================================================*/

/* -- 1. The map ------------------------------------------------------------
   LAND is a rasterised land mask built from Natural Earth 110m data.
   "1" = draw a dot. 120 columns x 43 rows, one cell per 3 degrees,
   spanning lon -180..180 and lat 72..-56 (poles cropped, as in the reference).
--------------------------------------------------------------------------- */
const GRID = { cols: 120, rows: 43, step: 3, lon0: -180, lat0: 72 };

const LAND = [
  "110000011100000000111111111111111111100001111111111111000000000000001110000001110011111111111111111111111111111111000000",
  "110001111111111111111111111111111111111000111111111110000000000001111111110101111111111111111111111111111111111111111111",
  "111111111111111111111111111111111111111100111111110011110000000011111111111111111111111111111111111111111111111111111111",
  "000111111111111111111111111111111111111000011110000001110000001111111111111111111111111111111111111111111111111111111111",
  "000011111111111111111111111111000011111100001110000000000000001111111111111111111111111111111111111111111111111111111100",
  "000000111100000111111111111111110011111110000000000000000011001111011111111111111111111111111111111111111111000011100000",
  "000001100000000011111111111111111111111111000000000000000111101111111111111111111111111111111111111111111111100011100000",
  "000000000000000011111111111111111111111111000000000000000111111111111111111111111111111111111111111111111111100011000000",
  "000000000000000000111111111111111111111111100000000000000001111111111111111111111111111111111111111111111111100000000000",
  "000000000000000000011111111111111111111110000000000000000000111111111111111111111111111111111111111111111111100000000000",
  "000000000000000000011111111111111111110000000000000000000111111111111111111111111111111111111111111111111101100000000000",
  "000000000000000000011111111111111111000000000000000000000111100111111111111111111111111111111111111111110011000000000000",
  "000000000000000000011111111111111111000000000000000000000111111111011111111111111111111111111111111111111111000000000000",
  "000000000000000000001111111111111110000000000000000000000111111111011000111111111111111111111111111111011100000000000000",
  "000000000000000000000111111111111100000000000000000000001111111111111111111111111111111111111111111111001000000000000000",
  "000000000000000000000011111110001110000000000000000000011111111111111111111111111111111111111111111110000000000000000000",
  "000000000000000000000001111100001110000000000000000000011111111111111111111111111111111111111111111111000000000000000000",
  "000000011000000000000000011110111111100000000000000000111111111111111111111111111001111111111111111010000000000000000000",
  "000000001000000000000000011111110011111000000000000000011111111111111111111111110000111110011111110011000000000000000000",
  "000000000000000000000000000111111000000000000000000000111111111111111111111111000000011100011111100011000000000000000000",
  "000000000000000000000000000000011001110010000000000000111111111111111111111111000000011100000111100011100000000000000000",
  "000000000000000000000000000000001111111110000000000000011111111111111111111111000000011100000101100111100000000000000000",
  "000000000000000000000000000000000011111111110000000000001111111111111111111110000000000100001110001111100000000000000000",
  "000000000000000000000000000000000011111111110000000000000000000111111111111110000000000000001111011100010000000000000000",
  "000000000000000000000000000000000111111111111100000000000000000111111111111100000000000000000111111111111100000000000000",
  "000000000000000000000000000000000111111111111111000000000000000111111111111000000000000000000011011111111111101100000000",
  "000000000000000000000000000000000111111111111111100000000000000011111111110000000000000000000001110011000111111110000000",
  "000000000000000000000000000000000011111111111111100000000000000011111111110000000000000000000000011111100011111001100000",
  "000000000000000000000000000000000011111111111111100000000000000011111111110011000000000000000000000000011111100000100000",
  "100000000000000000000000000000000001111111111111000000000000000011111111110111000000000000000000000001111111100000001000",
  "000000000000000000000000000000000000111111111111000000000000000011111111110110000000000000000000000001111111110000000001",
  "000000000000000000000000000000000000011111111111000000000000000011111111100110000000000000000000001111111111111000011000",
  "000000000000000000000000000000000000011111111110000000000000000001111111100110000000000000000000001111111111111100000000",
  "000000000000000000000000000000000000111111111000000000000000000001111111000000000000000000000000001111111111111100000000",
  "000000000000000000000000000000000000111111111000000000000000000000111111000000000000000000000000001111111111111100000000",
  "000000000000000000000000000000000000111111110000000000000000000000111110000000000000000000000000001111111111111100000000",
  "000000000000000000000000000000000000111111100000000000000000000000010000000000000000000000000000000100000111111000000011",
  "000000000000000000000000000000000000111111000000000000000000000000000000000000000000000000000000000000000001110000000011",
  "000000000000000000000000000000000001111100000000000000000000000000000000000000000000000000000000000000000000110000000111",
  "000000000000000000000000000000000001111000000000000000000000000000000000000000000000000000000000000000000000000000001110",
  "000000000000000000000000000000000001111000000000000000000000000000000000000000000001000000000000000000000000000000000000",
  "000000000000000000000000000000000001110011000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "000000000000000000000000000000000001111000000000000000000000000000000000000000000000000000000000000000000000000000000000"
].join("");

const U = 10;                 // SVG units per grid cell
const W = GRID.cols * U;      // 1200
const H = GRID.rows * U;      // 430
const DOT_R = 1.85;           // land dot radius

/** lat/lon -> SVG coordinates */
function project(lat, lon) {
  return {
    x: ((lon - GRID.lon0) / GRID.step + 0.5) * U,
    y: ((GRID.lat0 - lat) / GRID.step + 0.5) * U,
  };
}

/* -- 2. Your locations -----------------------------------------------------
   Coordinates are country centroids so the markers sit visually "inside"
   each country. Nudge lat/lon freely, or swap in a city.
--------------------------------------------------------------------------- */
const LOCATIONS = [
  { id: "us", name: "United States", region: "North America", lat: 39.5,  lon: -98.35, Flag: FlagUS },
  { id: "gh", name: "Ghana",         region: "West Africa",   lat: 7.95,  lon: -1.03,  Flag: FlagGH },
  { id: "ng", name: "Nigeria",       region: "West Africa",   lat: 9.08,  lon: 8.68,   Flag: FlagNG },
  { id: "ke", name: "Kenya",         region: "East Africa",   lat: 0.02,  lon: 37.9,   Flag: FlagKE },
];

const HALO_CELLS = 5.5; // how far (in grid cells) the dot glow spreads

/* -- 3. Component ---------------------------------------------------------*/
export default function WorldPresenceMap({
  accent = "#F2600B",
  dotColor = "currentColor",
  className = "",
  locations = LOCATIONS,
}) {
  const [active, setActive] = useState(null);
  const glowId = useId();

  // Cursor-follow glow. We track the pointer in SVG coordinate space and feed
  // it to a radialGradient that paints the land-dot path — so the dots nearest
  // the cursor "light up" in the accent colour and fade out with distance.
  // One extra <path> node, updated only via gradient cx/cy → cheap + smooth.
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const [cursor, setCursor] = useState(null);

  const handleMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setCursor({ x, y }));
  };

  const handleLeave = () => {
    cancelAnimationFrame(rafRef.current);
    setCursor(null);
  };

  // Every land dot, as {x, y} in SVG space.
  const dots = useMemo(() => {
    const out = [];
    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++) {
        if (LAND[r * GRID.cols + c] === "1") {
          out.push({ x: (c + 0.5) * U, y: (r + 0.5) * U });
        }
      }
    }
    return out;
  }, []);

  // Dots near each marker, with a distance-based opacity, for the glow.
  const halos = useMemo(() => {
    const radius = HALO_CELLS * U;
    const map = {};
    for (const loc of locations) {
      const p = project(loc.lat, loc.lon);
      map[loc.id] = dots
        .map((d) => {
          const dist = Math.hypot(d.x - p.x, d.y - p.y);
          return dist < radius ? { ...d, o: 1 - dist / radius } : null;
        })
        .filter(Boolean);
    }
    return map;
  }, [dots, locations]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative w-full text-slate-300 ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Radial glow that rides the cursor. Painted onto the dot path so
              only the dots themselves catch the light. */}
          <radialGradient
            id={glowId}
            gradientUnits="userSpaceOnUse"
            cx={cursor ? cursor.x : -1000}
            cy={cursor ? cursor.y : -1000}
            r={150}
          >
            <stop offset="0%" stopColor={accent} stopOpacity="1" />
            <stop offset="35%" stopColor={accent} stopOpacity="0.7" />
            <stop offset="70%" stopColor="#ff8534" stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base land dots */}
        <LandDots dots={dots} fill={dotColor} />

        {/* Cursor-follow lit dots (same path, gradient fill) */}
        {cursor && <LandDots dots={dots} fill={`url(#${glowId})`} />}

        {/* Dots around the hovered marker light up in the accent colour */}
        {active &&
          halos[active].map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={DOT_R + d.o * 0.9}
              fill={accent}
              opacity={d.o * 0.85}
            />
          ))}
      </svg>

      {/* Markers live in an HTML layer on top, so tooltips get real text
          rendering and Tailwind styling. */}
      <div className="absolute inset-0">
        {locations.map((loc, i) => {
          const p = project(loc.lat, loc.lon);
          const isActive = active === loc.id;
          const Flag = loc.Flag;

          return (
            <button
              key={loc.id}
              type="button"
              aria-label={`${loc.name} — ${loc.region}`}
              onMouseEnter={() => setActive(loc.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(loc.id)}
              onBlur={() => setActive(null)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 outline-none"
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, zIndex: isActive ? 30 : 10 }}
            >
              {/* outer pulse */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full sm:h-9 sm:w-9"
                style={{
                  backgroundColor: accent,
                  opacity: 0.18,
                  animationDuration: "3s",
                  animationDelay: `${i * 450}ms`,
                }}
              />
              {/* soft halo */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:h-5 group-hover:w-5 sm:h-4 sm:w-4"
                style={{ backgroundColor: accent, opacity: 0.28 }}
              />
              {/* core */}
              <span
                className="relative block h-2 w-2 rounded-full shadow-[0_0_10px_rgba(242,96,11,0.9)] ring-2 ring-white/90 transition-transform duration-300 group-hover:scale-125 sm:h-2.5 sm:w-2.5"
                style={{ backgroundColor: accent }}
              />

              {/* ---- the card that "comes alive" on hover ---- */}
              <span
                className={[
                  "pointer-events-none absolute bottom-full left-1/2 mb-3 flex origin-bottom",
                  "-translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-xl",
                  "border border-[#F2600B]/30 bg-black/85 py-2 pl-2 pr-3.5 shadow-xl shadow-black/60",
                  "backdrop-blur-md transition-all duration-300 ease-out",
                  isActive
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-1.5 scale-90 opacity-0",
                ].join(" ")}
              >
                <span className="overflow-hidden rounded-md shadow-sm ring-1 ring-white/15">
                  <Flag className="block h-6 w-auto" />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[13px] font-semibold text-white">{loc.name}</span>
                  <span className="text-[11px] font-medium text-[#ff8534]">{loc.region}</span>
                </span>
                {/* little pointer */}
                <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#F2600B]/30 bg-black/85" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* All ~2,000 land dots as a single <path> — one DOM node instead of 2,000. */
const LandDots = memo(function LandDots({ dots, fill }) {
  const d = useMemo(
    () =>
      dots
        .map(
          (p) =>
            `M${p.x} ${p.y}m-${DOT_R} 0a${DOT_R} ${DOT_R} 0 1 0 ${DOT_R * 2} 0a${DOT_R} ${DOT_R} 0 1 0 ${-DOT_R * 2} 0`
        )
        .join(""),
    [dots]
  );
  return <path d={d} fill={fill} />;
});

/* -- 4. Flags (inline SVG, no CDN) ----------------------------------------*/

/** 5-pointed star path generator */
function star(cx, cy, r, ratio = 0.382) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * ratio;
    d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }
  return d + "Z";
}

export function FlagUS(props) {
  const stripe = 100 / 13;
  const stars = [];
  const cw = 76 / 12;
  const ch = (stripe * 7) / 10;
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 11; col++) {
      if ((row + col) % 2 === 0) stars.push(star(col * cw, row * ch, 2.1));
    }
  }
  return (
    <svg viewBox="0 0 190 100" {...props}>
      <rect width="190" height="100" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * stripe} width="190" height={stripe} fill="#B22234" />
      ))}
      <rect width="76" height={stripe * 7} fill="#3C3B6E" />
      <path d={stars.join("")} fill="#fff" />
    </svg>
  );
}

export function FlagGH(props) {
  return (
    <svg viewBox="0 0 180 120" {...props}>
      <rect width="180" height="40" fill="#CE1126" />
      <rect y="40" width="180" height="40" fill="#FCD116" />
      <rect y="80" width="180" height="40" fill="#006B3F" />
      <path d={star(90, 60, 22)} fill="#000" />
    </svg>
  );
}

export function FlagNG(props) {
  return (
    <svg viewBox="0 0 180 120" {...props}>
      <rect width="180" height="120" fill="#fff" />
      <rect width="60" height="120" fill="#008751" />
      <rect x="120" width="60" height="120" fill="#008751" />
    </svg>
  );
}

export function FlagKE(props) {
  const id = useId();
  const shield =
    "M90 16 C106 36 110 52 110 60 C110 68 106 84 90 104 C74 84 70 68 70 60 C70 52 74 36 90 16 Z";
  return (
    <svg viewBox="0 0 180 120" {...props}>
      <clipPath id={`${id}-s`}>
        <path d={shield} />
      </clipPath>
      <rect width="180" height="36" fill="#000" />
      <rect y="36" width="180" height="6" fill="#fff" />
      <rect y="42" width="180" height="36" fill="#BB0000" />
      <rect y="78" width="180" height="6" fill="#fff" />
      <rect y="84" width="180" height="36" fill="#006600" />
      {/* crossed spears */}
      <g stroke="#fff" strokeWidth="5" strokeLinecap="round">
        <line x1="70" y1="14" x2="110" y2="106" />
        <line x1="110" y1="14" x2="70" y2="106" />
      </g>
      {/* Maasai shield */}
      <path d={shield} fill="#fff" />
      <g clipPath={`url(#${id}-s)`}>
        <rect x="66" y="12" width="48" height="96" fill="#BB0000" />
        <rect x="66" y="12" width="48" height="26" fill="#000" />
        <rect x="66" y="82" width="48" height="26" fill="#000" />
        <path d="M90 34 L99 60 L90 86 L81 60 Z" fill="#fff" />
      </g>
      <path d={shield} fill="none" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}
